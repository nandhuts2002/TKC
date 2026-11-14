<script setup lang="ts">
// Opening animation: the logo "grows" upward like the tree, then the curtain lifts
// to reveal the hero. Shown once per browser session; skipped for reduced motion.
const { $gsap: gsap, $lenis: lenis, $reduceMotion: reduce } = useNuxtApp() as any
const introDone = useState('introDone', () => false)
const root = ref<HTMLElement>()
const gone = ref(false)

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

onMounted(async () => {
  let seen = false
  try { seen = !!sessionStorage.getItem('tkc-intro') } catch {}
  if (reduce || seen) {
    introDone.value = true
    gone.value = true
    return
  }

  document.body.style.overflow = 'hidden'
  lenis?.stop()

  // make sure the hero photo is ready before we lift the curtain
  const img = new Image()
  img.src = '/images/hero_plantation.webp'
  const heroReady = Promise.race([img.decode().catch(() => {}), wait(4500)])

  const grow = gsap.timeline()
  grow
    .fromTo('.lg-fill', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 2.3, ease: 'power2.inOut' }, 0.3)
    .fromTo('.lg-bar span', { scaleX: 0 }, { scaleX: 1, duration: 2.3, ease: 'power1.inOut' }, 0.3)
    .from('.lg-tag', { y: 16, opacity: 0, duration: 1, ease: 'power3.out' }, 1.3)
  await Promise.all([grow.then(), heroReady])

  try { sessionStorage.setItem('tkc-intro', '1') } catch {}

  gsap.timeline()
    .to('.lg-inner', { opacity: 0, y: -28, duration: 0.6, ease: 'power2.in' })
    .to(root.value, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power4.inOut' }, '-=0.25')
    .add(() => { introDone.value = true }, '-=0.8')
    .add(() => {
      gone.value = true
      document.body.style.overflow = ''
      lenis?.start()
    })
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  lenis?.start()
})
</script>

<template>
  <div v-if="!gone" ref="root" class="tkc-intro" aria-hidden="true">
    <div class="lg-inner">
      <div class="lg-logo">
        <img class="lg-dim" src="/images/logo-light.webp" alt="" width="640" height="746" />
        <img class="lg-fill" src="/images/logo-light.webp" alt="" width="640" height="746" />
      </div>
      <p class="lg-tag">Rooted in Tradition. Growing with Nature.</p>
      <div class="lg-bar"><span /></div>
    </div>
  </div>
</template>

<style scoped>
.tkc-intro {
  position: fixed; inset: 0; z-index: 300; display: grid; place-items: center;
  background: radial-gradient(70% 60% at 50% 42%, #1a4a2a 0%, #0c2616 62%, #071a0e 100%);
  clip-path: inset(0 0 0 0);
  /* safety net: never trap the page if scripts fail */
  animation: introFallback 0.01s 9s forwards;
}
@keyframes introFallback { to { visibility: hidden; opacity: 0; } }
.lg-inner { display: grid; justify-items: center; gap: 22px; }
.lg-logo { position: relative; height: min(300px, 42vh); aspect-ratio: 640 / 746; filter: drop-shadow(0 12px 40px rgba(0, 0, 0, 0.45)); }
.lg-logo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
.lg-dim { opacity: 0.14; }
.lg-fill { clip-path: inset(100% 0 0 0); }
.lg-tag { font-family: var(--serif); font-size: clamp(0.95rem, 1.6vw, 1.2rem); letter-spacing: 0.04em; color: rgba(255, 244, 220, 0.85); text-align: center; padding: 0 24px; }
.lg-bar { width: min(220px, 56vw); height: 2px; background: rgba(255, 255, 255, 0.14); border-radius: 2px; overflow: hidden; }
.lg-bar span { display: block; height: 100%; background: linear-gradient(90deg, var(--gold-soft), #fff); transform-origin: left; transform: scaleX(0); }
</style>
