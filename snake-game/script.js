/**
 * @typedef {Object} Point
 * @property {number} x - X coordinate on the grid
 * @property {number} y - Y coordinate on the grid
 */

/**
 * @typedef {Object} ColorPalette
 * @property {string} crust
 * @property {string} surface0
 * @property {string} green
 * @property {string} red
 */

// Game constants
/** @type {number} */
const GRID_SIZE = 20;

/** @type {number} */
const CELL_SIZE = 25;

/** @type {number} */
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE; // 500px

/** @type {number} */
const INITIAL_SPEED = 150;

/** @type {number} */
const SPEED_INCREMENT = 5;

/** @type {number} */
const MIN_SPEED = 50;

/** @type {number} */
const SCORE_PER_FOOD = 10;

// Catppuccin Mocha colors
/** @type {ColorPalette} */
const COLORS = {
    crust: '#11111b',
    surface0: '#313244',
    green: '#a6e3a1',
    red: '#f38ba8',
};

// DOM elements
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('gameCanvas');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

/** @type {HTMLElement} */
const scoreDisplay = document.getElementById('score');

/** @type {HTMLElement} */
const finalScoreDisplay = document.getElementById('finalScore');

/** @type {HTMLElement} */
const gameOverOverlay = document.getElementById('gameOverOverlay');

/** @type {HTMLElement} */
const startOverlay = document.getElementById('startOverlay');

/** @type {HTMLElement} */
const pauseOverlay = document.getElementById('pauseOverlay');

/** @type {HTMLButtonElement} */
const startButton = document.getElementById('startButton');

/** @type {HTMLButtonElement} */
const restartButton = document.getElementById('restartButton');

/** @type {HTMLButtonElement} */
const resumeButton = document.getElementById('resumeButton');

/** @type {HTMLButtonElement} */
const pauseButton = document.getElementById('pauseButton');

/** @type {HTMLButtonElement} */
const resetButton = document.getElementById('resetButton');

// Game state
/** @type {Point[]} */
let snake = [];

/** @type {Point} */
let direction = { x: 1, y: 0 };

/** @type {Point} */
let nextDirection = { x: 1, y: 0 };

/** @type {Point} */
let food = { x: 0, y: 0 };

/** @type {number} */
let score = 0;

/** @type {number} */
let gameSpeed = INITIAL_SPEED;

/** @type {ReturnType<typeof setInterval>|null} */
let gameLoop = null;

/** @type {boolean} */
let isRunning = false;

/** @type {boolean} */
let isPaused = false;

/**
 * Initialize the game state
 */
function initGame() {
    // Start snake in the center, 3 segments long
    const startX = Math.floor(GRID_SIZE / 2);
    const startY = Math.floor(GRID_SIZE / 2);
    snake = [
        { x: startX, y: startY },
        { x: startX - 1, y: startY },
        { x: startX - 2, y: startY },
    ];

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    gameSpeed = INITIAL_SPEED;
    isPaused = false;

    updateScoreDisplay();
    spawnFood();
    draw();
}

/**
 * Spawn food at a random position not occupied by the snake
 */
function spawnFood() {
    let validPosition = false;
    while (!validPosition) {
        food.x = Math.floor(Math.random() * GRID_SIZE);
        food.y = Math.floor(Math.random() * GRID_SIZE);

        validPosition = !snake.some(segment => segment.x === food.x && segment.y === food.y);
    }
}

/**
 * Update the score display
 */
function updateScoreDisplay() {
    scoreDisplay.textContent = score;
}

/**
 * Draw the game state on the canvas
 */
function draw() {
    // Clear canvas
    ctx.fillStyle = COLORS.crust;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid lines (subtle)
    ctx.strokeStyle = COLORS.surface0;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
        ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = COLORS.red;
    ctx.fillRect(
        food.x * CELL_SIZE + 2,
        food.y * CELL_SIZE + 2,
        CELL_SIZE - 4,
        CELL_SIZE - 4
    );

    // Draw snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Head - brighter green
            ctx.fillStyle = COLORS.green;
        } else {
            // Body - slightly darker
            ctx.fillStyle = COLORS.green;
            ctx.globalAlpha = 0.8;
        }

        ctx.fillRect(
            segment.x * CELL_SIZE + 1,
            segment.y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
        );

        ctx.globalAlpha = 1.0;
    });
}

