<template>
  <div>
    <button
        @click="stopAll"
        :class="['stop-button', { 'is-playing': isPlaying }]"
        class="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-110"
        aria-label="Stop all sounds"
    >
      <i class="fa-solid fa-square"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    isPlaying: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    stopAll() {
      this.$emit('stop-all');
    },
  },
};
</script>

<style scoped>
.stop-button.is-playing {
  background-color: #ef4444;
  box-shadow: 0 0 15px 5px rgba(239, 68, 68, 0.6);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>