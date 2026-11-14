<script setup lang="ts">
const all = useGallery()
const tabs = ['All', 'Machinery', 'Plantation'] as const
const tab = ref<(typeof tabs)[number]>('All')
const items = computed(() => (tab.value === 'All' ? all : all.filter((i) => i.group === tab.value)))
const current = ref<number | null>(null)

const open = (i: number) => (current.value = i)
const close = () => (current.value = null)
const step = (d: number) => {
  if (current.value === null) return
  current.value = (current.value + d + items.value.length) % items.value.length
}
watch(tab, close)

function onKey(e: KeyboardEvent) {
  if (current.value === null) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
}
watch(current, (v) => {
  if (import.meta.client) document.body.style.overflow = v === null ? '' : 'hidden'
})
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <section id="gallery" class="gallery">
    <div class="container">
      <header class="head" data-reveal>
        <p class="eyebrow">Gallery</p>
        <h2>Inside the Plantation</h2>
        <p class="lead">A look at the machines, the store and the land where TKC cardamom is grown and processed.</p>
      </header>

      <div class="tabs" role="tablist" data-reveal>
        <button v-for="t in tabs" :key="t" role="tab" :aria-selected="tab === t" :class="{ on: tab === t }" @click="tab = t">{{ t }}</button>
      </div>

      <div class="grid">
        <button v-for="(it, i) in items" :key="it.src" class="tile" :aria-label="`View ${it.title}`" @click="open(i)">
          <img :src="asset(it.src)" :alt="it.title" loading="lazy" />
          <span class="cap"><b>{{ it.title }}</b><small>{{ it.group }}</small></span>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="current !== null" class="lb" role="dialog" aria-modal="true" :aria-label="items[current].title" @click.self="close">
        <button class="x" aria-label="Close" @click="close"><Icon name="close" :size="26" /></button>
        <button class="nav prev" aria-label="Previous" @click="step(-1)"><Icon name="arrow" :size="24" /></button>
        <figure>
          <img :src="asset(items[current].src)" :alt="items[current].title" />
          <figcaption><b>{{ items[current].title }}</b><span>{{ items[current].caption }}</span></figcaption>
        </figure>
        <button class="nav next" aria-label="Next" @click="step(1)"><Icon name="arrow" :size="24" /></button>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.gallery { padding: 95px 0 100px; background: var(--cream); }
.head { max-width: 680px; margin-bottom: 30px; }
.head .eyebrow { margin-bottom: 14px; }
.head h2 { font-size: clamp(1.9rem, 3.2vw, 2.8rem); margin-bottom: 14px; }
.lead { color: var(--muted); line-height: 1.7; }
.tabs { display: flex; gap: 8px; margin-bottom: 28px; flex-wrap: wrap; }
.tabs button { padding: 9px 20px; border-radius: 999px; font-size: 0.88rem; font-weight: 600; color: var(--green-800); background: #fff; border: 1px solid rgba(28, 74, 42, 0.2); transition: 0.25s; }
.tabs button.on { background: var(--green-800); color: #fff; border-color: var(--green-800); }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.tile { position: relative; overflow: hidden; border-radius: var(--radius); aspect-ratio: 4 / 3; background: var(--green-100); cursor: zoom-in; box-shadow: 0 12px 28px -16px rgba(18, 48, 27, 0.4); }
.tile img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s var(--ease); }
.tile:hover img { transform: scale(1.06); }
.cap { position: absolute; inset: auto 0 0 0; padding: 40px 16px 14px; text-align: left; color: #fff; background: linear-gradient(transparent, rgba(6, 26, 13, 0.8)); display: flex; flex-direction: column; gap: 2px; }
.cap b { font-family: var(--serif); font-weight: 500; font-size: 1rem; }
.cap small { font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold-soft); }

.lb { position: fixed; inset: 0; z-index: 200; background: rgba(6, 20, 11, 0.94); display: flex; align-items: center; justify-content: center; padding: 24px 72px; }
.lb figure { margin: 0; max-width: min(1100px, 100%); }
.lb img { max-height: 76vh; width: auto; max-width: 100%; margin-inline: auto; border-radius: 12px; }
.lb figcaption { color: #fff; text-align: center; margin-top: 16px; display: grid; gap: 4px; }
.lb figcaption b { font-family: var(--serif); font-weight: 500; font-size: 1.25rem; }
.lb figcaption span { color: rgba(255, 255, 255, 0.75); font-size: 0.92rem; }
.lb button { color: #fff; position: absolute; width: 46px; height: 46px; border-radius: 50%; display: grid; place-items: center; background: rgba(255, 255, 255, 0.12); transition: background 0.25s; }
.lb button:hover { background: rgba(255, 255, 255, 0.25); }
.x { top: 20px; right: 20px; }
.nav { top: 50%; transform: translateY(-50%); }
.prev { left: 18px; }
.prev :deep(svg) { transform: scaleX(-1); }
.next { right: 18px; }

@media (max-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 760px) {
  .gallery { padding: 70px 0; }
  .grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .lb { padding: 70px 12px 24px; }
  .nav { top: auto; bottom: 18px; transform: none; }
}
</style>
