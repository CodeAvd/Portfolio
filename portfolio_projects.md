# Portfolio Projects (Product Analyst Track)

## 1. Darkest AFK — Support Compensation Catalog

**Context**  
Live support/admin operations needed faster and more consistent compensation package assembly.

**Problem**  
Manual item lookup and JSON assembly created friction, slower handling, and higher chance of formatting mistakes.

**Data Sources**  
- Internal item metadata (`items.json`)
- Support workflow requirements from admin/support operations

**Method**  
- Built a static web tool (HTML/CSS/JS) with searchable catalog, category filters, bilingual labels, quantity controls, and JSON output.
- Added accessibility and keyboard support for high-frequency operator usage.

**Insights**  
- Operators need fast lookup + deterministic output format, not only visual browsing.
- Presets and bulk actions reduce cognitive load in repetitive compensation tasks.

**Decision**  
Shipped an interface-first support tool with structured payload generation and reusable presets.

**Impact**  
- Catalog coverage: **112+ items**
- One-click JSON generation for compensation payloads
- Standardized output format across support operations

**Next Experiment**  
Track median time-to-build compensation package and error rate before/after preset adoption.

**Artifacts**  
- `/Users/grisaavdeev/study/darkest-afk-item-catalog/docs/index.html`
- `/Users/grisaavdeev/study/darkest-afk-item-catalog/docs/README.md`

---

## 2. Vacation Cafe Simulator — Retention & Cozy Flow Analysis

**Context**  
The team needed structured understanding of when a cozy game loop shifts into friction and churn risk.

**Problem**  
Player sentiment was spread across many channels and not translated into testable product actions.

**Data Sources**  
- Steam feedback and reviews
- Discord reports/discussions
- Benchmark comparisons (genre peers)

**Method**  
- Synthesized qualitative feedback into repeatable friction patterns.
- Built action-oriented recommendations mapped to retention and session metrics.
- Converted observations into prioritization candidates (QoL, loop depth, content cadence).

**Insights**  
- Repetition/friction spike often appears around **6–8 hours**.
- Mechanical load increases around **Level 4–5** and can break cozy flow.
- Audio/visual “cozy triggers” and fail-forward design patterns can support D1/D7.

**Decision**  
Created a practical recommendation set with KPI mapping for retention, session quality, and friction reduction.

**Impact**  
- Produced a long-form actionable analysis used as product discussion input.
- Defined concrete hypotheses for QoL, content progression, and creator-facing virality hooks.

**Next Experiment**  
Run A/B on one friction-reduction hypothesis (for example, prep interaction simplification) and measure D1 + quit<10m.

**Artifacts**  
- `/Users/grisaavdeev/Desktop/vcs-dashboard-clean/vacation insight.txt`
- `/Users/grisaavdeev/Desktop/vcs-dashboard-clean/GDD/09_VCS_Market_Feedback_Analysis_2026-03-04.md`

---

## 3. Dig Dig Die — Multi-Source Bug & Feedback Intelligence Dashboard

**Context**  
Dig Dig Die needed an actionable view of critical gameplay issues and player feedback priorities.

**Problem**  
Raw feedback was fragmented and noisy, making it hard to align dev/support priorities.

**Data Sources**  
- Steam player feedback
- Discord/community reports
- Additional creator/player commentary

**Method**  
- Built structured dashboard + CSV model.
- Grouped signals into critical bugs, feedback themes, backlog candidates, and import opportunities.
- Added explicit priority, effort, risk, horizon, and KPI for each item.

**Insights**  
- Identified **23 structured priority items**, including **6 critical bug/UX issues** and **3 key feedback themes**.
- Critical blockers concentrated around coop flow, onboarding discoverability, and continuity/reliability.

**Decision**  
Proposed a 30/60/90 roadmap with P0/P1/P2 sequencing and measurable KPI targets.

**Impact**  
- Created a traceable decision layer from raw feedback to implementation-ready backlog.
- Reduced ambiguity in cross-functional prioritization discussions.

**Next Experiment**  
Pilot top-2 P0 fixes and compare Invite Success Rate, D1, and support response metrics over 2-week windows.

**Artifacts**  
- `/Users/grisaavdeev/Desktop/dig_dig_die_bug_dashboard_ru.html`
- `/Users/grisaavdeev/Desktop/dig_dig_die_bug_reports_ru.csv`
