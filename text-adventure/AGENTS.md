# AGENTS.md — Text Adventure

## Project Overview
A click-choice text adventure game set on a damaged space station. The player wakes from cryosleep and must explore ~12 rooms, gather items, solve puzzles, and determine their fate — repair the station, escape, or perish.

## File Structure
```
text-adventure/
├── index.html  — HTML structure with game display area and controls
├── style.css   — All styling (Catppuccin Mocha theme, terminal aesthetic)
└── script.js   — All game logic (rooms, inventory, choices, endings)
```

## Constraints

### Styling
- **Use Catppuccin Mocha palette** exclusively.
- **No light mode** — dark theme only, always.
- Terminal/retro aesthetic with monospace font for narrative text.

### Code Organization
- **Separate CSS and JS from HTML.** Keep styles in `style.css` and logic in `script.js`; never inline them in `index.html`.
- Each file has a single responsibility.
- **JSDoc with type hints required.** All variables, constants, and functions must include JSDoc comments with proper `@typedef`, `@type`, parameter types, and return type annotations.

### Game Features
- Click-choice interface (no typed commands)
- ~12 rooms with interconnected navigation
- Inventory system with item count badge
- Conditional choices based on inventory and knowledge
- Health tracking (damaged by radiation, restored by medkits)
- Typewriter-style text animation for atmosphere
- Multiple endings: repair station, escape pod, or game over
- Start screen and restart option

### Game State
- **Rooms:** Cryo Bay, Central Corridor, Command Bridge, Engineering, Airlock, Storage, Med Bay, Observation Deck, Server Room, Cargo Bay, Living Quarters, Reactor Room
- **Items:** Medkit, Flashlight, Wrench, Oxygen Tank, Override Code, Critical Component, Crew Log
- **Endings:** 3 possible outcomes (repair station, escape, perish)

## Catppuccin Mocha Colors (Reference)
| Token      | Hex      | Usage                     |
|------------|----------|---------------------------|
| Base       | `#1e1e2e`| Main background           |
| Mantle     | `#181825`| Container/surface bg      |
| Crust      | `#11111b`| Darkest elements          |
| Surface 0  | `#313244`| Inputs, cards             |
| Surface 1  | `#45475a`| Borders, dividers         |
| Subtext 0  | `#a6adc8`| Labels, secondary text    |
| Text       | `#cdd6f4`| Primary text              |
| Lavender   | `#b4befe`| Headings                  |
| Blue       | `#89b4fa`| Buttons, focus borders    |
| Mauve      | `#cba6f7`| Section titles            |
| Green      | `#a6e3a1`| Positive values, healing  |
| Red        | `#f38ba8`| Negative values, damage   |
| Peach      | `#fab387`| Items, warnings           |
| Yellow     | `#f9e2af`| Important discoveries     |
