<template>
  <div class="h-screen bg-gray-900 text-white flex flex-col">
    <div class="flex flex-grow overflow-hidden">
      <FilterSidebar
          :folders="availableFolders"
          :availableTags="availableTags"
          :selectedTags="selectedTags"
          :selectedFolder="selectedFolder"
          :searchQuery="searchQuery"
          :allSounds="allSounds"
          :tagCounts="dynamicTagCounts"
          :soundTags="soundTags"
          @update:selectedFolder="updateSelectedFolder"
          @update:selectedTags="updateSelectedTags"
          @update:searchQuery="updateSearchQuery"
          @update:searchOptions="updateSearchOptions"
      />
      <div class="flex-grow flex flex-col overflow-hidden">
        <div class="p-4">
          <SoundSelection
              :selectedSounds="selectedSounds"
              @remove-sound="removeSound"
              @play-all="playAllSounds"
              @clear-selection="clearSelection"
              @update-pitch="updateSelectedSoundPitch"
              @update-volume="updateSelectedSoundVolume"
              @show-notification="showNotification"
          />
        </div>
        <div class="p-4" :style="{ paddingBottom: tagSelectionPadding + 'px' }">
          <TagSelection
              :availableTags="availableTags"
              :selectedTags="selectedTags"
              :customTagOrder="customTagOrder"
              :tagCounts="tagCounts"
              @update:selectedTags="updateSelectedTags"
          />
        </div>
      </div>
    </div>
    <SoundGrid
        :folder="selectedFolder"
        :searchQuery="searchQuery"
        :selectedSounds="selectedSounds"
        :searchOptions="searchOptions"
        :selectedTags="selectedTags"
        :soundTags="soundTags"
        @toggle-selection="toggleSoundSelection"
        @update-pitch="updateGridSoundPitch"
        @update-volume="updateGridSoundVolume"
        @play-sound="playSound"
        @custom-copy="copySound"
        @add-tag="addTag"
    />
    <Notification
        :show="showNotificationFlag"
        :title="notificationTitle"
        :message="notificationMessage"
        @close="closeNotification"
    />
  </div>
  <Credit @show-notification="showNotification"/>
  <footer class="absolute bottom-0 left-0 right-0 text-center py-2 text-white text-opacity-50 text-xs pointer-events-none">
    <p>We are not affiliated with Mojang AB or Microsoft.</p>
    <p>For support or inquiries, please contact us at hello@minecraftsounds.com.</p>
  </footer>
</template>
<script>
import FilterSidebar from '../components/FilterSidebar.vue';
import SoundGrid from '../components/SoundGrid.vue';
import SoundSelection from '../components/SoundSelection.vue';
import Notification from '../components/Notification.vue';
import TagSelection from "@/components/TagSelection.vue";
import Credit from "@/components/Credit.vue";

