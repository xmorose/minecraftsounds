<template>
  <div v-if="sound" class="sound-tile bg-gray-200 p-4 rounded-lg">
    <div class="tile-content">
      <p class="font-bold">{{ formattedSoundName }}</p>
      <button
          class="play-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="playSound"
      >
        Play
      </button>
      <button
          class="copy-button bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          @click="copyDisplayName"
      >
        Copy Name
      </button>
    </div>
  </div>
</template>

<script>
import { useGlobalVolume } from '@/composables/useGlobalVolume';

export default {
  props: {
    sound: Object,
  },
  setup() {
    const { getEffectiveVolume } = useGlobalVolume();
    return { getEffectiveVolume };
  },
  computed: {
    formattedSoundName() {
      return this.sound.soundFileName;
    }
  },
  methods: {
    playSound() {
      if (!this.sound || !this.sound.soundFileName) {
        console.error('Sound data is incomplete.');
        return;
      }

      let currentAudio;
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const audioPath = `/sounds/${this.sound.soundFileName}.ogg`;
      currentAudio = new Audio(audioPath);
      currentAudio.volume = this.getEffectiveVolume(1.0);

      currentAudio.play().catch(error => {
        console.error(`Error playing sound: ${audioPath}`, error);
      });
    },
    copyDisplayName() {
      const displayName = `minecraft:${this.sound.displayName}`;
      navigator.clipboard.writeText(displayName).then(() => {
        alert(`Copied to clipboard: ${displayName}`);
      }).catch(err => {
        console.error('Error copying text: ', err);
      });
    }
  }
};
</script>

<style scoped>
.sound-tile {
  margin: 1rem;
  width: 100%;
  text-align: center;
}

.play-button, .copy-button {
  margin: 0.5rem;
}
</style>
