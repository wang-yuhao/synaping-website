# Autonomy mode

Claude works without the owner except at these gates (everything else is automatic):

| Gate | Why it stays human | Frequency |
| --- | --- | --- |
| Accounts, keys, secrets, DNS, server commands | Credentials and infrastructure must never be handled by an AI agent | Once (runbook Stages 1–3) |
| 公安备案, 公众号, webmaster verification | Real-name / face verification | Once |
| Facts in docs/content-facts.md | Only the owner knows prices, consents, legal data | When placeholders 【待确认】 matter |
| PRs touching protected paths (tests, config, legal, facts) | Prevents an agent from weakening its own checks | Occasional, batched in the morning report |
| promote-prod approval | Production is public and legal-facing | Per release (≈ weekly) |

Defaults that let Claude continue without waiting: see CLAUDE.md → "Decision defaults".
Stop everything: set repo variable NIGHTLY_ENABLED=false.
