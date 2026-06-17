# AGENTS.md — Flash Cards

## Project Overview
A single-page web application for Chinese language learning flashcards. It allows users to study HSK vocabulary with flip cards that show Chinese characters on one side and pinyin + English translation on the other.

## File Structure
```
flash-cards/
├── AGENTS.md      — This file
├── index.html     — HTML structure with card container and controls
├── style.css      — All styling (Catppuccin Mocha theme)
└── script.js      — All flashcard logic, data, interactions
```

## Constraints

### Styling
- **Use Catppuccin Mocha palette** exclusively.
- **No light mode** — dark theme only, always.
- **Use relative units** (`rem`, `em`, `%`, `vh`/`vw`) for all sizing. No hardcoded `px` values.

### Code Organization
- **Separate CSS and JS from HTML.** Keep styles in `style.css` and logic in `script.js`; never inline them in `index.html`.
- Each file has a single responsibility.
- **JSDoc with type hints required.** All variables, constants, and functions must include JSDoc comments with proper `@typedef`, `@type`, parameter types, and return type annotations.

### Flashcard Features
- Flip card UI: Front shows Chinese characters, back shows pinyin + English translation
- Navigation: Previous/Next buttons, keyboard support (arrow keys)
- Shuffle mode to randomize card order
- Progress tracking (current card number / total)
- Search/filter functionality

### Card UI Elements
- Large Chinese characters centered on front
- Pinyin and translation on back
- Card number indicator (e.g., "5 / 150")
- Previous/Next navigation buttons
- Shuffle button
- Search bar for filtering cards
- "Back to Main Page" button linking to `../index.html`

## Catppuccin Mocha Colors (Reference)
| Token      | Hex      | Usage                     |
|------------|----------|---------------------------|
| Base       | `#1e1e2e`| Main background           |
| Mantle     | `#181825`| Container/surface bg      |
| Crust      | `#11111b`| Darkest elements          |
| Surface 0  | `#313244`| Card background, inputs   |
| Surface 1  | `#45475a`| Borders, dividers         |
| Subtext 0  | `#a6adc8`| Labels, secondary text    |
| Text       | `#cdd6f4`| Primary text              |
| Lavender   | `#b4befe`| Headings                  |
| Blue       | `#89b4fa`| Buttons, focus borders    |
| Mauve      | `#cba6f7`| Section titles            |
| Green      | `#a6e3a1`| Positive feedback         |
| Red        | `#f38ba8`| Errors                    |