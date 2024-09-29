export const CONFIG = {
    // Настройки игрока
    PLAYER: {
        INITIAL_HP: 100,
        SPEED: 30,
        SIZE: 30,
        BULLET_SPEED: 10,
        BULLET_DAMAGE: 10,
        FIRE_RATE: 250, // миллисекунды между выстрелами
    },

    // Настройки врагов
    ENEMIES: { // Изменено с ENEMY на ENEMIES
        TYPES: [
            { name: "Scout", hp: 10, speed: 2, damage: 5, points: 10, size: 20 },
            { name: "Fighter", hp: 20, speed: 1.5, damage: 10, points: 20, size: 25 },
            { name: "Tank", hp: 40, speed: 1, damage: 15, points: 30, size: 30 },
        ],
        SPAWN_RATE: 0.02,
        BULLET_SPEED: 5,
    },

    // Настройки боссов
    BOSSES: [
        { name: "Destroyer", hp: 500, speed: 1, damage: 20, points: 1000, size: 60, bulletSpeed: 7 },
        { name: "Mothership", hp: 1000, speed: 0.5, damage: 30, points: 2000, size: 80, bulletSpeed: 6 },
        { name: "Dreadnought", hp: 2000, speed: 0.3, damage: 50, points: 5000, size: 100, bulletSpeed: 5 },
    ],

    // Общие настройки игры
    GAME: {
        LEVEL_UP_SCORE: 1000,
        BOSS_SPAWN_SCORE: 5000,
    },

    // Настройки аудио
    AUDIO: {
        DEFAULT_VOLUME: 0.5,
    },
};