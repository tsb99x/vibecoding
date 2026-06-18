// ============================================================
// Arkanoid Game — All game logic
// ============================================================

/**
 * @typedef {Object} Vec2         — 2D vector
 * @property {number} x          — X coordinate
 * @property {number} y          — Y coordinate
 */

/**
 * @typedef {Object} Ball         — Game ball
 * @property {number} x          — X position
 * @property {number} y          — Y position
 * @property {number} dx         — X velocity
 * @property {number} dy         — Y velocity
 * @property {number} radius     — Ball radius
 * @property {string} color      — Ball fill color
 */

/**
 * @typedef {Object} Paddle       — Player paddle
 * @property {number} x          — X position (left edge)
 * @property {number} y          — Y position
 * @property {number} width      — Paddle width
 * @property {number} height     — Paddle height
 * @property {string} color      — Paddle fill color
 * @property {number} speed      — Horizontal movement speed
 */

/**
 * @typedef {Object} Brick        — Single brick
 * @property {number} x          — X position (left edge)
 * @property {number} y          — Y position (top edge)
 * @property {number} width      — Brick width
 * @property {number} height     — Brick height
 * @property {string} color      — Brick fill color
 * @property {boolean} visible   — Whether the brick is still on field
 */

/**
 * @typedef {Object} GameState    — Full game state
 * @property {Ball} ball
 * @property {Paddle} paddle
 * @property {Brick[]} bricks
 * @property {number} score
 * @property {number} lives
 * @property {number} level
 * @property {boolean} running
 * @property {boolean} paused
 * @property {boolean} gameOver
 * @property {boolean} won
 * @property {number[]} keys — Set of currently pressed key codes
 * @property {number} animFrame — requestAnimationFrame handle
 */

// ——— Canvas & Context ———

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('gameCanvas');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

// ——— DOM References ———

/** @type {HTMLSpanElement} */
const scoreEl = document.getElementById('score');

/** @type {HTMLSpanElement} */
const livesEl = document.getElementById('lives');

/** @type {HTMLSpanElement} */
const levelEl = document.getElementById('level');

/** @type {HTMLButtonElement} */
const startBtn = document.getElementById('startBtn');

/** @type {HTMLButtonElement} */
const pauseBtn = document.getElementById('pauseBtn');

/** @type {HTMLButtonElement} */
const restartBtn = document.getElementById('restartBtn');

/** @type {HTMLElement} */
const overlay = document.getElementById('overlay');

/** @type {HTMLHeadingElement} */
const overlayTitle = document.getElementById('overlayTitle');

/** @type {HTMLParagraphElement} */
const overlayMessage = document.getElementById('overlayMessage');

/** @type {HTMLButtonElement} */
const overlayRestartBtn = document.getElementById('overlayRestartBtn');

// ——— Constants ———

/** @type {number} */
const CANVAS_WIDTH = 480;

/** @type {number} */
const CANVAS_HEIGHT = 600;

/** @type {number} */
const PADDLE_WIDTH = 80;

/** @type {number} */
const PADDLE_HEIGHT = 12;

/** @type {number} */
const PADDLE_SPEED = 6;

/** @type {number} */
const BALL_RADIUS = 6;

/** @type {number} */
const INITIAL_SPEED = 4;

/** @type {number} */
const BRICK_WIDTH = 60;

/** @type {number} */
const BRICK_HEIGHT = 18;

/** @type {number} */
const BRICK_PADDING = 4;

/** @type {number} */
const BRICK_TOP_OFFSET = 50;

/** @type {number} */
const BRICK_ROWS = 5;

/** @type {number} */
const BRICK_COLS = 7;

/** @type {number} */
const MAX_LIVES = 3;

/**
 * Catppuccin colors for brick rows (top → bottom).
 * @type {string[]}
 */
const BRICK_ROW_COLORS = [
  '#f38ba8', // red
  '#fab387', // peach
  '#f9e2af', // yellow
  '#a6e3a1', // green
  '#89b4fa', // blue
];

/** @type {string} */
const PADDLE_COLOR = '#a6e3a1'; // green

/** @type {string} */
const BALL_COLOR = '#cba6f7'; // mauve

// ——— Game State ———

/** @type {GameState} */
let state = {};

/**
 * Initialise (or reset) the full game state.
 * @returns {GameState}
 */
