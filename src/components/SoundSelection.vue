<template>
  <div class="sound-selection bg-gray-800 p-4 rounded-lg">
    <h2 class="font-bold mb-2 text-lg">Selected Sounds</h2>
    <div v-if="selectedSounds.length === 0" class="text-gray-500">
      No sounds selected
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      <div v-for="sound in selectedSounds" :key="sound.id" class="bg-gray-700 p-2 rounded-lg text-xs">
        <div class="flex justify-between items-center mb-1">
          <span class="truncate mr-2">{{ sound.displayName }}</span>
          <button @click="removeSound(sound)" class="text-red-500 hover:text-red-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div v-if="sound.isGrouped" class="text-gray-400 text-xs mb-1">
          Group: {{ sound.groupedSounds.length }} sounds
        </div>
        <div class="mb-1">
          <label class="block text-gray-400 text-xs">Pitch: {{ sound.pitch.toFixed(2) }}</label>
          <input
              type="range"
              min="0.5"
              max="2"
              step="0.01"
              :value="sound.pitch"
              @input="updatePitch(sound, $event.target.value)"
              class="w-full h-1"
          />
        </div>
        <div>
          <label class="block text-gray-400 text-xs">Volume: {{ sound.volume.toFixed(1) }}</label>
          <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              :value="sound.volume"
              @input="updateVolume(sound, $event.target.value)"
              class="w-full h-1"
          />
        </div>
      </div>
    </div>
    <div class="mt-4 flex flex-wrap gap-2">
      <button @click="playAllSounds" class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs">
        <i class="fas fa-play mr-1"></i> Play All
      </button>
      <button @click="copyMMCommand" class="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs">
        <i class="fas fa-copy mr-1"></i> Copy MM Command
      </button>
      <button @click="copyIds" class="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-xs">
        <i class="fas fa-clipboard mr-1"></i> Copy IDs
      </button>
      <button @click="clearSelection" class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs">
        <i class="fas fa-trash-alt mr-1"></i> Clear All
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedSounds: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeSound(sound) {
      this.$emit('remove-sound', sound);
    },
    updatePitch(sound, value) {
      this.$emit('update-pitch', sound, Number(value));
    },
    updateVolume(sound, value) {
      this.$emit('update-volume', sound, Number(value));
    },
    playAllSounds() {
      this.$emit('play-all');
    },
    copyMMCommand() {
      const mmCommand = this.selectedSounds
          .map(sound => `- sound{s=${sound.displayName};p=${sound.pitch.toFixed(2)};v=${sound.volume.toFixed(1)}}`)
          .join('\n');
      this.copyToClipboard(mmCommand, 'MM Command');
    },
    copyIds() {
      const ids = this.selectedSounds.map(sound => `minecraft:${sound.displayName}`).join(', ');
      this.copyToClipboard(ids, 'Sound IDs');
    },
    clearSelection() {
      this.$emit('clear-selection');
    },
    copyToClipboard(text, type) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
          this.$emit('show-notification', `${type} Copied`, `${type} has been copied to clipboard`);
        }).catch(() => {
          this.fallbackCopyTextToClipboard(text, type);
        });
      } else {
        this.fallbackCopyTextToClipboard(text, type);
      }
    },
    fallbackCopyTextToClipboard(text, type) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        const msg = successful ? `${type} has been copied to clipboard` : 'Unable to copy to clipboard';
        this.$emit('show-notification', `${type} Copied`, msg);
      } catch (err) {
        this.$emit('show-notification', 'Error', 'Failed to copy to clipboard');
      }
      document.body.removeChild(textArea);
    }
  },
};
</script>

<style scoped>
.sound-selection {
  max-width: 100%;
  max-height: 315px;
  overflow-y: auto;
}
</style>