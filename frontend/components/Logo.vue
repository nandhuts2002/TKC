<script setup lang="ts">
// `light` swaps to the cream version for dark backgrounds (hero, footer).
// Both images stay mounted so the swap cross-fades instead of popping.
withDefaults(defineProps<{ light?: boolean; height?: number }>(), { height: 74 })
</script>

<template>
  <span class="logo" :style="{ height: `${height}px` }" role="img" aria-label="TKC Plantations, since 1976">
    <img class="dark" :class="{ off: light }" :src="asset('/images/logo.webp')" alt="" width="640" height="746" decoding="async" fetchpriority="high" />
    <img class="lite" :class="{ on: light }" :src="asset('/images/logo-light.webp')" alt="" width="640" height="746" decoding="async" />
  </span>
</template>

<style scoped>
.logo { position: relative; display: block; aspect-ratio: 640 / 746; }
.logo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; transition: opacity 0.45s var(--ease); }
.lite { opacity: 0; }
.lite.on { opacity: 1; }
.dark.off { opacity: 0; }
</style>