function initState() {
  /** @type {Brick[]} */
  const bricks = [];

  // Calculate total brick area width to center the grid
  const totalBrickWidth = BRICK_COLS * (BRICK_WIDTH + BRICK_PADDING) - BRICK_PADDING;
  const startX = (CANVAS_WIDTH - totalBrickWidth) / 2;

  for (let row = 0; row < BRICK_ROWS; row++) {
    for (let col = 0; col < BRICK_COLS; col++) {
      bricks.push({
        x: startX + col * (BRICK_WIDTH + BRICK_PADDING),
        y: BRICK_TOP_OFFSET + row * (BRICK_HEIGHT + BRICK_PADDING),
        width: BRICK_WIDTH,
        height: BRICK_HEIGHT,
        color: BRICK_ROW_COLORS[row % BRICK_ROW_COLORS.length],
        visible: true,
      });
    }
  }

  const halfSpeed = INITIAL_SPEED;

  return {
    ball: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 40,
      dx: halfSpeed * (Math.random() > 0.5 ? 1 : -1),
      dy: -halfSpeed,
      radius: BALL_RADIUS,
      color: BALL_COLOR,
    },
    paddle: {
      x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2,
      y: CANVAS_HEIGHT - PADDLE_HEIGHT - 20,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
      color: PADDLE_COLOR,
      speed: PADDLE_SPEED,
    },
    bricks,
    score: 0,
    lives: MAX_LIVES,
    level: 1,
    running: false,
    paused: false,
    gameOver: false,
    won: false,
    keys: [],
    animFrame: 0,
  };
}

// ——— Drawing Helpers ———

/**
 * Draw a rounded rectangle.
 * @param {CanvasRenderingContext2D} c — Context
 * @param {number} x — X
 * @param {number} y — Y
 * @param {number} w — Width
 * @param {number} h — Height
 * @param {number} r — Corner radius
 */
function roundRect(c, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

// ——— Render ———

/**
 * Render the current game frame.
 */
function render() {
  // Clear
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Bricks
  for (const brick of state.bricks) {
    if (!brick.visible) continue;
    ctx.fillStyle = brick.color;
    roundRect(ctx, brick.x, brick.y, brick.width, brick.height, 3);
    ctx.fill();
  }

  // Paddle
  ctx.fillStyle = state.paddle.color;
  roundRect(ctx, state.paddle.x, state.paddle.y, state.paddle.width, state.paddle.height, 4);
  ctx.fill();

  // Ball
  ctx.beginPath();
  ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = state.ball.color;
  ctx.fill();
  ctx.closePath();
}

// ——— Update UI DOM ———

/**
 * Sync score / lives / level elements with game state.
 */
function updateUI() {
  scoreEl.textContent = state.score;
  livesEl.textContent = state.lives;
  levelEl.textContent = state.level;
}

// ——— Collision Detection ———

/**
 * Check if ball collides with a brick. Uses AABB vs circle approximation.
 * @param {Ball} ball
 * @param {Brick} brick
 * @returns {boolean}
 */
function ballBrickCollision(ball, brick) {
  const closestX = Math.max(brick.x, Math.min(ball.x, brick.x + brick.width));
  const closestY = Math.max(brick.y, Math.min(ball.y, brick.y + brick.height));
  const dx = ball.x - closestX;
  const dy = ball.y - closestY;
  return dx * dx + dy * dy <= ball.radius * ball.radius;
}

// ——— Game Update ———

/**
 * Single game-tick: move entities, handle collisions.
 */
function update() {
  const { ball, paddle, bricks } = state;

  // — Move paddle via keyboard —
  if (state.keys.includes('ArrowLeft') || state.keys.includes('a') || state.keys.includes('A')) {
    paddle.x = Math.max(0, paddle.x - paddle.speed);
  }
  if (state.keys.includes('ArrowRight') || state.keys.includes('d') || state.keys.includes('D')) {
    paddle.x = Math.min(CANVAS_WIDTH - paddle.width, paddle.x + paddle.speed);
  }

  // Clamp paddle (safety)
  paddle.x = Math.max(0, Math.min(CANVAS_WIDTH - paddle.width, paddle.x));

  // — Move ball —
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collisions
  if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= CANVAS_WIDTH) {
    ball.dx *= -1;
  }
  if (ball.y - ball.radius <= 0) {
    ball.dy *= -1;
  }

  // Ball falls below paddle → lose a life
  if (ball.y + ball.radius >= CANVAS_HEIGHT) {
    state.lives--;
    updateUI();
    if (state.lives <= 0) {
      endGame(false);
      return;
    }
    resetBall();
    return;
  }

  // Paddle collision
  if (
    ball.dy > 0 && // ball moving downward
    ball.y + ball.radius >= paddle.y &&
    ball.y + ball.radius <= paddle.y + paddle.height + 4 &&
    ball.x >= paddle.x &&
    ball.x <= paddle.x + paddle.width
  ) {
    // Calculate bounce angle based on where ball hit the paddle
    const hitPos = (ball.x - paddle.x) / paddle.width; // 0..1
    const angle = hitPos * 120 - 60; // -60..+60 degrees from vertical
    const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
    const rad = (angle * Math.PI) / 180;
    ball.dx = speed * Math.sin(rad);
    ball.dy = -speed * Math.cos(rad);
  }

  // Brick collisions
  for (const brick of bricks) {
    if (!brick.visible) continue;
    if (ballBrickCollision(ball, brick)) {
      brick.visible = false;
      ball.dy *= -1;
      state.score += 10;
      updateUI();
      break; // one brick per frame
    }
  }

  // Win check
  if (bricks.every((b) => !b.visible)) {
    endGame(true);
  }
}

