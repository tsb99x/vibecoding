# Arkanoid

A classic Arkanoid (brick breaker) game implemented as a single-page web application.

## Features

- **Ball & Paddle Physics** — Ball bounces off walls, paddle, and bricks with angle-based paddle deflection
- **Keyboard Controls** — Arrow keys or WASD (A/D) to move the paddle
- **Mouse Controls** — Move paddle by hovering over the canvas
- **Lives System** — 3 lives; lose one when the ball falls below the paddle
- **Score Tracking** — +10 points per destroyed brick
- **Win / Game Over** — Win by destroying all bricks; game over when lives reach 0
- **Pause** — Press Space, P, or click the Pause button
- **Catppuccin Mocha Theme** — Dark theme only, no light mode

## How to Play

1. Open `index.html` in a browser.
2. Click **Start** to begin.
3. Move the paddle with the mouse or arrow keys / WASD.
4. Bounce the ball to destroy all bricks.
5. Press **Space** or **P** to pause/resume.

## File Structure

| File | Description |
|------|-------------|
| `index.html` | HTML structure with canvas and UI controls |
| `style.css` | All styling (Catppuccin Mocha theme) |
| `script.js` | All game logic (ball, paddle, bricks, collision) |

## Game Mechanics

| Property | Value |
|----------|-------|
| Canvas Size | 480 × 600 px |
| Paddle | 80 × 12 px |
| Ball Radius | 6 px |
| Bricks | 60 × 18 px, 5 rows × 7 columns |
| Initial Ball Speed | 4 px/frame |
| Lives | 3 |