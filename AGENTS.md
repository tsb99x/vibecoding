# AGENTS.md — Root Directory

This is the root of the repository. It contains the GitHub Pages landing page (`index.html`) and links to the subprojects.

## Subprojects

Each subfolder is an independent project with its own `AGENTS.md` that describes its structure, constraints, and preferences.

| Subproject | Description |
|------------|-------------|
| `bonds-profitability/` | Bond Profitability Calculator single-page web application |
| `cue-builder/` | CUE File Builder web application |
| `snake-game/` | Classic Snake Game single-page web application |
| `tldr/` | Linux TLDR Commands single-page web application |
| `games-ontology/` | Games Ontology interactive knowledge graph visualizing game relationships |

## Agent Instructions

Before making any changes, **always look into the relevant subproject's `AGENTS.md`** for detailed context, file structure, coding conventions, and constraints. The root `AGENTS.md` only serves as a navigation guide.

### Common Requirements for All Subprojects

- Each subproject page must include a **"Back to Main Page"** button that links to `../index.html` (or `index.html` if at root level), allowing users to navigate back to the main landing page.
- Each subproject must be mentioned in the root's `README.md`.
- Each subproject must be linked by a card on the root's `index.html`.

## Commit Details

- Commit details should be a list denoted with `-`.