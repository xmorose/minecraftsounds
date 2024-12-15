const fs = require('fs');
const path = require('path');

const soundsFilePath = path.join(__dirname, 'sounds.json');
const outputDir = path.join(__dirname, 'sound_chunks');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const soundsData = JSON.parse(fs.readFileSync(soundsFilePath, 'utf8'));

function filterAndMergeSounds(existingSounds, newSounds) {
    for (const [key, value] of Object.entries(newSounds)) {
        const filteredSounds = value.sounds.filter(sound => {
            if (typeof sound === 'string') return true;

            return !sound.type || sound.type !== 'event';
        });

        if (filteredSounds.length > 0) {
            if (existingSounds[key]) {
                const existingSoundNames = new Set(existingSounds[key].sounds.map(s =>
                    typeof s === 'string' ? s : s.name
                ));

                const newFilteredSounds = filteredSounds.filter(sound => {
                    const soundName = typeof sound === 'string' ? sound : sound.name;
                    return !existingSoundNames.has(soundName);
                });

                existingSounds[key].sounds = existingSounds[key].sounds.concat(newFilteredSounds);
            } else {
                existingSounds[key] = {
                    ...value,
                    sounds: filteredSounds
                };
            }
        }
    }
    return existingSounds;
}

Object.entries(soundsData).forEach(([key, data]) => {
    const category = key.split('.')[0];
    const outputFilePath = path.join(outputDir, `${category}.json`);

    let existingSoundData = {};

    if (fs.existsSync(outputFilePath)) {
        const existingData = fs.readFileSync(outputFilePath, 'utf8');
        existingSoundData = JSON.parse(existingData);
    }

    const updatedSoundData = filterAndMergeSounds(existingSoundData, {
        [key]: data
    });

    if (Object.keys(updatedSoundData).length > 0) {
        fs.writeFileSync(outputFilePath, JSON.stringify(updatedSoundData, null, 2), 'utf8');
        console.log(`Updated ${category}.json`);
    }
});