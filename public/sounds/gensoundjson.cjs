const fs = require('fs');
const path = require('path');

const soundsFilePath = path.join(__dirname, 'sounds.json');
const outputDir = path.join(__dirname, 'json_chunks');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const soundsData = JSON.parse(fs.readFileSync(soundsFilePath, 'utf8'));

const chunks = new Map();

Object.entries(soundsData).forEach(([categoryKey, categoryData]) => {
    if (!categoryData.sounds || !Array.isArray(categoryData.sounds) || categoryData.sounds.length === 0) {
        return;
    }

    const cleanCategoryData = { ...categoryData };
    delete cleanCategoryData.subtitle;
    delete cleanCategoryData.subtitles;

    categoryData.sounds.forEach(sound => {
        if (typeof sound === 'object' && sound.type === 'event') {
            return;
        }

        const soundName = typeof sound === 'string' ? sound : sound.name;
        if (!soundName) return;

        const baseName = soundName.replace(/\.[^/.]+$/, '');
        const newKey = baseName.replace(/\//g, '.');

        const chunkName = soundName.split('/')[0];

        const newSoundEntry = {
            sounds: [{
                ...(typeof sound === 'string'
                        ? { name: sound }
                        : (() => {
                            const cleanSound = { ...sound };
                            delete cleanSound.subtitle;
                            delete cleanSound.subtitles;
                            return cleanSound;
                        })()
                )
            }]
        };

        Object.entries(cleanCategoryData).forEach(([key, value]) => {
            if (key !== 'sounds' && key !== 'subtitle' && key !== 'subtitles') {
                newSoundEntry[key] = value;
            }
        });

        if (!chunks.has(chunkName)) {
            chunks.set(chunkName, {});
        }
        chunks.get(chunkName)[newKey] = newSoundEntry;
    });
});

chunks.forEach((chunkData, chunkName) => {
    const chunkPath = path.join(outputDir, `${chunkName}.json`);
    fs.writeFileSync(
        chunkPath,
        JSON.stringify(chunkData, null, 2),
        'utf8'
    );
    console.log(`Created chunk file: ${chunkName}.json`);
});