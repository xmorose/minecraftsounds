<template>
  <div class="sound-tile relative bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
    <div class="absolute top-2 right-2 flex flex-col space-y-2">
      <button
          @click.stop="toggleSelection"
          class="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
          :class="{ 'bg-blue-500 hover:bg-blue-600': isSelected, 'bg-gray-600 hover:bg-gray-500': !isSelected }"
      >
        <i class="fas" :class="{ 'fa-minus': isSelected, 'fa-plus': !isSelected }"></i>
      </button>
      <button
          @click.stop="handleFavoriteToggle"
          class="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
          :class="{ 'bg-red-500 hover:bg-red-600': isFavorited, 'bg-gray-600 hover:bg-gray-500': !isFavorited }"
      >
        <i class="fas fa-heart"></i>
      </button>
    </div>
    <h3 class="text-base md:text-lg font-semibold mb-1 break-words">{{ soundItem.displayName }}</h3>
    <p class="text-xs md:text-sm text-gray-400 break-words">{{ soundItem.soundFileName }}</p>
    <div v-if="soundItem.isGrouped" class="text-gray-400 text-xs mb-1">
      Group: {{ soundItem.groupedSounds.length }} sounds
    </div>
    <div v-if="soundItem.isGrouped && Array.isArray(soundItem.sounds)" class="text-gray-400 text-xs mb-2 max-h-20 overflow-y-auto">
      <div v-for="(sound, index) in soundItem.sounds.slice(0, 5)" :key="index">
        {{ typeof sound === 'string' ? sound : sound.name }}
      </div>
      <div v-if="soundItem.sounds.length > 5" class="text-gray-500">
        ... and {{ soundItem.sounds.length - 5 }} more
      </div>
    </div>
    <div class="mt-2 mb-2">
      <span
          v-for="tag in tags"
          :key="tag"
          @click.stop="$emit('tag-click', tag)"
          class="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mr-1 mb-1 cursor-pointer hover:bg-blue-700 transition duration-300"
      >
        {{ formatTag(tag) }}
      </span>
    </div>

    <div class="mt-4 space-y-2">
      <div>
        <label class="block text-gray-400 text-xs">Pitch: {{ soundItem.pitch.toFixed(2) }}</label>
        <input
            type="range"
            min="0.5"
            max="2"
            step="0.01"
            :value="soundItem.pitch"
            @input="updatePitch($event.target.value)"
            class="w-full"
        />
      </div>
      <div>
        <label class="block text-gray-400 text-xs">Volume: {{ soundItem.volume.toFixed(1) }}</label>
        <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            :value="soundItem.volume"
            @input="updateVolume($event.target.value)"
            class="w-full"
        />
      </div>
    </div>

    <div class="mt-4 flex justify-between">
      <button @click="playSound" class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
        <i class="fas fa-play mr-1"></i> Play
      </button>
      <div class="flex space-x-2">
        <button @click.stop="copyMethod('mmEffect')" class="copy-button w-8 h-8 text-xs text-gray-400 hover:text-white flex items-center justify-center rounded-md bg-gray-700 hover:bg-gray-600 transition duration-300">
          <i class="fa-solid fa-dragon"></i>
        </button>
        <button @click.stop="copyMethod('soundName')" class="copy-button w-8 h-8 text-xs text-gray-400 hover:text-white flex items-center justify-center rounded-md bg-gray-700 hover:bg-gray-600 transition duration-300">
          <i class="fa-regular fa-clipboard"></i>
        </button>
        <button @click.stop="copyMethod('soundCommand')" class="copy-button w-8 h-8 text-xs text-gray-400 hover:text-white flex items-center justify-center rounded-md bg-gray-700 hover:bg-gray-600 transition duration-300">
          <i class="fa-solid fa-terminal"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useFavorites } from '../composables/useFavorites';
import { computed } from 'vue';

export default {
  props: {
    soundItem: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const favoritesManager = useFavorites();
    const isFavorited = computed(() => favoritesManager.isFavorite(props.soundItem));

    return {
      isFavorited,
      favoritesManager
    };
  },
  methods: {
    handleFavoriteToggle() {
      this.favoritesManager.toggleFavorite(this.soundItem);
    },
    toggleSelection() {
      this.$emit('toggle-selection', this.soundItem);
    },
    updatePitch(value) {
      const newPitch = Number(value);
      this.$emit('update-pitch', this.soundItem, newPitch);
    },
    updateVolume(value) {
      const newVolume = Number(value);
      this.$emit('update-volume', this.soundItem, newVolume);
    },
    playSound() {
      this.$emit('play-sound', this.soundItem);
    },
    copyMethod(copyType) {
      this.$emit('custom-copy', this.soundItem, copyType);
    },
    formatTag(tag) {
      if (tag.startsWith('version_')) {
        return tag.replace('version_', '').replace(/_/g, '.');
      }
      return tag.replace(/_/g, ' ');
    }
  }
};
</script>