/**
 * Update game state (move snake, check collisions, etc.)
 */
function update() {
    // Apply queued direction
    direction = { ...nextDirection };

    // Calculate new head position
    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    // Check wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        gameOver();
        return;
    }

    // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    // Add new head
    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += SCORE_PER_FOOD;
        updateScoreDisplay();

        // Increase speed
        gameSpeed = Math.max(MIN_SPEED, gameSpeed - SPEED_INCREMENT);

        spawnFood();

        // Restart loop with new speed
        clearInterval(gameLoop);
        gameLoop = setInterval(gameTick, gameSpeed);
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }

    draw();
}

/**
 * Single game tick (update + draw)
 */
function gameTick() {
    update();
}

/**
 * Start the game
 */
function startGame() {
    initGame();
    isRunning = true;
    isPaused = false;

    startOverlay.classList.add('hidden');
    gameOverOverlay.classList.add('hidden');
    pauseOverlay.classList.add('hidden');

    pauseButton.disabled = false;
    resetButton.disabled = false;
    pauseButton.textContent = 'Pause';

    gameLoop = setInterval(gameTick, gameSpeed);
}

/**
 * Pause the game
 */
function pauseGame() {
    if (!isRunning || isPaused) return;

    isPaused = true;
    clearInterval(gameLoop);

    pauseOverlay.classList.remove('hidden');
    pauseButton.textContent = 'Resume';
}

/**
 * Resume the game
 */
function resumeGame() {
    if (!isRunning || !isPaused) return;

    isPaused = false;
    pauseOverlay.classList.add('hidden');

    pauseButton.textContent = 'Pause';
    gameLoop = setInterval(gameTick, gameSpeed);
}

/**
 * Toggle pause state
 */
function togglePause() {
    if (isPaused) {
        resumeGame();
    } else {
        pauseGame();
    }
}

/**
 * Reset the game to initial state
 */
function resetGame() {
    clearInterval(gameLoop);
    isRunning = false;
    isPaused = false;

    pauseButton.disabled = true;
    resetButton.disabled = true;

    startOverlay.classList.remove('hidden');
    gameOverOverlay.classList.add('hidden');
    pauseOverlay.classList.add('hidden');

    initGame();
}

/**
 * Handle game over
 */
function gameOver() {
    clearInterval(gameLoop);
    isRunning = false;
    isPaused = false;

    finalScoreDisplay.textContent = score;
    gameOverOverlay.classList.remove('hidden');

    pauseButton.disabled = true;
    resetButton.disabled = true;
}

/**
 * Handle keyboard input
 * @param {KeyboardEvent} event
 */
function handleKeyDown(event) {
    // Prevent default for game control keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyP'].includes(event.code)) {
        event.preventDefault();
    }

    // Toggle pause with Space or P
    if ((event.code === 'Space' || event.code === 'KeyP') && isRunning) {
        togglePause();
        return;
    }

    // Don't allow direction changes when paused or not running
    if (isPaused || !isRunning) return;

    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            if (direction.y !== 1) {
                nextDirection = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
        case 'KeyS':
            if (direction.y !== -1) {
                nextDirection = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
        case 'KeyA':
            if (direction.x !== 1) {
                nextDirection = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
        case 'KeyD':
            if (direction.x !== -1) {
                nextDirection = { x: 1, y: 0 };
            }
            break;
    }
}

// Event listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
resumeButton.addEventListener('click', resumeGame);
pauseButton.addEventListener('click', togglePause);
resetButton.addEventListener('click', resetGame);

document.addEventListener('keydown', handleKeyDown);

// Initial draw
initGame();