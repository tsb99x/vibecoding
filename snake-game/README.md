# Snake Game

A classic Snake Game implemented as a single-page web application. Control a snake on a grid, eat food to grow longer and increase your score. The game ends when the snake collides with itself or the walls.

## Features

- **Grid-based gameplay** — 20×20 grid rendered on HTML5 Canvas (500×500px)
- **Keyboard controls** — Arrow keys or WASD to steer, Space or P to pause
- **Increasing difficulty** — Speed increases by 5ms per food eaten (from 150ms down to 50ms minimum)
- **Scoring** — +10 points per food eaten
- **Catppuccin Mocha theme** — Dark-only retro-styled UI

## How to Play

Open `index.html` in a web browser. Press the Start button and use arrow keys or WASD to control the snake. Eat food to grow and score points. Avoid hitting walls or yourself.

## Files

| File | Description |
|------|-------------|
| `index.html` | HTML structure with canvas and UI controls |
| `style.css` | Catppuccin Mocha styling |
| `script.js` | Game logic including movement, collision, and scoring |
