<script setup lang="ts">
defineProps<{ name: string; size?: number }>()
</script>

<template>
  <svg :width="size ?? 24" :height="size ?? 24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'leaf'"><path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15"/><path d="M5 19c3-5 6-8 10-10"/></template>
    <template v-else-if="name === 'award'"><circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5"/><path d="m10 9 1.4 1.4L14.2 7.6"/></template>
    <template v-else-if="name === 'sprout'"><path d="M12 21v-9"/><path d="M12 12c0-4-3-6-7-6 0 4 3 6 7 6Z"/><path d="M12 14c0-3 2.5-5 6-5 0 3-2.5 5-6 5Z"/></template>
    <template v-else-if="name === 'truck'"><path d="M2 6h11v10H2z"/><path d="M13 9h4l3 3v4h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/></template>
    <template v-else-if="name === 'mountain'"><path d="m2 19 7-12 4 7 2-3 7 8z"/></template>
    <template v-else-if="name === 'pin'"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></template>
    <template v-else-if="name === 'paw'"><circle cx="6" cy="11" r="1.8"/><circle cx="10" cy="6.5" r="1.8"/><circle cx="14.5" cy="6.5" r="1.8"/><circle cx="18" cy="11" r="1.8"/><path d="M12 12c-3 0-5 3-5 5 0 2 2 2.5 5 2.5s5-.5 5-2.5c0-2-2-5-5-5Z"/></template>
    <template v-else-if="name === 'bag'"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></template>
    <template v-else-if="name === 'cart'"><path d="M3 4h2.5l2 11h10l2-8H7"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></template>
    <template v-else-if="name === 'search'"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></template>
    <template v-else-if="name === 'user'"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.2-6.5 8-6.5s7 2 8 6.5"/></template>
    <template v-else-if="name === 'arrow'"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></template>
    <template v-else-if="name === 'menu'"><path d="M4 7h16M4 12h16M4 17h16"/></template>
    <template v-else-if="name === 'close'"><path d="m6 6 12 12M18 6 6 18"/></template>
    <template v-else-if="name === 'chevron'"><path d="m6 9 6 6 6-6"/></template>
    <template v-else-if="name === 'phone'"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/></template>
  </svg>
</template>
