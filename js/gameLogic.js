import { CONFIG } from './config.js';

export function updateGame(game, ship, bullets, enemies, boss, score, level) {
    updateBullets(bullets, game.canvas.height);
    updateEnemies(enemies, game.canvas.width, game.canvas.height);
    checkCollisions(ship, bullets, enemies, boss, score);
    spawnEnemies(enemies, game.canvas.width, level);
}

function updateBullets(bullets, canvasHeight) {
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bullets[i].speed;
        if (bullets[i].y + bullets[i].size < 0) {
            bullets.splice(i, 1);
        }
    }
}

function updateEnemies(enemies, canvasWidth, canvasHeight) {
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].y += enemies[i].speed;
        if (enemies[i].y > canvasHeight) {
            enemies.splice(i, 1);
        }
    }
}

function spawnEnemies(enemies, canvasWidth, level) {
    if (Math.random() < CONFIG.ENEMIES.SPAWN_RATE * level) { // Изменено с CONFIG.ENEMY на CONFIG.ENEMIES
        const enemyType = CONFIG.ENEMIES.TYPES[Math.floor(Math.random() * CONFIG.ENEMIES.TYPES.length)];
        enemies.push({
            x: Math.random() * (canvasWidth - enemyType.size),
            y: -enemyType.size,
            size: enemyType.size,
            speed: enemyType.speed,
            hp: enemyType.hp,
            damage: enemyType.damage,
            points: enemyType.points,
        });
    }
}

function checkCollisions(ship, bullets, enemies, boss, score) {
    // Проверка столкновений пуль с врагами
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (isColliding(bullets[i], enemies[j])) {
                enemies[j].hp -= bullets[i].damage;
                bullets.splice(i, 1);
                if (enemies[j].hp <= 0) {
                    score += enemies[j].points; // Изменено на использование points конкретного врага
                    enemies.splice(j, 1);
                }
                break;
            }
        }
    }

    // Проверка столкновений корабля с врагами
    for (let i = enemies.length - 1; i >= 0; i--) {
        if (isColliding(ship, enemies[i])) {
            ship.hp -= enemies[i].damage;
            enemies.splice(i, 1);
        }
    }
}

function isColliding(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.size &&
        obj1.x + obj1.size > obj2.x &&
        obj1.y < obj2.y + obj2.size &&
        obj1.y + obj1.size > obj2.y
    );
}