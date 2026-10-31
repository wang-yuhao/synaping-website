"""Synaping contact API: stores inquiries in SQLite and notifies by SMTP (Tencent Exmail).

Privacy: data minimisation, 12-month retention (purged on startup and daily), no IP stored in the DB.
"""
from __future__ import annotations

import os
import smtplib
import sqlite3
import time
from collections import defaultdict, deque
from email.message import EmailMessage
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, EmailStr, Field

DB_PATH = Path(os.getenv("DB_PATH", "/data/inquiries.db"))
RETENTION_DAYS = int(os.getenv("RETENTION_DAYS", "365"))
RATE_LIMIT = int(os.getenv("RATE_LIMIT_PER_MIN", "5"))
MIN_FILL_MS = int(os.getenv("MIN_FILL_MS", "3000"))

app = FastAPI(title="synaping-api", docs_url=None, redoc_url=None, openapi_url=None)
_hits: dict[str, deque[float]] = defaultdict(deque)


class Inquiry(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    company: str = Field(default="", max_length=120)
    email: EmailStr
    phone: str = Field(default="", max_length=40)
    wechat: str = Field(default="", max_length=60)
    topic: str = Field(default="", max_length=80)
    budget: str = Field(default="", max_length=40)
    message: str = Field(min_length=1, max_length=4000)
    locale: str = Field(default="zh", pattern="^(zh|en|de)$")
    consent: bool
    website: str = Field(default="", max_length=200)  # honeypot
    elapsed_ms: int = 0


def db() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(DB_PATH)
    con.execute(
        "CREATE TABLE IF NOT EXISTS inquiries (id INTEGER PRIMARY KEY, created INTEGER, locale TEXT, name TEXT,"
        " company TEXT, email TEXT, phone TEXT, wechat TEXT, topic TEXT, budget TEXT, message TEXT)"
    )
    return con


def purge(con: sqlite3.Connection) -> None:
    con.execute("DELETE FROM inquiries WHERE created < ?", (int(time.time()) - RETENTION_DAYS * 86400,))
    con.commit()


def limited(ip: str) -> bool:
    now = time.time()
    q = _hits[ip]
    while q and now - q[0] > 60:
        q.popleft()
    q.append(now)
    return len(q) > RATE_LIMIT


def notify(inq: Inquiry) -> None:
    host = os.getenv("SMTP_HOST")
    if not host:
        return
    msg = EmailMessage()
    msg["Subject"] = f"[synaping.com] 新询盘 / New inquiry: {inq.topic or '-'} — {inq.name}"
    msg["From"] = os.environ["SMTP_USER"]
    msg["To"] = os.getenv("NOTIFY_TO", os.environ["SMTP_USER"])
    msg["Reply-To"] = str(inq.email)
    msg.set_content("\n".join(f"{k}: {v}" for k, v in inq.model_dump(exclude={"website", "elapsed_ms"}).items()))
    with smtplib.SMTP_SSL(host, int(os.getenv("SMTP_PORT", "465")), timeout=15) as s:
        s.login(os.environ["SMTP_USER"], os.environ["SMTP_PASS"])
        s.send_message(msg)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/contact")
def contact(inq: Inquiry, request: Request) -> dict[str, str]:
    ip = request.headers.get("x-real-ip") or (request.client.host if request.client else "?")
    if limited(ip):
        raise HTTPException(429, "too many requests")
    if inq.website or inq.elapsed_ms < MIN_FILL_MS:
        return {"status": "ok"}  # silently drop bots
    if not inq.consent:
        raise HTTPException(422, "consent required")
    con = db()
    purge(con)
    con.execute(
        "INSERT INTO inquiries (created, locale, name, company, email, phone, wechat, topic, budget, message)"
        " VALUES (?,?,?,?,?,?,?,?,?,?)",
        (int(time.time()), inq.locale, inq.name, inq.company, str(inq.email), inq.phone, inq.wechat, inq.topic, inq.budget, inq.message),
    )
    con.commit()
    con.close()
    try:
        notify(inq)
    except Exception as exc:  # stored anyway; log for the operator
        print(f"notify failed: {exc!r}", flush=True)
    return {"status": "ok"}
