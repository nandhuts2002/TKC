<script setup lang="ts">
// Illustrated placeholders for the spices. Swap these for real estate photography
// by replacing the <SpiceArt> usages with <NuxtImg>/<img> once photos are available.
const props = defineProps<{ type: 'cardamom' | 'pepper' | 'coffee'; mode?: 'scene' | 'bowl' }>()
const uid = useId()

// Deterministic pseudo-random so SSR and client markup match.
const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const pods = Array.from({ length: 16 }, (_, i) => ({
  x: 150 + (rand(i + 1) - 0.5) * 120,
  y: 150 + (rand(i + 20) - 0.5) * 34 - Math.abs(i % 4) * 4,
  r: Math.round((rand(i + 40) - 0.5) * 140)
}))
const peppercorns = Array.from({ length: 22 }, (_, i) => {
  const t = i / 21
  return { x: 150 + Math.sin(t * 5) * 8 + (rand(i + 3) - 0.5) * 22, y: 70 + t * 130, r: 9 + rand(i + 9) * 3 }
})
const cherries = [
  { x: 120, y: 128, c: '#d62f3f' }, { x: 148, y: 140, c: '#c42034' }, { x: 176, y: 126, c: '#e8573a' },
  { x: 134, y: 160, c: '#c42034' }, { x: 166, y: 164, c: '#d62f3f' }, { x: 108, y: 156, c: '#e08a3a' },
  { x: 190, y: 152, c: '#c42034' }
]
const beans = Array.from({ length: 22 }, (_, i) => ({
  x: 150 + (rand(i + 5) - 0.5) * 130, y: 148 + (rand(i + 33) - 0.5) * 34, r: Math.round((rand(i + 60) - 0.5) * 180)
}))
</script>

<template>
  <svg :viewBox="mode === 'bowl' ? '35 100 230 135' : '0 0 300 260'" class="art" :preserveAspectRatio="mode === 'bowl' ? 'xMidYMid meet' : 'xMidYMid slice'" role="img" :aria-label="`${props.type} illustration`">
    <defs>
      <radialGradient :id="`bg${uid}`" cx="50%" cy="38%" r="75%">
        <stop offset="0" :stop-color="mode === 'bowl' ? '#efe6d2' : '#3f8a4f'"/>
        <stop offset="1" :stop-color="mode === 'bowl' ? '#e2d6bb' : '#123a1f'"/>
      </radialGradient>
      <linearGradient :id="`wood${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#b98153"/><stop offset="1" stop-color="#6e4223"/>
      </linearGradient>
      <linearGradient :id="`pod${uid}`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#d4dc92"/><stop offset="1" stop-color="#8da24a"/>
      </linearGradient>
      <radialGradient :id="`cherry${uid}`" cx="35%" cy="30%" r="75%">
        <stop offset="0" stop-color="#fff" stop-opacity="0.65"/><stop offset="0.35" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <filter :id="`blur${uid}`"><feGaussianBlur stdDeviation="6"/></filter>
    </defs>
    <rect width="300" height="260" :fill="`url(#bg${uid})`"/>

    <!-- soft backdrop leaves (scene mode) -->
    <g v-if="mode !== 'bowl'" :filter="`url(#blur${uid})`" opacity="0.55" fill="#7cc27a">
      <ellipse cx="20" cy="40" rx="50" ry="18" transform="rotate(-30 20 40)"/>
      <ellipse cx="285" cy="210" rx="55" ry="20" transform="rotate(-35 285 210)"/>
      <ellipse cx="270" cy="30" rx="40" ry="14" transform="rotate(30 270 30)"/>
    </g>

    <!-- BOWL: cardamom scene, and every product thumbnail -->
    <g v-if="type === 'cardamom' || mode === 'bowl'">
      <ellipse cx="150" cy="212" rx="86" ry="10" fill="#000" opacity="0.18"/>
      <path d="M62 150c0 46 40 62 88 62s88-16 88-62z" :fill="`url(#wood${uid})`"/>
      <ellipse cx="150" cy="150" rx="88" ry="20" fill="#8a5630"/>
      <template v-if="type === 'cardamom'">
        <g v-for="(p, i) in pods" :key="i" :transform="`translate(${p.x} ${p.y - 10}) rotate(${p.r})`">
          <ellipse rx="19" ry="9.5" :fill="`url(#pod${uid})`" stroke="#6f8238" stroke-width="0.8"/>
          <path d="M-15 0Q0 -3 15 0M-13 -4Q0 -7 13 -4M-13 4Q0 1 13 4" stroke="#6f8238" stroke-width="0.7" fill="none" opacity="0.7"/>
        </g>
      </template>
      <template v-else-if="type === 'pepper'">
        <g v-for="(b, i) in beans" :key="i">
          <circle :cx="b.x" :cy="b.y - 10" r="8.5" fill="#17120f"/>
          <circle :cx="b.x - 2.5" :cy="b.y - 13" r="2.4" fill="#fff" opacity="0.3"/>
        </g>
      </template>
      <template v-else>
        <g v-for="(b, i) in beans" :key="i" :transform="`translate(${b.x} ${b.y - 10}) rotate(${b.r})`">
          <ellipse rx="11" ry="7.5" fill="#4a2a18"/>
          <path d="M-9 0Q0 -4 9 0" stroke="#1f100a" stroke-width="1.3" fill="none"/>
        </g>
      </template>
    </g>

    <!-- BLACK PEPPER vine (scene) -->
    <g v-else-if="type === 'pepper'">
      <path d="M150 20C152 40 148 60 150 80" stroke="#4a6b2c" stroke-width="3" fill="none"/>
      <path d="M150 52c-30-26-72-12-74 8 30 8 56 2 74-8Z" fill="#3c8a3f"/><path d="M150 52c-22-14-48-14-70 7" stroke="#2a6a2e" stroke-width="1.2" fill="none"/>
      <path d="M150 62c30-26 72-12 74 8-30 8-56 2-74-8Z" fill="#4aa14a"/><path d="M150 62c22-14 48-14 70 7" stroke="#2f7a34" stroke-width="1.2" fill="none"/>
      <g v-for="(p, i) in peppercorns" :key="i">
        <circle :cx="p.x" :cy="p.y" :r="p.r" :fill="i % 4 === 0 ? '#2f5b2a' : '#14110f'"/>
        <circle :cx="p.x - p.r * 0.3" :cy="p.y - p.r * 0.35" :r="p.r * 0.28" fill="#fff" opacity="0.35"/>
      </g>
    </g>

    <!-- COFFEE cherries (scene) -->
    <g v-else>
      <path d="M40 90C100 70 170 78 262 112" stroke="#5a3a22" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M70 84c-8-34 14-52 40-48-2 28-16 44-40 48Z" fill="#2f8a3e"/><path d="M200 106c18-34 46-34 62-14-14 22-38 28-62 14Z" fill="#3c9a4a"/>
      <g v-for="(c, i) in cherries" :key="i">
        <path :d="`M${c.x} ${c.y - 14}L${c.x} 100`" stroke="#4a6b2c" stroke-width="1.6"/>
        <circle :cx="c.x" :cy="c.y" r="15" :fill="c.c"/>
        <circle :cx="c.x" :cy="c.y" r="15" :fill="`url(#cherry${uid})`"/>
        <circle :cx="c.x" :cy="c.y - 12" r="2.2" fill="#4a1a14"/>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.art { width: 100%; height: 100%; }
</style>
