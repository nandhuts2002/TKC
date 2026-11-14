<script setup lang="ts">
// Layered SVG landscape. Each depth layer is wrapped twice (scroll + mouse) so GSAP
// transforms never fight. HeroSection animates them via the data-depth attributes.
const leaves = [
  { x: 1380, y: 40, s: 1.5, r: 200 }, { x: 1470, y: 90, s: 1.2, r: 170 }, { x: 1300, y: 20, s: 1.1, r: 215 },
  { x: 1540, y: 170, s: 1.4, r: 150 }, { x: 1430, y: 200, s: 1, r: 185 }
]
const rows = Array.from({ length: 14 }, (_, i) => i)
</script>

<template>
  <svg class="scene" viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f6e7c8"/><stop offset="0.45" stop-color="#f9d9a6"/><stop offset="1" stop-color="#f4eadb"/>
      </linearGradient>
      <radialGradient id="sun" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#fff6d8" stop-opacity="1"/><stop offset="0.35" stop-color="#ffd98a" stop-opacity="0.65"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9bfa4"/><stop offset="1" stop-color="#8fae8d"/></linearGradient>
      <linearGradient id="mid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f9a6d"/><stop offset="1" stop-color="#4f8355"/></linearGradient>
      <linearGradient id="near" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f7a45"/><stop offset="1" stop-color="#2a5d34"/></linearGradient>
      <linearGradient id="front" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d6a37"/><stop offset="1" stop-color="#173f22"/></linearGradient>
      <filter id="soft"><feGaussianBlur stdDeviation="14"/></filter>
      <clipPath id="nearClip"><path d="M-100 560C150 520 300 560 520 520C760 480 900 540 1100 500C1300 460 1450 500 1700 470L1700 900L-100 900Z"/></clipPath>
      <path id="leaf" d="M0 0C20-30 70-40 110-10C70 20 30 25 0 0Z"/>
    </defs>

    <rect width="1600" height="800" fill="url(#sky)"/>

    <g data-depth="0.04"><g class="pm" data-mx="6">
      <circle class="sun" cx="560" cy="300" r="260" fill="url(#sun)"/>
    </g></g>

    <g data-depth="0.12"><g class="pm" data-mx="10">
      <path d="M-100 380C150 300 280 340 420 290C560 240 700 300 840 270C980 240 1100 190 1250 240C1400 290 1500 250 1700 280L1700 900L-100 900Z" fill="url(#far)"/>
      <g class="mist m1" filter="url(#soft)" fill="#fff" opacity="0.55"><ellipse cx="400" cy="380" rx="320" ry="26"/><ellipse cx="1050" cy="330" rx="360" ry="22"/></g>
    </g></g>

    <g data-depth="0.22"><g class="pm" data-mx="18">
      <path d="M-100 470C100 400 260 450 400 410C560 365 700 430 880 390C1050 350 1200 380 1350 340C1480 305 1560 340 1700 330L1700 900L-100 900Z" fill="url(#mid)"/>
      <g class="mist m2" filter="url(#soft)" fill="#fff" opacity="0.5"><ellipse cx="700" cy="440" rx="380" ry="28"/><ellipse cx="1300" cy="410" rx="300" ry="24"/></g>
    </g></g>

    <g data-depth="0.34"><g class="pm" data-mx="28">
      <path d="M-100 560C150 520 300 560 520 520C760 480 900 540 1100 500C1300 460 1450 500 1700 470L1700 900L-100 900Z" fill="url(#near)"/>
      <g clip-path="url(#nearClip)" opacity="0.28" stroke="#0f3318" stroke-width="3" fill="none">
        <path v-for="i in rows" :key="i" :d="`M-100 ${540 + i * 22}C200 ${500 + i * 22} 500 ${560 + i * 22} 800 ${520 + i * 22}S1400 ${470 + i * 22} 1700 ${480 + i * 22}`"/>
      </g>
      <!-- estate bungalow -->
      <g transform="translate(1100 400)">
        <rect x="0" y="48" width="210" height="62" fill="#f3e9d4"/>
        <rect x="0" y="100" width="210" height="10" fill="#d9ccb0"/>
        <path d="M-14 52 L60 6 H150 L224 52Z" fill="#a8462b"/><path d="M-14 52 L60 6 H150 L224 52Z" fill="#000" opacity="0.12"/>
        <rect x="88" y="58" width="34" height="52" fill="#7a4a2a"/>
        <g fill="#6b4a2c"><rect x="20" y="64" width="26" height="30"/><rect x="164" y="64" width="26" height="30"/></g>
        <g class="window-glow" fill="#ffd27a"><rect x="23" y="67" width="20" height="24"/><rect x="167" y="67" width="20" height="24"/></g>
        <rect x="-4" y="108" width="218" height="6" fill="#c9bb9a"/>
      </g>
      <g fill="#1e4d27"><ellipse cx="1060" cy="480" rx="34" ry="46"/><ellipse cx="1350" cy="450" rx="38" ry="52"/><ellipse cx="1390" cy="470" rx="28" ry="38"/></g>
    </g></g>

    <g data-depth="0.5"><g class="pm" data-mx="44">
      <path d="M-100 700C200 640 420 680 700 650C980 620 1200 560 1700 600L1700 900L-100 900Z" fill="url(#front)"/>
    </g></g>

    <!-- foreground branch top-right -->
    <g data-depth="0.7"><g class="pm" data-mx="64">
      <path d="M1700 -20C1560 40 1460 80 1360 120" stroke="#4a3a28" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M1700 140C1590 120 1500 150 1420 210" stroke="#4a3a28" stroke-width="7" fill="none" stroke-linecap="round"/>
      <g v-for="(l, i) in leaves" :key="i" class="sway" :style="{ animationDelay: `${i * -0.8}s` }" :transform="`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`">
        <use href="#leaf" :fill="i % 2 ? '#3f8a3a' : '#2f7a33'"/>
        <path d="M0 0C30 -4 60 -10 100 -9" stroke="#1d5a24" stroke-width="1.5" fill="none"/>
      </g>
    </g></g>
  </svg>
</template>

<style scoped>
.scene { position: absolute; inset: 0; width: 100%; height: 100%; }
.sway { transform-box: fill-box; transform-origin: 0% 50%; animation: sway 5s ease-in-out infinite alternate; }
@keyframes sway { from { rotate: -3deg; } to { rotate: 4deg; } }
.window-glow { animation: glow 4s ease-in-out infinite alternate; }
@keyframes glow { from { opacity: 0.65; } to { opacity: 1; } }
</style>