export default {
  components: {
    FilterSidebar,
    SoundGrid,
    SoundSelection,
    TagSelection,
    Notification,
    Credit,
  },
  data() {
    return {
      selectedFolder: '',
      selectedTags: [],
      soundTags: {},
      searchQuery: '',
      selectedSounds: [],
      allSounds: [],
      showNotificationFlag: false,
      notificationTitle: '',
      notificationMessage: '',
      audioContext: null,
      audioBufferSourceNode: null,
      gainNode: null,
      customTagOrder: [],
      excludedTags: ['debug', 'test'],
      searchOptions: {
        includeDescriptions: false,
        groupSimilarSounds: false
      },
      activeSoundSources: [],
    };
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
    tagSelectionPadding() {
      const count = this.selectedSounds.length;
      if (count === 0) return 0;
      if (count >= 1 && count <= 5) return 100;
      if (count >= 6 && count <= 10) return 200;
      return 300;
    },
    availableTags() {
      return Object.keys(this.soundTags);
    },
    tagCounts() {
      const counts = {};
      for (const [tag, soundNames] of Object.entries(this.soundTags)) {
        if (this.searchOptions.includeDescriptions) {
          counts[tag] = this.allSounds.reduce((count, sound) => {
            if (soundNames.includes(sound.displayName)) {
              return count + sound.sounds.length;
            }
            return count;
          }, 0);
        } else {
          counts[tag] = soundNames.length;
        }
      }
      return counts;
    },
    dynamicTagCounts() {
      const counts = {};
      const filteredSounds = this.getFilteredSounds();

      for (const [tag, sounds] of Object.entries(this.soundTags)) {
        counts[tag] = filteredSounds.filter(sound =>
            sounds.includes(sound.displayName) ||
            (this.searchOptions.includeDescriptions &&
                sound.sounds.some(s => sounds.includes(s.name || s)))
        ).length;
      }

      return counts;
    }
  },
  methods: {
    updateUrlWithSounds() {
      const query = {...this.$route.query};
      Object.keys(query).forEach(key => {
        if (key.match(/^[spv]\d+$/)) {
          delete query[key];
        }
      });
      this.selectedSounds.forEach((sound, index) => {
        query[`s${index}`] = sound.soundFileName.replace(/\//g, '.');
        query[`p${index}`] = sound.pitch.toFixed(2);
        query[`v${index}`] = sound.volume.toFixed(1);
      });
      if (this.searchQuery) query.search = this.searchQuery;
      if (this.selectedTags.length) query.tags = this.selectedTags.join(',');

      this.$router.push({
        name: 'Home',
        params: {category: this.selectedFolder || undefined},
        query
      });
    },
    loadSoundsFromUrl() {
      let i = 0;
      const soundsToLoad = [];
      while (this.$route.query[`s${i}`]) {
        soundsToLoad.push({
          soundFileName: this.$route.query[`s${i}`].replace(/\./g, '/'),
          pitch: parseFloat(this.$route.query[`p${i}`] || '1.0'),
          volume: parseFloat(this.$route.query[`v${i}`] || '1.0')
        });
        i++;
      }
      soundsToLoad.forEach(soundParam => {
        const soundFileName = soundParam.soundFileName.replace(/\./g, '/');

        const originalSound = this.allSounds.find(s =>
            s.sounds.some(sound =>
                (typeof sound === 'object' ? sound.name : sound) === soundFileName
            )
        );

        if (originalSound) {
          this.selectedSounds.push({
            ...originalSound,
            id: `${originalSound.id}_${soundFileName}`,
            displayName: originalSound.displayName,
            soundFileName: soundFileName,
            pitch: soundParam.pitch,
            volume: soundParam.volume
          });
        }
      });
    },
    addTag(tag) {
      if (!this.selectedTags.includes(tag)) {
        this.selectedTags.push(tag);
        this.updateRoute();
      }
    },
    getFilteredSounds() {
      let filteredSounds = this.allSounds;

      if (this.selectedTags.length > 0 && Object.keys(this.soundTags).length > 0) {
        filteredSounds = filteredSounds.filter(sound =>
            this.selectedTags.every(tag =>
                this.soundTags[tag]?.includes(sound.displayName) ||
                (this.searchOptions.includeDescriptions &&
                    sound.sounds.some(s => this.soundTags[tag]?.includes(s.name || s)))
            )
        );
      }
      return filteredSounds;
    },
    availableTags() {
      return Object.keys(this.soundTags);
    },
    updateSearchOptions(options) {
      this.searchOptions = {...this.searchOptions, ...options};
    },
    filteredSounds() {
      return this.allSounds.filter(sound => {
        const matchesFolder = !this.selectedFolder || sound.folder === this.selectedFolder;
        const matchesTags = this.selectedTags.length === 0 || this.selectedTags.some(tag => this.soundTags[tag]?.includes(sound.id));
        const matchesSearch = !this.searchQuery || sound.displayName.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesFolder && matchesTags && matchesSearch;
      });
    },
    toggleSoundSelection(soundItem) {
      const index = this.selectedSounds.findIndex(s => s.id === soundItem.id);
      if (index === -1) {
        this.selectedSounds.push({...soundItem});
      } else {
        this.selectedSounds.splice(index, 1);
      }
      this.updateUrlWithSounds();
    },
    removeSound(sound) {
      const index = this.selectedSounds.findIndex(s => s.id === sound.id);
      if (index !== -1) {
        this.selectedSounds.splice(index, 1);
        this.updateUrlWithSounds();
      }
    },
    clearSelection() {
      this.selectedSounds = [];
      this.updateUrlWithSounds();
    },
    updateSelectedSoundPitch(sound, pitch) {
      const index = this.selectedSounds.findIndex(s => s.id === sound.id);
      if (index !== -1) {
        this.selectedSounds[index].pitch = pitch;
        this.updateUrlWithSounds();
      }
    },
    updateSelectedSoundVolume(sound, volume) {
      const index = this.selectedSounds.findIndex(s => s.id === sound.id);
      if (index !== -1) {
        this.selectedSounds[index].volume = volume;
        this.updateUrlWithSounds();
      }
    },
    updateGridSoundPitch(soundItem, pitch) {
    },
    updateGridSoundVolume(soundItem, volume) {
    },
    async fetchAllSounds() {
      try {
        const response = await fetch('/sounds/sounds.json');
        const data = await response.json();
        this.allSounds = Array.isArray(data) ? data : Object.entries(data).map(([key, value]) => ({
          id: key,
          displayName: key,
          ...value
        }));
      } catch (error) {
        console.error('Error fetching all sounds:', error);
        this.allSounds = [];
      }
    },
    updateSelectedFolder(folder) {
      this.selectedFolder = folder;
      this.updateRoute();
    },
    updateSearchQuery(query) {
      this.searchQuery = query;
      this.updateRoute();
    },
    updateRoute() {
      const currentQuery = {...this.$route.query};
      const soundParams = {};
      Object.keys(currentQuery).forEach(key => {
        if (key.match(/^[spv]\d+$/)) {
          soundParams[key] = currentQuery[key];
        }
      });

      this.$router.push({
        name: 'Home',
        params: {category: this.selectedFolder || undefined},
        query: {
          ...soundParams,
          search: this.searchQuery || undefined,
          tags: this.selectedTags.length > 0 ? this.selectedTags.join(',') : undefined
        },
      });
    },
    async playSound(soundItem) {
      try {
        // Stop all currently playing sounds
        this.stopAllSounds();

        if (!this.audioContext) {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        const response = await fetch(`/sounds/${soundItem.soundFileName}.ogg`);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

        const sourceNode = this.audioContext.createBufferSource();
        sourceNode.buffer = audioBuffer;

        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = soundItem.volume;

        sourceNode.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        sourceNode.playbackRate.value = soundItem.pitch;

        // Add the new source to our active sources array
        this.activeSoundSources.push(sourceNode);

        // Remove the source from the array when it finishes playing
        sourceNode.onended = () => {
          const index = this.activeSoundSources.indexOf(sourceNode);
          if (index !== -1) {
            this.activeSoundSources.splice(index, 1);
          }
        };

        sourceNode.start();
      } catch (error) {
        console.error('Error playing sound:', error);
        this.showNotification('Error', 'Failed to play sound');
      }
    },

    stopAllSounds() {
      this.activeSoundSources.forEach(source => {
        if (source.stop) {
          source.stop();
        }
      });
      this.activeSoundSources = [];
    },

    playAllSounds() {
      this.stopAllSounds();
      this.selectedSounds.forEach(sound => {
        if (sound.isGrouped) {
          const randomSound = sound.groupedSounds[Math.floor(Math.random() * sound.groupedSounds.length)];
          this.playSound({
            ...randomSound,
            pitch: sound.pitch,
            volume: sound.volume
          });
        } else {
          this.playSound(sound);
        }
      });
    },
    copySound(soundItem, copyType) {
      let textToCopy = '';
      switch (copyType) {
        case 'mmEffect':
          textToCopy = `- sound{s=${soundItem.displayName};p=${soundItem.pitch.toFixed(2)};v=${soundItem.volume.toFixed(1)}}`;
          break;
        case 'soundName':
          textToCopy = `minecraft:${soundItem.displayName}`;
          break;
        case 'soundCommand':
          textToCopy = `/playsound minecraft:${soundItem.displayName} master @p ~ ~ ~ ${soundItem.volume.toFixed(1)} ${soundItem.pitch.toFixed(2)}`;
          break;
      }
      navigator.clipboard.writeText(textToCopy)
          .then(() => this.showNotification('Copied', `${copyType} copied to clipboard`))
          .catch(err => {
            console.error('Failed to copy:', err);
            this.showNotification('Error', 'Failed to copy to clipboard');
          });
    },
    showNotification(title, message) {
      this.notificationTitle = title;
      this.notificationMessage = message;
      this.showNotificationFlag = true;
      setTimeout(() => {
        this.closeNotification();
      }, 3000);
    },
    closeNotification() {
      this.showNotificationFlag = false;
    },
    async fetchSoundTags() {
      try {
        const response = await fetch('/sounds/sound_tags.json');
        this.soundTags = await response.json();
      } catch (error) {
        console.error('Error fetching sound tags:', error);
        this.soundTags = {};
      }
    },
    updateSelectedTags(tags) {
      this.selectedTags = tags;
      this.updateRoute();
    }
  },
  mounted() {
    Promise.all([
      this.fetchAllSounds(),
      this.fetchSoundTags()
    ]).then(() => {
      this.selectedFolder = this.$route.params.category || '';
      this.searchQuery = this.$route.query.search || '';
      this.selectedTags = this.$route.query.tags ? this.$route.query.tags.split(',') : [];
      this.loadSoundsFromUrl();
      this.getFilteredSounds();
    });
  },

  watch: {
    '$route'(to) {
      if (Object.keys(this.soundTags).length > 0) {
        this.selectedTags = to.query.tags ? to.query.tags.split(',') : [];
        this.selectedFolder = to.params.category || '';
        this.searchQuery = to.query.search || '';
        this.$nextTick(() => {
          this.getFilteredSounds();
        });
      }
    }
  }
};
</script>

<style scoped>
footer {
  background: linear-gradient(to top, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0));
}
</style>