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
          <div class="flex justify-between items-center gap-2 mb-1">
            <label class="block text-gray-300 text-xs font-semibold">
              Pitch ({{ sound.layers ? sound.layers.length : 1 }})
            </label>
            <div class="flex gap-1">
              <button
                v-if="sound.layers && sound.layers.length > 1"
                @click.stop="togglePerLayerVolume(sound)"
                class="px-2 py-1 rounded text-xs font-medium bg-purple-600 hover:bg-purple-500 text-white focus:outline-none flex items-center gap-1"
                :title="sound.usePerLayerVolume ? 'Each layer has its own volume — click for shared volume' : 'All layers share one volume — click for per-layer volume'">
                <i :class="sound.usePerLayerVolume ? 'fas fa-layer-group' : 'fas fa-volume-up'" class="text-sm"></i>
                <span>{{ sound.usePerLayerVolume ? 'Vol: per layer' : 'Vol: shared' }}</span>
              </button>
              <button
                @click.stop="addLayer(sound)"
                class="px-2 py-1 rounded text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white focus:outline-none flex items-center gap-1"
                title="Add another pitch layer (plays simultaneously)">
                <i class="fas fa-plus text-sm"></i>
                <span>Pitch</span>
              </button>
            </div>
          </div>
          <div v-if="sound.layers && sound.layers.length > 0">
            <div v-for="(layer, layerIndex) in sound.layers" :key="layerIndex" class="mb-2">
              <div class="flex items-center gap-1 mb-1">
                <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.01"
                    :value="layer.pitch"
                    @input="updateLayerPitch(sound, layerIndex, $event.target.value)"
                    class="flex-grow h-1"
                />
                <span class="text-gray-400 text-xs w-10">{{ layer.pitch.toFixed(2) }}</span>
                <button
                  v-if="sound.layers.length > 1"
                  @click.stop="removeLayer(sound, layerIndex)"
                  class="w-6 h-6 flex items-center justify-center rounded text-red-400 hover:text-red-300 hover:bg-red-900/30 focus:outline-none"
                  title="Remove this layer">
                  <i class="fas fa-minus text-sm"></i>
                </button>
              </div>
              <div v-if="sound.usePerLayerVolume" class="flex items-center gap-1">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    :value="layer.volume || 1.0"
                    @input="updateLayerVolume(sound, layerIndex, $event.target.value)"
                    class="flex-grow h-1"
                />
                <span class="text-gray-400 text-xs w-10">{{ (layer.volume || 1.0).toFixed(1) }}</span>
                <div class="w-4"></div>
              </div>
            </div>
          </div>
          <div v-else>
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
        </div>
        <div @click.stop v-if="!sound.usePerLayerVolume">
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
    addLayer(sound) {
      this.$emit('add-layer', sound);
    },
    removeLayer(sound, layerIndex) {
      this.$emit('remove-layer', sound, layerIndex);
    },
    updateLayerPitch(sound, layerIndex, value) {
      this.$emit('update-layer-pitch', sound, layerIndex, Number(value));
    },
    updateLayerVolume(sound, layerIndex, value) {
      this.$emit('update-layer-volume', sound, layerIndex, Number(value));
    },
    togglePerLayerVolume(sound) {
      this.$emit('toggle-per-layer-volume', sound);
    },
    playSingleSound(sound) {
      this.$emit('play-single-sound', sound);
    },
    playAllSounds() {
      this.$emit('play-all');
    },
    copyMMCommand() {
      const mmCommand = this.selectedSounds
          .flatMap(sound => {
            if (sound.layers && sound.layers.length > 0) {
              return sound.layers.map(layer => {
                let effectiveVolume = sound.volume;
                if (sound.usePerLayerVolume) {
                  const layerVolume = layer.volume !== undefined ? layer.volume : 1.0;
                  effectiveVolume = sound.volume * layerVolume;
                }
                return `- sound{s=${sound.displayName};p=${layer.pitch.toFixed(2)};v=${effectiveVolume.toFixed(1)}}`;
              });
            }
            return `- sound{s=${sound.displayName};p=${sound.pitch.toFixed(2)};v=${sound.volume.toFixed(1)}}`;
          })
          .join('\n');
      this.copyToClipboard(mmCommand, 'MM Command');
    },
    copyIds() {
      const ids = this.selectedSounds.map(sound => `minecraft:${sound.displayName}`).join(', ');
      this.copyToClipboard(ids, 'Sound IDs');
    },
    copyEvent() {
      const soundsJson = this.selectedSounds.flatMap(sound => {
        if (sound.layers && sound.layers.length > 0) {
          return sound.layers.map(layer => {
            let effectiveVolume = sound.volume;
            if (sound.usePerLayerVolume) {
              const layerVolume = layer.volume !== undefined ? layer.volume : 1.0;
              effectiveVolume = sound.volume * layerVolume;
            }
            if (sound.isGrouped) {
              return {
                type: "event",
                name: `minecraft:${sound.displayName}`,
                pitch: parseFloat(layer.pitch.toFixed(2)),
                volume: parseFloat(effectiveVolume.toFixed(1))
              };
            } else {
              return {
                type: "file",
                name: sound.soundFileName,
                pitch: parseFloat(layer.pitch.toFixed(2)),
                volume: parseFloat(effectiveVolume.toFixed(1))
              };
            }
          });
        } else {
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