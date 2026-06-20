# AGENTS.md — Root Directory

This repository hosts static single-page web applications organized as independent subprojects. There is **no build step**, **no package manager**, and **no bundlers** — everything is raw HTML, CSS, and JavaScript served directly by GitHub Pages.

## Subprojects

Each subfolder is an independent project with its own `AGENTS.md` describing its structure, constraints, and preferences. **Always read the subproject's AGENTS.md before making changes.**

| Subproject | Description |
|------------|-------------|
| `bonds-profitability/` | Bond Profitability Calculator SPA |
| `cue-builder/` | CUE File Builder web application |
| `snake-game/` | Classic Snake Game SPA |
| `tldr/` | Linux TLDR Commands quick reference |
| `games-ontology/` | Games Ontology interactive knowledge graph (D3.js) |
| `flash-cards/` | Chinese HSK vocabulary flashcards |
| `arkanoid/` | Classic Arkanoid (brick breaker) SPA |
| `text-adventure/` | Click-choice text adventure (space station) |

## Common Constraints (All Subprojects)

- **Catppuccin Mocha theme only** — dark mode exclusively, no light mode toggle
- **Separate files** — `index.html`, `style.css`, `script.js`; never inline CSS or JS in HTML
- **No build tools** — no `package.json`, no npm, no TypeScript, no bundlers
- **JSDoc with type hints** required in `script.js` for most subprojects
- **"Back to Main Page"** button linking to `../index.html` on every subproject page
- **Relative units preferred** (`rem`, `em`, `%`) where applicable

## Adding a New Subproject

1. Create folder with `index.html`, `style.css`, `script.js`, `AGENTS.md`, `README.md`
2. Add card link in root `index.html` (matching `.project-card` pattern)
3. Add entry to root `README.md` subprojects table
4. Add entry to this `AGENTS.md` subprojects table

## Deployment

- Automated via GitHub Actions (`.github/workflows/pages.yml`) on push to `master`
- Deploys the entire repo root (`path: "."`), so all subprojects are served under their folder paths

## Commit Messages

- Must start with a type prefix: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `chore:`, etc.
- Details formatted as a list with `-`
