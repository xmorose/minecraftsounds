<template>
  <div class="tag-selection bg-gray-800 p-2 rounded-md flex items-center">
    <button
        v-for="tag in sortedTags"
        :key="tag"
        @click="toggleTag(tag)"
        class="inline-block px-3 py-1 rounded-full text-sm mr-3 my-1 transition-colors duration-200 relative"
        :class="selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'"
    >
      {{ formatTag(tag) }}
    </button>
  </div>
</template><script>
export default {
  name: 'TagSelection',
  props: {
    availableTags: {
      type: Array,
      required: true
    },
    selectedTags: {
      type: Array,
      required: true
    },
    customTagOrder: {
      type: Array,
      default: () => []
    },
    tagCounts: {
      type: Object,
      required: true
    }
  },
  computed: {
    sortedTags() {
      return this.availableTags.sort((a, b) => {
        const indexA = this.customTagOrder.indexOf(a);
        const indexB = this.customTagOrder.indexOf(b);
        if (indexA === -1 && indexB === -1) return a.localeCompare(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
    }
  },
  methods: {
    toggleTag(tag) {
      const updatedTags = this.selectedTags.includes(tag)
          ? this.selectedTags.filter(t => t !== tag)
          : [...this.selectedTags, tag];
      this.$emit('update:selectedTags', updatedTags);
    },
    formatTag(tag) {
      if (tag.startsWith('version_')) {
        return tag.replace('version_', '').replace(/_/g, '.');
      }
      return tag.replace(/_/g, ' ');
    }
  }
}
</script>
<style scoped>
.tag-selection {
  max-height: 200px;
}
</style>