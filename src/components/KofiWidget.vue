<template>
  <a
      @click="trackClick"
      href="https://ko-fi.com/xmorose"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-5 right-5 z-50 flex items-center justify-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-600"
  >
    <img
        src="https://storage.ko-fi.com/cdn/cup-border.png"
        alt="Ko-fi Cup"
        class="h-6 w-auto"
    />
    <span class="font-semibold">Support Me</span>
  </a>
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