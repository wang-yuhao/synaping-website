# synaping.com — 惟意科技 Synaping

China-first company website (zh `/`, en `/en/`, de `/de/`), static Astro build served from JD Cloud (Beijing) behind nginx + JD Cloud CDN.

```bash
pnpm install
pnpm dev            # http://localhost:4321
pnpm build && pnpm test:e2e
pnpm lint:ad-law    # 广告法 absolute-term check
cd api && pip install -r requirements-dev.txt && pytest
```

## How changes reach production
1. **nightly** (23:30 CET) picks up to 4 issues labelled `ready` and lets Claude Code open one PR per issue.
2. **ci** builds and tests every PR (no secrets). **path-check** blocks PRs touching protected paths unless the owner authored them.
3. **automerge** squash-merges green Claude PRs that touch no protected paths, then triggers **publish-staging**.
4. **publish-staging** signs the build (Ed25519) and publishes it as a GitHub Release (`build-<sha12>` + pointer `channel-staging`); the server downloads, verifies and deploys it to staging.synaping.com.
5. **promote-prod** (manual, needs owner approval) moves the signed `channel-prod` pointer to the same build; the server deploys it, health-checks and rolls back on failure; the workflow confirms via `/build.json`.
6. **morning-report** (07:00 CET) opens an issue with what happened and what needs you.

Pause automation: Settings → Variables → `NIGHTLY_ENABLED=false`. Hold a PR: add label `hold`.

Docs: `docs/PLAN.md`, `docs/AUTONOMY.md`, `docs/content-facts.md`, `CLAUDE.md`. Server side: private repo `server-infra`.
