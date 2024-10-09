<template>
  <div
      ref="scrollContainer"
      class="sound-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-y-auto scrollbar-hide"
      @scroll="handleScroll"
  >
    <SoundTile
        v-for="soundItem in displayedSoundItems"
        :key="soundItem.id"
        :soundItem="getSoundItemWithGridState(soundItem)"
        :isSelected="isSelected(soundItem)"
        :isGrouped="soundItem.isGrouped"
        :tags="getTagsForSound(soundItem)"
        @toggle-selection="toggleSelection"
        @update-pitch="updatePitch"
        @update-volume="updateVolume"
        @play-sound="playSound"
        @custom-copy="copySound"
        @tag-click="handleTagClick"
    />
    <div v-if="isLoading" class="loading-indicator text-center text-gray-400 col-span-full">
      Loading more sounds...
    </div>
    <div v-if="!isLoading && displayedSoundItems.length === 0" class="text-center text-gray-500 col-span-full">
      No sounds available
    </div>
  </div>
</template>

<script>
import SoundTile from './SoundTile.vue';

export default {
  components: {
    SoundTile,
  },
  props: {
    folder: String,
    searchQuery: String,
    selectedSounds: Array,
    searchOptions: {
      type: Object,
      default: () => ({
        includeDescriptions: false,
        groupSimilarSounds: false
      })
    },
    selectedTags: {
      type: Array,
      default: () => []
    },
    soundTags: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      soundItems: [],
      displayedSoundItems: [],
      filteredSoundItems: [],
      itemsPerScroll: 20,
      isLoading: false,
      currentPage: 0,
      gridSoundStates: {},
    };
  },
  watch: {
    folder() {
      this.resetAndFetchSounds();
    },
    searchQuery() {
      this.resetPaginationAndFilterSounds();
    },
    searchOptions: {
      handler() {
        this.resetPaginationAndFilterSounds();
      },
      deep: true
    },
    selectedTags: {
      handler() {
        this.resetPaginationAndFilterSounds();
      },
      deep: true
    }
    },
  methods: {
    getTagsForSound(soundItem) {
      return Object.entries(this.soundTags)
          .filter(([tag, sounds]) => sounds.includes(soundItem.displayName))
          .map(([tag]) => tag);
    },
    handleTagClick(tag) {
      this.$emit('add-tag', tag);
    },
    async resetAndFetchSounds() {
      this.soundItems = [];
      this.displayedSoundItems = [];
      this.currentPage = 0;
      this.isLoading = false;
      this.gridSoundStates = {};

      if (this.folder) {
        await this.fetchSounds([this.folder]);
      } else {
        await this.fetchSounds(this.availableFolders);
      }

      this.resetPaginationAndFilterSounds();
    },
    async fetchSounds(folders) {
      this.isLoading = true;
      try {
        const promises = folders.map(async (folder) => {
          const response = await fetch(`/sounds/sound_chunks/${folder}.json`);
          const soundsData = await response.json();

          return Object.keys(soundsData).flatMap((key) => {
            const soundEntry = soundsData[key];
            const displayName = key;

            if (!soundEntry || !soundEntry.sounds) {
              console.error(`Invalid sound entry for ${key}`);
              return [];
            }

            return soundEntry.sounds.map((sound, index) => ({
              id: `${folder}_${displayName}_${sound.name || sound}_${index}`,
              displayName: displayName,
              soundFileName: typeof sound === 'string' ? sound : sound.name,
              volume: 1,
              pitch: Math.max(Math.min(sound.pitch || 1, 2.0), 0.5),
              folder: folder,
            }));
          });
        });

        const results = await Promise.all(promises);
        this.soundItems = results.flat();
      } catch (error) {
        console.error(`Error fetching sounds:`, error);
      }
      this.isLoading = false;
    },
    resetPaginationAndFilterSounds() {
      this.filteredSoundItems = this.filterSounds();
      this.displayedSoundItems = [];
      this.currentPage = 0;
      this.loadMoreItems();
    },
    filterSounds() {

      const query = this.searchQuery ? this.searchQuery.toLowerCase().split(/\s+/) : [];
      let filteredSounds = this.soundItems;

      if (query.length) {
        filteredSounds = filteredSounds.filter((soundItem) => {
          const displayNameLower = soundItem.displayName.toLowerCase();
          const soundFileNameLower = soundItem.soundFileName.toLowerCase();

          return query.every((word) => {
            const displayNameMatch = displayNameLower.includes(word);
            const soundFileNameMatch = soundFileNameLower.includes(word);

            if (this.searchOptions.includeDescriptions) {
              return displayNameMatch || soundFileNameMatch;
            } else {
              return displayNameMatch;
            }
          });
        });
      }

      if (this.selectedTags.length > 0) {
        filteredSounds = filteredSounds.filter((soundItem) => {
          return this.selectedTags.every(tag => {
            const tagSounds = this.soundTags[tag] || [];
            return tagSounds.some(tagSound =>
                soundItem.displayName.toLowerCase().includes(tagSound.toLowerCase()) ||
                tagSound.toLowerCase().includes(soundItem.displayName.toLowerCase())
            );
          });
        });
      }

      if (this.searchOptions.groupSimilarSounds) {
        filteredSounds = this.groupSimilarSounds(filteredSounds);
      }

      return filteredSounds;
    },
    loadMoreItems() {
      const start = this.currentPage * this.itemsPerScroll;
      const end = start + this.itemsPerScroll;

      const moreItems = this.filteredSoundItems.slice(start, end);
      this.displayedSoundItems.push(...moreItems);
      this.currentPage++;

      moreItems.forEach(item => {
        if (!this.gridSoundStates[item.id]) {
          this.gridSoundStates[item.id] = {
            pitch: item.pitch,
            volume: item.volume
          };
        }
      });
    },
    groupSimilarSounds(sounds) {
      const groupedSounds = {};
      sounds.forEach(sound => {
        const baseName = sound.displayName.replace(/\d+$/, '').trim();
        if (!groupedSounds[baseName]) {
          groupedSounds[baseName] = {
            ...sound,
            id: `group_${baseName}`,
            displayName: baseName,
            isGrouped: true,
            groupedSounds: []
          };
        }
        groupedSounds[baseName].groupedSounds.push(sound);
      });
      return Object.values(groupedSounds);
    },
    handleScroll() {
      const container = this.$refs.scrollContainer;
      if (container) {
        const {scrollTop, scrollHeight, clientHeight} = container;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          if (!this.isLoading && this.displayedSoundItems.length < this.filteredSoundItems.length) {
            this.loadMoreItems();
          }
        }
      }
    },
    getSoundItemWithGridState(soundItem) {
      const gridState = this.gridSoundStates[soundItem.id] || {pitch: soundItem.pitch, volume: soundItem.volume};
      return {...soundItem, ...gridState};
    },
    isSelected(soundItem) {
      return this.selectedSounds.some(s => s.id === soundItem.id);
    },
    toggleSelection(soundItem) {
      this.$emit('toggle-selection', this.getSoundItemWithGridState(soundItem));
    },
    updatePitch(soundItem, pitch) {
      this.gridSoundStates[soundItem.id] = {
        ...this.gridSoundStates[soundItem.id],
        pitch: pitch
      };
      const updatedSoundItem = this.getSoundItemWithGridState(soundItem);
      this.$emit('update-pitch', updatedSoundItem, pitch);
    },
    updateVolume(soundItem, volume) {
      this.gridSoundStates[soundItem.id] = {
        ...this.gridSoundStates[soundItem.id],
        volume: volume
      };
      const updatedSoundItem = this.getSoundItemWithGridState(soundItem);
      this.$emit('update-volume', updatedSoundItem, volume);
    },
    playSound(soundItem) {
      if (soundItem.isGrouped) {
        const randomSound = soundItem.groupedSounds[Math.floor(Math.random() * soundItem.groupedSounds.length)];
        this.$emit('play-sound', this.getSoundItemWithGridState(randomSound));
      } else {
        const soundToPlay = this.getSoundItemWithGridState(soundItem);
        this.$emit('play-sound', soundToPlay);
      }
    },
    copySound(soundItem, copyType) {
      const soundToCopy = this.getSoundItemWithGridState(soundItem);
      this.$emit('custom-copy', soundToCopy, copyType);
    },
  },
  computed: {
    availableFolders() {
      return [
        'ambient',
        'block',
        'enchant',
        'entity',
        'event',
        'item',
        'music',
        'music_disc',
        'particle',
        'ui',
        'weather',
      ];
    },
  },
  mounted() {
    this.$refs.scrollContainer.addEventListener('scroll', this.handleScroll);
    this.resetAndFetchSounds();
  },
  beforeUnmount() {
    this.$refs.scrollContainer.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
.sound-grid {
  height: calc(100vh - 200px);
}
.debug-info {
  font-size: 14px;
  opacity: 0.8;
}
</style>