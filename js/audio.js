// audio.js
let musicVolume = 0.5;
let sfxVolume = 0.5;

export function playBackgroundMusic() {
    console.log('Background music would play here if implemented');
}

export function playShootSound() {
    console.log('Shoot sound would play here if implemented');
}

export function setMusicVolume(volume) {
    musicVolume = volume;
    console.log(`Music volume set to ${volume}`);
}

export function setSfxVolume(volume) {
    sfxVolume = volume;
    console.log(`SFX volume set to ${volume}`);
}

export function stopBackgroundMusic() {
    console.log('Background music would stop here if implemented');
}