# AGENTS.md — Arkanoid

## Project Overview
A classic Arkanoid (brick breaker) game implemented as a single-page web application. The player controls a paddle at the bottom of the screen to bounce a ball and destroy rows of colored bricks. The game ends when the ball falls below the paddle or all bricks are destroyed.

## File Structure
```
arkanoid/
├── index.html  — HTML structure with canvas and UI controls
├── style.css   — All styling (Catppuccin Mocha theme)
└── script.js   — All game logic (ball, paddle, bricks, collision)
```

## Constraints

### Styling
- **Use Catppuccin Mocha palette** exclusively.
- **No light mode** — dark theme only, always.

### Code Organization
- **Separate CSS and JS from HTML.** Keep styles in `style.css` and logic in `script.js`; never inline them in `index.html`.
- Each file has a single responsibility.
- **JSDoc with type hints required.** All variables, constants, and functions must include JDoc comments with proper `@typedef`, `@type`, parameter types, and return type annotations.

### Game Features
- Ball bounces off walls, paddle, and bricks
- Paddle controlled by mouse or keyboard (arrow keys / WASD)
- Multiple rows of colored bricks
- Score tracking
- Lives system (3 lives)
- Level progression (win when all bricks destroyed)
- Game over when lives reach 0
- Restart option

### UI Elements
- Start/Pause button
- Score and lives display
- Game over / win overlay with restart button
- "Back to Main Page" button linking to `../index.html`

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
| Green      | `#a6e3a1`| Positive values, paddle   |
| Red        | `#f38ba8`| Negative values, errors   |
| Peach      | `#fab387`| Bricks row color          |
| Yellow     | `#f9e2af`| Bricks row color          |
| Rosewater  | `#f5c2e7`| Bricks row color          |

## Game Mechanics
- **Canvas Size:** 480x600 pixels
- **Paddle:** 80px wide, 12px high, moves horizontally
- **Ball:** 8px radius
- **Bricks:** 60px wide, 18px high, 5 rows x 7 columns
- **Initial Speed:** 4 px/frame for ball
- **Lives:** 3
- **Controls:** Mouse movement or arrow keys / A,D