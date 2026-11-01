---
title: "Five backtesting pitfalls: a walk-forward methodology"
description: Look-ahead bias, overfitting, mismatched time granularity, inconsistent risk rules and underestimated costs — and how engineering practices prevent them.
slug: walk-forward-pitfalls
lang: en
date: 2026-11-30
draft: true
---

> Draft — to be published after owner review. Technical research only; not investment advice.

1. **Look-ahead bias**: features are computed with data from the future. Countermeasure: strict time-based splits and checks on feature timestamps.
2. **Overfitting**: parameters are tuned repeatedly on the same data. Countermeasure: walk-forward, rolling out-of-sample evaluation.
3. **Mismatched time granularity**: thresholds tuned on daily bars are reused on minute bars. Countermeasure: bind parameters to the data granularity and validate this automatically.
4. **Inconsistent risk rules**: the intraday loss limit in the backtest is not reset per calendar day. Countermeasure: backtest and execution share one risk module.
5. **Underestimated trading costs**: slippage and fees are ignored. Countermeasure: model costs explicitly in the backtest and run a sensitivity analysis.
