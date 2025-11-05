<template>
  <div class="global-volume-control bg-gray-800 p-1.5 rounded">
    <div class="flex items-center justify-between mb-0.5">
      <div class="flex items-center space-x-1">
        <i class="fas fa-volume-down text-gray-400 text-xs"></i>
        <span class="text-white text-xs">Volume</span>
      </div>
      <span class="text-white text-xs">{{ globalVolumePercentage }}%</span>
    </div>
    <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        :value="globalVolume"
        @input="handleVolumeChange"
        class="w-full h-1 bg-gray-600 rounded appearance-none cursor-pointer slider"
    />
  </div>
</template>

<script>
import { useGlobalVolume } from '@/composables/useGlobalVolume';

export default {
  name: 'GlobalVolumeSlider',
  setup() {
    const { globalVolume, setGlobalVolume, globalVolumePercentage } = useGlobalVolume();

    const handleVolumeChange = (event) => {
      setGlobalVolume(parseFloat(event.target.value));
    };

    return {
      globalVolume,
      globalVolumePercentage,
      handleVolumeChange,
    };
  },
};
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}

.slider::-webkit-slider-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: #4b5563;
  border-radius: 2px;
}

.slider::-moz-range-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: #4b5563;
  border-radius: 2px;
  border: none;
}
</style>