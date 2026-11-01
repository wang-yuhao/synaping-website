---
title: "One codebase, two regions: a China–EU dual-region cloud architecture"
description: How a single website or data application can serve mainland China visitors and meet European data-residency expectations at the same time.
slug: china-eu-dual-region
lang: en
date: 2026-11-25
draft: true
---

> Draft — to be published after owner review.

Companies with customers in both China and Europe often face a conflict: visitors in China need an ICP filing and nearby nodes, while European customers prefer their data to stay in the EU.

## Architecture essentials
- **Build once, deploy twice**: CI builds a single tested and signed artifact and publishes it to both the China and the Europe nodes.
- **Route data by region**: form and business data are written to storage in the user's own region; cross-border sync carries only the aggregates that are actually needed.
- **DNS and certificates**: issue certificates with DNS validation, so split-horizon DNS does not break the challenge.
- **Monitor availability from both sides**: run synthetic checks from China and from Europe separately.

## When you do not need two regions
- For a pure brand presence without forms or personal data, one region plus a global CDN is usually enough.

【待确认】 Add this site's actual architecture diagram and speed measurements.
