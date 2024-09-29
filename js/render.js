export function drawGame(ctx, game, ship, bullets, enemies, boss, score, level) {
    if (!ctx) {
        console.error('Canvas context is not available');
        return;
    }

    // Очистка canvas
    ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

    // Рисование фона
    ctx.fillStyle = '#000033';
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

    // Рисование звезд
    drawStars(ctx, game.canvas.width, game.canvas.height);

    // Рисование корабля
    drawShip(ctx, ship);

    // Рисование пуль
    drawBullets(ctx, bullets);

    // Рисование врагов
    drawEnemies(ctx, enemies);

    // Рисование босса
    if (boss) {
        drawBoss(ctx, boss);
    }

    // Рисование счета и уровня
    drawScore(ctx, score, level);

    // Рисование HP игрока
    drawPlayerHP(ctx, ship, game.canvas.width);

    // Если игра окончена, рисуем экран окончания игры
    if (game.gameOver) {
        drawGameOver(ctx, game.canvas.width, game.canvas.height);
    }
}

function drawStars(ctx, width, height) {
    ctx.fillStyle = 'white';
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawShip(ctx, ship) {
    ctx.fillStyle = 'cyan';
    ctx.beginPath();
    ctx.moveTo(ship.x, ship.y - ship.size);
    ctx.lineTo(ship.x - ship.size / 2, ship.y + ship.size / 2);
    ctx.lineTo(ship.x + ship.size / 2, ship.y + ship.size / 2);
    ctx.closePath();
    ctx.fill();
}

function drawBullets(ctx, bullets) {
    ctx.fillStyle = 'yellow';
    bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawEnemies(ctx, enemies) {
    ctx.fillStyle = 'red';
    enemies.forEach(enemy => {
        ctx.beginPath();
        ctx.moveTo(enemy.x, enemy.y - enemy.size / 2);
        ctx.lineTo(enemy.x - enemy.size / 2, enemy.y + enemy.size / 2);
        ctx.lineTo(enemy.x + enemy.size / 2, enemy.y + enemy.size / 2);
        ctx.closePath();
        ctx.fill();
    });
}

function drawBoss(ctx, boss) {
    ctx.fillStyle = 'purple';
    ctx.beginPath();
    ctx.moveTo(boss.x, boss.y - boss.size);
    ctx.lineTo(boss.x - boss.size, boss.y + boss.size);
    ctx.lineTo(boss.x + boss.size, boss.y + boss.size);
    ctx.closePath();
    ctx.fill();
}

function drawScore(ctx, score, level) {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Level: ${level}`, 10, 60);
}

function drawPlayerHP(ctx, ship, canvasWidth) {
    const barWidth = 200;
    const barHeight = 20;
    const x = canvasWidth - barWidth - 10;
    const y = 10;

    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, (ship.hp / ship.maxHp) * barWidth, barHeight);
}

function drawGameOver(ctx, width, height) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', width / 2, height / 2);
    ctx.font = '24px Arial';
    ctx.fillText('Press SPACE to restart', width / 2, height / 2 + 50);
}