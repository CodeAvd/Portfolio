# Case 01: Darkest AFK Support Catalog

## Context
Darkest AFK support/admin workflows required frequent in-game compensations and item lookups.

## Problem
Manual item search and payload preparation increased handling friction and formatting inconsistency.

## Data Sources
- Item metadata (`items.json`)
- Support workflow requirements from admin/support operations
- Existing compensation payload format (`init_info` JSON)

## Method
- Built an internal web interface using HTML/CSS/JS.
- Implemented search, category filters, bilingual labels, multi-select, quantity controls, and one-click JSON output.
- Added keyboard shortcuts and accessibility improvements for high-frequency use.

## Insights
- Operator speed depends more on deterministic output format than visual polish.
- Repetitive operations benefit from bulk actions and presets to reduce cognitive load.

## Decision
Ship a tool-first support workflow with standardized payload generation and reusable package patterns.

## Impact
- **112+ items** in the searchable catalog.
- Unified compensation payload format for team usage.
- Reduced manual copy/paste friction in repetitive support operations.

## Next Experiment
Track before/after on:
- Median package assembly time.
- Formatting/copy errors in compensation payloads.
- Ticket handling time for compensation-related cases.

## Artifact
- `/Users/grisaavdeev/study/darkest-afk-item-catalog/docs/index.html`
