# Portfolio Dashboard (Air-Soft + Cold)

Static EN-first portfolio dashboard with RU toggle.

## Location
`heapp_transition_2026/dashboard`

## Stack
- HTML
- CSS (design tokens + custom layout)
- Vanilla JavaScript (no build step)

## Features
- EN/RU language toggle with URL sync (`?lang=en|ru`)
- Project deep link (`#project=<slug>`)
- Competency filters (light interaction)
- Story + KPI hybrid project cards
- Detail modal for each case
- Scroll reveal animations with reduced-motion fallback
- Responsive layout (desktop/mobile)

## File Structure
- `index.html`
- `assets/css/tokens.css`
- `assets/css/main.css`
- `assets/js/app.js`
- `assets/data/content.en.json`
- `assets/data/content.ru.json`
- `assets/img/*.svg`

## Run Locally
Because `fetch()` is used for JSON loading, run via local static server.

```bash
cd heapp_transition_2026/dashboard
python3 -m http.server 8877
```

Open:
- `http://localhost:8877/`
- `http://localhost:8877/?lang=ru`
- `http://localhost:8877/?lang=en#project=dig-dig-die`

## GitHub Pages Publish
1. Sync this `dashboard/` folder into the public repo `CodeAvd/Portfolio`.
2. Deploy the `dashboard/` directory as the GitHub Pages artifact.
3. Verify the live URL:
   - `https://codeavd.github.io/Portfolio/`
4. Keep public references aligned with that live URL in the resume/profile packs.

## Notes
- Public deployment should use live URLs for the hub and case pages.
- Resume and profile packs should point to the live site, not local relative paths.
