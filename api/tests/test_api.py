import os
os.environ["DB_PATH"] = "/tmp/synaping-test.db"
from fastapi.testclient import TestClient
from app.main import app

c = TestClient(app)
ok = {"name": "张三", "email": "a@example.com", "message": "hi", "consent": True, "elapsed_ms": 5000}

def test_health():
    assert c.get("/api/health").json() == {"status": "ok"}

def test_contact_ok():
    assert c.post("/api/contact", json=ok).status_code == 200

def test_consent_required():
    assert c.post("/api/contact", json={**ok, "consent": False}).status_code == 422

def test_honeypot_silently_dropped():
    assert c.post("/api/contact", json={**ok, "website": "spam"}).json() == {"status": "ok"}

def test_bad_email():
    assert c.post("/api/contact", json={**ok, "email": "nope"}).status_code == 422
