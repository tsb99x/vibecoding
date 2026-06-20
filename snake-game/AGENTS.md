# AGENTS.md — Snake Game

## Project Overview
Classic Snake Game SPA. Player controls snake on a grid, eating food to grow. Game ends on wall or self collision.

## Game Mechanics
- **Grid Size:** 20x20 cells
- **Cell Size:** 25px (canvas 500x500px)
- **Initial Speed:** 150ms per frame
- **Speed Increment:** 5ms faster per food eaten (minimum 50ms)
- **Score:** +10 per food eaten
- **Controls:** Arrow keys or WASD, Space/P to pause

## UI Elements
- Start/Pause button, Score counter
- Game over overlay with final score and restart button
- "Back to Main Page" button (`../index.html`)
