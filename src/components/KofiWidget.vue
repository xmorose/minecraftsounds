<template>
  <div class="group fixed bottom-5 left-5 z-50">
    <a
        @click="trackClick"
        href="https://ko-fi.com/xmorose"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-600"
    >
      <img
          src="https://storage.ko-fi.com/cdn/cup-border.png"
          alt="Ko-fi Cup"
          class="h-6 w-auto"
      />
      <span class="font-semibold">Support me</span>
    </a>
    <div
        class="absolute bottom-full left-0 mb-2 w-56 rounded-lg bg-gray-800 px-3 py-2 text-center text-sm text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none"
    >
      Enjoying the site? Consider supporting to help with upkeep!
      <div class="absolute left-6 top-full h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-gray-800"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KofiWidget',
  methods: {
    trackClick() {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'kofi_button_click', {
          'event_category': 'Outbound Link',
          'event_label': 'https://ko-fi.com/xmorose',
        });
      }
    }
  }
};
</script>