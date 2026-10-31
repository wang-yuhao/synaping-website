# Plan (summary)
Full plan v2.1: https://claude.ai/artifact/RMJ4mCozpVke8KvLbp57wy · Runbook: https://claude.ai/artifact/1hf1zNdLiePBCzXsP42Gc5

- Brand: 惟意科技 Synaping — technology arm of 上海惟意计划科技有限公司 (ICP 沪ICP备2023014586号-3).
- Market: Chinese companies expanding to Europe; zh default, en full, de key pages.
- Services: 出海官网与数字化产品 · 数据与智能工程 · 云与数据合规架构; solution: 欧洲数字化落地包; Labs: quant infra, NeuroLab.
- Hosting: JD Cloud Beijing origin + JD Cloud CDN (mainland + overseas) on www.synaping.com; apex redirects to www.
- Delivery: GitHub (build/test, no secrets) → signed artifact in JD OSS → server pulls & verifies → staging → owner approval → production.
- Launch target: Fri 4 Dec 2026.
