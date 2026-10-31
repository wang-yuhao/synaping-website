"""Sync docs/backlog.yml → GitHub labels, milestones and issues (idempotent by title)."""
import json, subprocess, sys
import yaml

def gh(*args, check=True):
    r = subprocess.run(["gh", *args], capture_output=True, text=True)
    if check and r.returncode:
        print(r.stderr, file=sys.stderr)
    return r.stdout

data = yaml.safe_load(open(sys.argv[1], encoding="utf-8"))
for l in data["labels"]:
    gh("label", "create", l["name"], "--color", l["color"], "--description", l.get("description", ""), "--force", check=False)
existing_ms = {m["title"]: m["number"] for m in json.loads(gh("api", "repos/{owner}/{repo}/milestones?state=all&per_page=100") or "[]")}
for m in data["milestones"]:
    if m["title"] not in existing_ms:
        gh("api", "repos/{owner}/{repo}/milestones", "-f", f"title={m['title']}", "-f", f"description={m.get('description','')}")
titles = {i["title"] for i in json.loads(gh("issue", "list", "--state", "all", "--limit", "500", "--json", "title") or "[]")}
for it in data["issues"]:
    if it["title"] in titles:
        continue
    args = ["issue", "create", "--title", it["title"], "--body", it["body"].strip() + "\n\n_Synced from docs/backlog.yml_"]
    for lab in it.get("labels", []):
        args += ["--label", lab]
    if it.get("milestone"):
        args += ["--milestone", it["milestone"]]
    print("create:", it["title"]); gh(*args)
