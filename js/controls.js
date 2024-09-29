import { CONFIG } from './config.js';

let lastShootTime = 0;
let keys = { ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false };

export function setupEventListeners(game, ship, bullets, restartGame) {
    console.log('Setting up event listeners');

    // Главное меню
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', () => {
            console.log('Start button clicked');
            document.getElementById('mainMenu').style.display = 'none';
            restartGame();
        });
    } else {
        console.error('Start button not found');
    }

    const settingsButton = document.getElementById('settingsButton');
    if (settingsButton) {
        settingsButton.addEventListener('click', () => {
            console.log('Settings button clicked');
            openSettingsMenu();
        });
    } else {
        console.error('Settings button not found');
    }

    const controlsButton = document.getElementById('controlsButton');
    if (controlsButton) {
        controlsButton.addEventListener('click', () => {
            console.log('Controls button clicked');
            openControlsMenu();
        });
    } else {
        console.error('Controls button not found');
    }

    const exitButton = document.getElementById('exitButton');
    if (exitButton) {
        exitButton.addEventListener('click', () => {
            console.log('Exit button clicked');
            // Здесь можно добавить логику выхода из игры
            alert('Спасибо за игру!');
        });
    } else {
        console.error('Exit button not found');
    }

    // Управление кораблем и стрельба
    document.addEventListener('keydown', (e) => handleKeyDown(e, game, ship, bullets));
    document.addEventListener('keyup', handleKeyUp);

    game.canvas.addEventListener('mousemove', (e) => handleMouseMove(e, game, ship));
    game.canvas.addEventListener('click', () => shoot(ship, bullets));

    // Пауза
    const pauseButton = document.getElementById('pauseButton');
    if (pauseButton) {
        pauseButton.addEventListener('click', () => togglePause(game));
    } else {
        console.error('Pause button not found');
    }

    const resumeButton = document.getElementById('resumeButton');
    if (resumeButton) {
        resumeButton.addEventListener('click', () => togglePause(game));
    } else {
        console.error('Resume button not found');
    }

    const mainMenuButton = document.getElementById('mainMenuButton');
    if (mainMenuButton) {
        mainMenuButton.addEventListener('click', () => {
            game.isGameStarted = false;
            game.isPaused = false;
            document.getElementById('pauseMenu').style.display = 'none';
            document.getElementById('mainMenu').style.display = 'block';
        });
    } else {
        console.error('Main menu button not found');
    }

    console.log('Event listeners set up');
}

function handleKeyDown(e, game, ship, bullets) {
    if (game.isGameStarted && !game.isPaused) {
        if (e.key in keys) {
            keys[e.key] = true;
        } else if (e.key === ' ') {
            shoot(ship, bullets);
        }
    }
    if (e.key === 'Escape') {
        togglePause(game);
    }
}

function handleKeyUp(e) {
    if (e.key in keys) {
        keys[e.key] = false;
    }
}

function handleMouseMove(e, game, ship) {
    if (game.isGameStarted && !game.isPaused) {
        const rect = game.canvas.getBoundingClientRect();
        ship.x = e.clientX - rect.left - ship.size / 2;
        ship.y = e.clientY - rect.top - ship.size / 2;
    }
}

export function updateShipPosition(ship, canvas) {
    if (keys.ArrowLeft) ship.x -= CONFIG.PLAYER.SPEED;
    if (keys.ArrowRight) ship.x += CONFIG.PLAYER.SPEED;
    if (keys.ArrowUp) ship.y -= CONFIG.PLAYER.SPEED;
    if (keys.ArrowDown) ship.y += CONFIG.PLAYER.SPEED;

    ship.x = Math.max(ship.size / 2, Math.min(ship.x, canvas.width - ship.size / 2));
    ship.y = Math.max(ship.size / 2, Math.min(ship.y, canvas.height - ship.size / 2));
}

function shoot(ship, bullets) {
    const currentTime = Date.now();
    if (currentTime - lastShootTime > CONFIG.PLAYER.FIRE_RATE) {
        bullets.push({
            x: ship.x,
            y: ship.y - ship.size / 2,
            speed: CONFIG.PLAYER.BULLET_SPEED,
            damage: CONFIG.PLAYER.BULLET_DAMAGE,
            size: CONFIG.PLAYER.BULLET_SIZE
        });
        lastShootTime = currentTime;
    }
}

function togglePause(game) {
    game.isPaused = !game.isPaused;
    if (game.isPaused) {
        document.getElementById('pauseMenu').style.display = 'block';
    } else {
        document.getElementById('pauseMenu').style.display = 'none';
    }
}

function openSettingsMenu() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('settingsMenu').style.display = 'block';
}

function openControlsMenu() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('controlsMenu').style.display = 'block';
}

export function closeSettingsMenu(game) {
    document.getElementById('settingsMenu').style.display = 'none';
    if (game.isGameStarted) {
        document.getElementById('pauseMenu').style.display = 'block';
    } else {
        document.getElementById('mainMenu').style.display = 'block';
    }
}