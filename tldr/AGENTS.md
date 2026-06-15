# AGENTS.md — Linux TLDR Commands Page

## Project Overview
A simple single-page web application serving as a quick reference for essential Linux commands, organized by category with search functionality and copy-to-clipboard support.

## File Structure
```
index.html   — HTML structure only (links to external CSS/JS)
style.css    — All styles (Catppuccin Mocha theme via CSS variables)
script.js    — All JavaScript (data, rendering, search, clipboard)
```

## Constraints & Preferences

### Theming
- **Catppuccin Mocha** dark palette exclusively.
- All colors must be defined as CSS custom properties on `:root` with `--ctp-` prefix (e.g., `--ctp-base`, `--ctp-lavender`).
- No hardcoded hex color values in selectors — always use `var(--ctp-*)`.

### Code Organization
- Strict separation of concerns: HTML, CSS, and JS in separate files.
- No inline `<style>` or `<script>` blocks in `index.html`.

### UI / UX
- Commands grouped by category (File Operations, Permissions, System Information, etc.).
- Each command card shows name, description, and one or more examples with a copy button.
- Command examples must have visual spacing between them (`margin-bottom` on `.command-example`, reset with `:last-child`).
- Search filters by command name, description, category, and example text.
- Responsive design for mobile (breakpoint at 600px).

### Content
- TLDR-style: short, practical examples with inline comments (`# comment`).
- Copy button copies only the command part (before `#`), not the comment.