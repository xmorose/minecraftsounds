<template>
  <div class="sound-selection bg-gray-800 p-4 rounded-lg">
    <h2 class="font-bold mb-2 text-lg">Selected Sounds</h2>
    <div v-if="selectedSounds.length === 0" class="text-gray-500">
      No sounds selected
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      <div v-for="sound in selectedSounds"
           :key="sound.id"
           class="bg-gray-700 p-2 rounded-lg text-xs cursor-pointer"
           @click="playSingleSound(sound)">
        <div class="flex justify-between items-center mb-1">
          <div class="flex items-center flex-grow min-w-0">
            <button @click.stop="playSingleSound(sound)"
                    class="text-green-500 hover:text-green-700 mr-2 focus:outline-none">
              <i class="fas fa-play"></i>
            </button>
            <span class="truncate">{{ sound.displayName }}</span>
          </div>
          <button @click.stop="removeSound(sound)"
                  class="text-red-500 hover:text-red-700 ml-2 focus:outline-none">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div v-if="sound.isGrouped" class="text-gray-400 text-xs mb-1" @click.stop>
          Group: {{ sound.groupedSounds.length }} sounds
        </div>
        <div @click.stop class="mb-1">
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
        <div @click.stop>
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
      <button @click="copyShareLink" class="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-xs">
        <i class="fas fa-link mr-1"></i> Copy Link
      </button>
      <button @click="copyIds" class="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-xs">
        <i class="fas fa-clipboard mr-1"></i> Copy IDs
      </button>
      <button @click="copyEvent" class="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-xs">
        <i class="fas fa-file-code mr-1"></i> Copy Event
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
    async shareSelection() {
      const url = window.location.href;
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Minecraft Sounds Selection',
            url: url
          });
          this.$emit('show-notification', 'Shared', 'Selection shared successfully');
        } catch (err) {
          if (err.name !== 'AbortError') {
            this.copyShareLink();
          }
        }
      } else {
        this.copyShareLink();
      }
    },
    copyShareLink() {
      const url = window.location.href;
      navigator.clipboard.writeText(url)
          .then(() => this.$emit('show-notification', 'Copied', 'Link copied to clipboard'))
          .catch(() => this.$emit('show-notification', 'Error', 'Failed to copy link'));
    },
    removeSound(sound) {
      this.$emit('remove-sound', sound);
    },
    updatePitch(sound, value) {
      this.$emit('update-pitch', sound, Number(value));
    },
    updateVolume(sound, value) {
      this.$emit('update-volume', sound, Number(value));
    },
    playSingleSound(sound) {
      this.$emit('play-single-sound', sound);
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
    copyEvent() {
      const soundsJson = this.selectedSounds.map(sound => {
        if (sound.isGrouped) {
          return {
            type: "event",
            name: `minecraft:${sound.displayName}`,
            pitch: parseFloat(sound.pitch.toFixed(2)),
            volume: parseFloat(sound.volume.toFixed(1))
          };
        } else {
          return {
            type: "file",
            name: sound.soundFileName,
            pitch: parseFloat(sound.pitch.toFixed(2)),
            volume: parseFloat(sound.volume.toFixed(1))
          };
        }
      });

      const eventJson = {
        sounds: soundsJson,
        subtitle: `subtitles.custom.sound_event`
      };

      const formattedJson = JSON.stringify(eventJson, null, 4);
      this.copyToClipboard(formattedJson, 'Sound Event');
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