# AGENTS.md — Snake Game

## Project Overview
A classic Snake Game implemented as a single-page web application. The player controls a snake that moves around a grid, eating food to grow longer and increase the score. The game ends when the snake collides with itself or the walls.

## File Structure
```
snake-game/
├── index.html  — HTML structure with canvas and UI controls
├── style.css   — All styling (Catppuccin Mocha theme)
└── script.js   — All game logic (movement, collision, scoring)
```

## Constraints

### Styling
- **Use Catppuccin Mocha palette** exclusively.
- **No light mode** — dark theme only, always.

### Code Organization
- **Separate CSS and JS from HTML.** Keep styles in `style.css` and logic in `script.js`; never inline them in `index.html`.
- Each file has a single responsibility.
- **JSDoc with type hints required.** All variables, constants, and functions must include JSDoc comments with proper `@typedef`, `@type`, parameter types, and return type annotations.

### Game Features
- Grid-based movement on an HTML5 Canvas
- Keyboard controls (arrow keys or WASD)
- Food spawns randomly on the grid
- Snake grows when eating food
- Score display
- Game over on wall or self collision
- Restart option after game over
- Speed increases as score goes up

### UI Elements
- Start/Pause button
- Score counter
- Game over overlay with final score and restart button
- Clean, minimal design consistent with other subprojects

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
| Green      | `#a6e3a1`| Positive values, snake    |
| Red        | `#f38ba8`| Negative values, errors   |

## Game Mechanics
- **Grid Size:** 20x20 cells
- **Cell Size:** 25px (canvas 500x500px)
- **Initial Speed:** 150ms per frame
- **Speed Increment:** 5ms faster per food eaten (minimum 50ms)
- **Score:** +10 points per food eaten
- **Controls:** Arrow keys or WASD
- **Pause:** Space bar or P key