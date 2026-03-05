# Case 03: Dig Dig Die Feedback Intelligence Dashboard

## Context
Dig Dig Die required a clear prioritization layer for bugs, UX issues, and player feedback.

## Problem
Signals from Steam, Discord, and community channels were fragmented, duplicated, and difficult to operationalize.

## Data Sources
- Steam feedback
- Discord reports
- Community/creator signal samples
- Structured outputs: dashboard HTML + CSV

## Method
- Built a structured analysis model with item-level fields: priority, effort, risk, horizon, KPI, source links.
- Grouped signals into bug clusters, feedback themes, backlog candidates, and strategic imports.
- Added rollout logic with P0/P1/P2 and a 30/60/90 implementation frame.

## Insights
- Consolidated into **23 structured items**, including:
  - **6 critical bug/UX issues**
  - **3 key feedback themes**
  - **5 high-potential imported feature concepts**
- Core risk zones: coop reliability, onboarding discoverability, and continuity/recovery loops.

## Decision
Delivered an implementation-ready priority model with KPI references for retention and support outcomes.

## Impact
- Converted noise into a traceable decision artifact.
- Improved cross-functional alignment potential for product/support prioritization.

## Next Experiment
Ship top-2 P0 fixes and compare two-week deltas for:
- Invite Success Rate.
- D1 retention.
- Time-to-First-Response for support-critical issues.

## Artifacts
- `/Users/grisaavdeev/Desktop/dig_dig_die_bug_dashboard_ru.html`
- `/Users/grisaavdeev/Desktop/dig_dig_die_bug_reports_ru.csv`
