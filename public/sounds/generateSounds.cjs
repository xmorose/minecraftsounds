const fs = require('fs');
const path = require('path');

const soundsFilePath = path.join(__dirname, 'sounds.json');
const outputDir = path.join(__dirname, 'sound_chunks');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const soundsData = JSON.parse(fs.readFileSync(soundsFilePath, 'utf8'));

function mergeSounds(existingSounds, newSounds) {
    for (const [key, value] of Object.entries(newSounds)) {
        if (existingSounds[key]) {
            existingSounds[key].sounds = existingSounds[key].sounds.concat(value.sounds);
        } else {
            existingSounds[key] = value;
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

    const updatedSoundData = mergeSounds(existingSoundData, {
        [key]: data
    });

    fs.writeFileSync(outputFilePath, JSON.stringify(updatedSoundData, null, 2), 'utf8');
    console.log(`Updated ${category}.json`);
});