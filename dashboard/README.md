# Portfolio Dashboard (Air-Soft + Cold)

Static EN-first portfolio dashboard with RU toggle.

## Location
`/Users/grisaavdeev/study/переменные/career/heapp_transition_2026/dashboard`

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
cd "/Users/grisaavdeev/study/переменные/career/heapp_transition_2026/dashboard"
python3 -m http.server 8877
```

Open:
- `http://localhost:8877/`
- `http://localhost:8877/?lang=ru`
- `http://localhost:8877/?lang=en#project=dig-dig-die`

## GitHub Pages Publish (pages-ready)
1. Create repo `gavdeev/grigorii-portfolio-dashboard`.
2. Copy all files from this `dashboard/` folder into repo root.
3. Push to `main`.
4. In repo settings: Pages -> Deploy from branch -> `main` + `/ (root)`.
5. Verify live URL and then update links in:
   - `/Users/grisaavdeev/study/переменные/career/draft_resume.md`
   - `/Users/grisaavdeev/study/переменные/career/heapp_transition_2026/linkedin_profile_pack_en.md`

## Notes
- Public deployment should replace local `file:///` artifact links with public URLs/screenshots where available.
