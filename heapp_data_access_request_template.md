# Data Access Request Template (Minimum Viable Access)

## Objective
Request only the minimum data required to run Product Analyst pilot tasks without creating security or process risk.

## Requested Access (Phase 1)
1. Weekly aggregated export by issue/tag:
- `week`
- `ticket_tag`
- `ticket_count`
- `avg_first_response_time`
- `avg_resolution_time`

2. Weekly product health snapshot (aggregated):
- `week`
- `D1`
- `D7`
- `D30` (if available)
- `invite_success_rate` (if available)
- `quit_lt_10m` (if available)

3. Known issues/release changelog feed:
- release date
- change type
- affected area

## Access Principles
- No personal data required.
- Aggregated data only for pilot stage.
- Read-only exports.

## Why This Is Sufficient
This level of access is enough to:
- detect trend shifts,
- prioritize support/product pain points,
- propose measurable fixes,
- validate decision impact over short cycles.

## Expected Business Value
- Faster issue prioritization.
- Better alignment between support and product teams.
- Higher confidence in what to fix first.
