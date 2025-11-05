import { ref, computed } from 'vue';

const STORAGE_KEY = 'minecraft-sounds-global-volume';

const globalVolumeSingleton = {
    volume: null,
    init() {
        if (this.volume === null) {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                const parsed = parseFloat(stored);
                this.volume = ref(isNaN(parsed) ? 1.0 : Math.max(0, Math.min(1, parsed)));
            } catch (e) {
                console.error('Error loading global volume:', e);
                this.volume = ref(1.0);
            }
        }
        return this.volume;
    }
};

export const useGlobalVolume = () => {
    const globalVolume = globalVolumeSingleton.init();

    const saveGlobalVolume = () => {
        try {
            localStorage.setItem(STORAGE_KEY, globalVolume.value.toString());
        } catch (e) {
            console.error('Error saving global volume:', e);
        }
    };

    const setGlobalVolume = (volume) => {
        const clampedVolume = Math.max(0, Math.min(1, parseFloat(volume) || 0));
        globalVolume.value = clampedVolume;
        saveGlobalVolume();
    };

    const getEffectiveVolume = (individualVolume) => {
        return globalVolume.value * (individualVolume || 1.0);
    };

    const globalVolumePercentage = computed(() => Math.round(globalVolume.value * 100));

    return {
        globalVolume,
        setGlobalVolume,
        getEffectiveVolume,
        globalVolumePercentage,
    };
};