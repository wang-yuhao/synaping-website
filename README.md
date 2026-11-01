# synaping.com — 惟意科技 Synaping

China-first company website (zh `/`, en `/en/`, de `/de/`), static Astro build served from JD Cloud (Beijing) behind nginx + JD Cloud CDN. No third-party requests, no cookies.

## Local development

Requirements: Node ≥ 22.23, pnpm 10 (`corepack enable` or `npx pnpm@10.28.0 …`), Python 3.12 for the API.

```bash
pnpm install
pnpm dev            # http://localhost:4321
pnpm check          # astro + TypeScript
pnpm lint:ad-law    # 广告法 absolute-term check
pnpm build          # → dist/
pnpm test:e2e       # Playwright, desktop + mobile, against dist/
cd api && pip install -r requirements-dev.txt && pytest
```

Every PR must pass all of the above (see CLAUDE.md → Definition of Done).

Windows: the Playwright web server calls `python3`. If that is missing, serve the build yourself first (`python -m http.server 4321 --directory dist`); Playwright reuses a running server.

## Where things live

| Path | What |
| --- | --- |
| `src/content/site.ts` | All page copy (zh first, en mirrors, de for `dePages` only) and structured content: services, cases, labs, kit |
| `src/content/legal.ts` | Privacy policy and legal notice (owner review only) |
| `src/content/insights/*.md` | Insight articles; `draft: true` keeps them unpublished |
| `src/pages/[...path].astro` | Single router: generates every localized route and its metadata |
| `src/views/` | One view per page type (Home, ServiceDetail, CaseDetail, …) |
| `src/components/` | Header, Footer, Logo, Icon, Terminal, ArchDiagram, BridgeLine, SectionHead |
| `src/i18n/ui.ts` | Locales, nav labels, company data, `localePath()` |
| `src/lib/jsonld.ts` | Organization / Service / FAQPage / Article / BreadcrumbList structured data |
| `src/styles/global.css` | Tailwind v4 tokens and shared utilities (`card`, `chip`, `kicker`, …) |
| `src/scripts/` | Hero canvas and quant demo (respect `prefers-reduced-motion`) |
| `api/` | Contact-form API (FastAPI), built into its own image |
| `tests/e2e/` | `smoke.spec.ts` (one h1, ICP footer, no third-party requests, no cookies, language switch, disclaimer, consent) and `visual.spec.ts` |
| `docs/` | `PLAN.md`, `AUTONOMY.md`, `content-facts.md` (the only source for facts), `backlog.yml` (synced to issues) |

Facts about people, prices, clients and numbers come only from `docs/content-facts.md`; unknowns stay `【待确认】`.

## How changes reach production

1. **nightly** (23:30 CET) picks up to 4 issues labelled `ready` and lets Claude Code open one PR per issue.
2. **ci** builds and tests every PR (no secrets). **path-check** blocks PRs touching protected paths (`.github/protected-paths.txt`) unless the owner authored them.
3. **automerge** squash-merges green Claude PRs that touch no protected paths, then triggers **publish-staging**.
4. **publish-staging** signs the build (Ed25519) and publishes it as a GitHub Release (`build-<sha12>` + pointer `channel-staging`); the server downloads, verifies and deploys it to staging.synaping.com.
5. **promote-prod** (manual, needs owner approval) moves the signed `channel-prod` pointer to the same build; the server deploys it, health-checks and rolls back on failure; the workflow confirms via `/build.json`.
6. **lighthouse** audits main after every merge (accessibility and SEO ≥ 0.95 are hard gates).
7. **morning-report** (07:00 CET) opens an issue with what happened and what needs you.

The server polls the release pointers every 2 minutes; nothing pushes to it and it holds no GitHub credentials.

**Check what is live:** `curl https://www.synaping.com/build.json` → `{"sha": …}`.
**Roll back:** on the server, `rollback.sh synaping` (see `server-infra`), or run promote-prod with an earlier `sha`.
**Pause automation:** Settings → Variables → `NIGHTLY_ENABLED=false`. **Hold a PR:** add label `hold`.
**Ask Claude on an issue or PR:** comment `@claude …` (owner only).

## Rules of the road

- One issue → one branch (`claude/<issue>-<slug>`) → one PR of about 400 changed lines or fewer; never push to `main`.
- Pages ≤ 300 KB and ≤ 80 KB JS; animations honour `prefers-reduced-motion`.
- 广告法: no absolute claims. Quant content: architecture only, with the disclaimer.

Docs: `docs/PLAN.md`, `docs/AUTONOMY.md`, `docs/content-facts.md`, `CLAUDE.md`. Server side: private repo `server-infra`.
