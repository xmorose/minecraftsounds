import { ref, computed } from 'vue';

const STORAGE_KEY = 'minecraft-sounds-favorites';

const favoritesSingleton = {
    favorites: null,
    init() {
        if (this.favorites === null) {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                const parsed = JSON.parse(stored || '[]');
                this.favorites = ref(Array.isArray(parsed) ? parsed.filter(Boolean) : []);
            } catch (e) {
                console.error('Error loading favorites:', e);
                this.favorites = ref([]);
            }
        }
        return this.favorites;
    }
};

export const useFavorites = () => {
    const favoriteSounds = favoritesSingleton.init();

    const getSoundIdentifier = (sound) => {
        if (!sound) return null;
        if (sound.isGrouped) {
            return `group:${sound.displayName}`;
        }
        return JSON.stringify({
            fileName: sound.soundFileName,
            displayName: sound.displayName
        });
    };

    const saveFavorites = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteSounds.value));
        } catch (e) {
            console.error('Error saving favorites:', e);
        }
    };

    const addToFavorites = (sound) => {
        const identifier = getSoundIdentifier(sound);
        if (identifier && !favoriteSounds.value.includes(identifier)) {
            favoriteSounds.value = [...favoriteSounds.value, identifier];
            saveFavorites();
        }
    };

    const removeFromFavorites = (sound) => {
        const identifier = getSoundIdentifier(sound);
        if (identifier) {
            favoriteSounds.value = favoriteSounds.value.filter(id => id !== identifier);
            saveFavorites();
        }
    };

    const isFavorite = (sound) => {
        const identifier = getSoundIdentifier(sound);
        return identifier ? favoriteSounds.value.includes(identifier) : false;
    };

    const toggleFavorite = (sound) => {
        if (isFavorite(sound)) {
            removeFromFavorites(sound);
        } else {
            addToFavorites(sound);
        }
    };

    const getFavoriteSounds = (allSounds) => {
        return allSounds.filter(sound => {
            if (sound.isGrouped) {
                return favoriteSounds.value.includes(`group:${sound.displayName}`);
            }
            return favoriteSounds.value.includes(getSoundIdentifier(sound));
        });
    };

    const favoriteCount = computed(() => favoriteSounds.value.length);

    const clearFavorites = () => {
        favoriteSounds.value = [];
        saveFavorites();
    };

    return {
        favoriteSounds,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        getFavoriteSounds,
        favoriteCount,
        clearFavorites
    };
};