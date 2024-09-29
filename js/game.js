import { setupEventListeners, updateShipPosition } from './controls.js';
import { drawGame } from './render.js';
import { updateGame } from './gameLogic.js';
import { playBackgroundMusic } from './audio.js';
import { CONFIG } from './config.js';

let game, ship, bullets, enemies, boss, score, level;

function initGame() {
    console.log('Initializing game');
    
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Unable to get 2D context');
        return;
    }

    game = {
        canvas: canvas,
        ctx: ctx,
        isPaused: false,
        isGameStarted: false,
        gameOver: false,
    };

    ship = {
        x: canvas.width / 2,
        y: canvas.height - CONFIG.PLAYER.SIZE,
        size: CONFIG.PLAYER.SIZE,
        speed: CONFIG.PLAYER.SPEED,
        hp: CONFIG.PLAYER.INITIAL_HP,
        maxHp: CONFIG.PLAYER.INITIAL_HP,
    };

    bullets = [];
    enemies = [];
    boss = null;
    score = 0;
    level = 1;

    setupEventListeners(game, ship, bullets, restartGame);
    
    const mainMenu = document.getElementById('mainMenu');
    if (mainMenu) {
        mainMenu.style.display = 'block';
    } else {
        console.error('Main menu element not found');
    }

    gameLoop();
}

function gameLoop() {
    if (!game.isPaused) {
        if (game.isGameStarted && !game.gameOver) {
            updateShipPosition(ship, game.canvas);
            updateGame(game, ship, bullets, enemies, boss, score, level);
        } else {
            // Анимация корабля на главном экране
            ship.y = (game.canvas.height / 2) + Math.sin(Date.now() / 1000) * 100;
        }
    }
    
    drawGame(game.ctx, game, ship, bullets, enemies, boss, score, level);
    requestAnimationFrame(gameLoop);
}

function restartGame() {
    console.log('Restarting game');
    game.isGameStarted = true;
    game.isPaused = false;
    game.gameOver = false;
    ship.hp = ship.maxHp;
    bullets = [];
    enemies = [];
    boss = null;
    score = 0;
    level = 1;
    ship.x = game.canvas.width / 2;
    ship.y = game.canvas.height - CONFIG.PLAYER.SIZE;
    playBackgroundMusic();
}

window.addEventListener('resize', () => {
    if (game && game.canvas) {
        game.canvas.width = window.innerWidth;
        game.canvas.height = window.innerHeight;
        ship.x = game.canvas.width / 2;
        ship.y = game.canvas.height - CONFIG.PLAYER.SIZE;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    initGame();
});

export { game, ship, bullets, enemies, boss, score, level };