// ——— Ball Reset ———

/**
 * Reset ball to center above paddle after losing a life.
 */
function resetBall() {
  const halfSpeed = INITIAL_SPEED + (state.level - 1) * 0.5;
  state.ball.x = state.paddle.x + state.paddle.width / 2;
  state.ball.y = state.paddle.y - BALL_RADIUS - 2;
  state.ball.dx = halfSpeed * (Math.random() > 0.5 ? 1 : -1);
  state.ball.dy = -halfSpeed;
}

// ——— Game Loop ———

/**
 * Main loop callback.
 */
function loop() {
  if (!state.running || state.paused) return;
  update();
  render();
  state.animFrame = requestAnimationFrame(loop);
}

// ——— Start / Pause / End ———

/**
 * Start (or resume) the game loop.
 */
function startGame() {
  if (state.gameOver || state.won) return;
  state.running = true;
  state.paused = false;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  pauseBtn.textContent = 'Pause';
  loop();
}

/**
 * Toggle pause state.
 */
function togglePause() {
  if (!state.running) return;
  state.paused = !state.paused;
  pauseBtn.textContent = state.paused ? 'Resume' : 'Pause';
  if (!state.paused) {
    loop();
  }
}

/**
 * End the game and show overlay.
 * @param {boolean} won — true for win, false for game over.
 */
function endGame(won) {
  state.running = false;
  state.gameOver = !won;
  state.won = won;
  cancelAnimationFrame(state.animFrame);

  startBtn.disabled = true;
  pauseBtn.disabled = true;
  restartBtn.style.display = '';

  overlayTitle.textContent = won ? 'You Win!' : 'Game Over';
  overlayTitle.style.color = won ? 'var(--ctp-green)' : 'var(--ctp-red)';
  overlayMessage.textContent = won
    ? `All bricks destroyed! Final Score: ${state.score}`
    : `No lives remaining. Final Score: ${state.score}`;
  overlay.style.display = 'flex';
}

/**
 * Full restart — reset state, hide overlay, render initial frame.
 */
function restartGame() {
  cancelAnimationFrame(state.animFrame);
  overlay.style.display = 'none';
  state = initState();
  updateUI();
  render();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  pauseBtn.textContent = 'Pause';
  restartBtn.style.display = 'none';
}

// ——— Input: Keyboard ———

/**
 * @param {KeyboardEvent} e
 */
function handleKeydown(e) {
  if (e.repeat) return;
  state.keys.push(e.key);

  // Space or P → toggle pause
  if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
    if (state.running) {
      e.preventDefault();
      togglePause();
    }
  }
}

/**
 * @param {KeyboardEvent} e
 */
function handleKeyup(e) {
  const idx = state.keys.indexOf(e.key);
  if (idx !== -1) state.keys.splice(idx, 1);
}

// ——— Input: Mouse ———

/**
 * Move paddle to follow mouse X within canvas.
 * @param {MouseEvent} e
 */
function handleMousemove(e) {
  if (!state.running || state.paused) return;
  const rect = canvas.getBoundingClientRect();
  const scaleX = CANVAS_WIDTH / rect.width;
  const mouseX = (e.clientX - rect.left) * scaleX;
  state.paddle.x = Math.max(
    0,
    Math.min(CANVAS_WIDTH - state.paddle.width, mouseX - state.paddle.width / 2)
  );
}

// ——— Init & Bind ———

/**
 * Bootstrap: reset state, render initial frame, bind events.
 */
function init() {
  state = initState();
  updateUI();
  render();

  // Button events
  startBtn.addEventListener('click', startGame);
  pauseBtn.addEventListener('click', togglePause);
  restartBtn.addEventListener('click', restartGame);
  overlayRestartBtn.addEventListener('click', restartGame);

  // Keyboard
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('keyup', handleKeyup);

  // Mouse on canvas
  canvas.addEventListener('mousemove', handleMousemove);
}

// Go
init();