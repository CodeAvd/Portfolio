# GitHub Pages Checklist — Darkest AFK Catalog

## Current State (checked March 5, 2026)
- Repository detected: `https://github.com/gavdeev/darkest-afk-item-catalog`
- GitHub Pages URL check:
  - `https://gavdeev.github.io/darkest-afk-item-catalog/` -> 404
  - `https://gavdeev.github.io/darkest-afk-item-catalog/docs/index.html` -> 404

## Goal
Publish a live portfolio demo URL for the Darkest AFK support tool.

## Step-by-Step
1. Push latest branch to `main`.
2. In GitHub repo settings: `Pages` -> `Build and deployment`.
3. Set source:
- `Deploy from a branch`
- Branch: `main`
- Folder: `/docs`
4. Save and wait for first deployment (1-5 minutes).
5. Verify URL:
- `https://gavdeev.github.io/darkest-afk-item-catalog/`
6. Add URL to:
- CV (`draft_resume.md`)
- LinkedIn featured section
- Portfolio case file

## Acceptance Criteria
- Live link opens without 404.
- `index.html` loads with item grid and JSON export behavior.
- Link is present in at least 3 public-facing artifacts (CV, LinkedIn, portfolio).

## Quick Verification
- Open the page in desktop and mobile browser widths.
- Validate that `items.json` and images load correctly.
- Confirm copy-to-clipboard feature works.
