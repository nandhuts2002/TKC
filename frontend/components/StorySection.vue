<script setup lang="ts">
// Our Story: the headline section of the page. A full-screen scroll-driven story that
// stays pinned while the chapters (1942 → Today) change, each with its own photo.
//
// To use a real photo, drop the file in /public/images/story/ and set `photo`
// (e.g. '/images/story/thomas-kurian.webp'); a styled placeholder shows until then.
// NOTE: the source document spells the 1942 founder "Thomas Kurian" and the 1976
// founder "Kurian Thomas". Confirm names and the family relationship with the client.
const { $gsap: gsap, $reduceMotion: reduce } = useNuxtApp() as any
const root = ref<HTMLElement>()
let ctx: any

const chapters = [
  {
    year: '1942', title: 'Where it began',
    text: 'Thomas Kurian begins farming in Vandiperiyar, Peermade Taluk, Idukki, growing rice, coffee and black pepper.',
    person: 'Thomas Kurian', role: 'Began farming here', photo: '/images/story/thomas-kurian.jpg', kind: 'portrait'
  },
  {
    year: '1976', title: 'TKC Plantations is born',
    text: 'Kurian Thomas establishes TKC Plantations in its present form, building on the family’s agricultural heritage.',
    person: 'Kurian Thomas', role: 'Founder, TKC Plantations', photo: '/images/story/kurian-thomas.jpg', kind: 'portrait'
  },
  {
    year: '2015', title: 'A new generation',
    text: 'His son, Chris Kuriakose, takes over management of the plantation, carrying its traditions into a new generation.',
    person: 'Chris Kuriakose', role: 'Managing the plantation', photo: '', kind: 'portrait'
  },
  {
    year: 'Today', title: 'Cardamom-led cultivation',
    text: 'Cardamom is our primary focus, alongside coffee and black pepper, grown at about 3,400 ft near the Periyar Tiger Reserve.',
    person: 'The estate today', role: 'Vandiperiyar, Idukki', photo: '', kind: 'landscape'
  }
]

onMounted(() => {
  if (reduce) return
  const mm = gsap.matchMedia()
  mm.add('(min-width: 1px)', () => {
    ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.value, start: 'top top', end: '+=380%', scrub: 0.7, pin: true, anticipatePin: 1 }
      })
      const n = chapters.length
      tl.to('.st-bg', { scale: 1.22, yPercent: -4, duration: n, ease: 'none' }, 0)
        .fromTo('.st-bar-fill', { scaleX: 0 }, { scaleX: 1, duration: n, ease: 'none' }, 0)
        .to('.st-hint', { opacity: 0, duration: 0.3 }, 0.2)

      chapters.forEach((_, i) => {
        const text = `.st-text-${i}`, photo = `.st-photo-${i}`
        if (i === 0) {
          gsap.set([text, photo], { opacity: 1 })
        } else {
          tl.fromTo(text, { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.32 }, i - 0.12)
            .fromTo(photo, { opacity: 0, y: 90, rotate: i % 2 ? 5 : -5, scale: 0.92 }, { opacity: 1, y: 0, rotate: i % 2 ? 2 : -2, scale: 1, duration: 0.42 }, i - 0.16)
        }
        if (i < n - 1) {
          tl.to(text, { opacity: 0, y: -70, duration: 0.26 }, i + 0.62)
            .to(photo, { opacity: 0, y: -90, scale: 0.94, duration: 0.3 }, i + 0.6)
        }
        tl.to(`.st-dot-${i}`, { scale: 1.6, backgroundColor: '#e2bd6b', duration: 0.2 }, i)
      })
    }, root.value)
  })
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="story" ref="root" class="story">
    <div id="about" class="anchor" />
    <img class="st-bg" src="/images/legacy_banner.webp" alt="" loading="lazy" decoding="async" />
    <div class="st-shade" />
    <div class="st-glow" />

    <div class="container st-inner">
      <header class="st-head">
        <p class="eyebrow">Our Story · Since 1942</p>
        <h2>A Legacy<br />Across Generations</h2>
      </header>

      <div class="st-stage">
        <div class="st-texts">
          <article
            v-for="(c, i) in chapters" :key="c.year"
            class="st-text" :class="`st-text-${i}`" :style="{ opacity: i === 0 ? 1 : 0 }"
          >
            <span class="year">{{ c.year }}</span>
            <h3>{{ c.title }}</h3>
            <p>{{ c.text }}</p>
          </article>
        </div>

        <div class="st-photos" aria-hidden="false">
          <span class="paper p1" /><span class="paper p2" />
          <figure
            v-for="(c, i) in chapters" :key="c.year"
            class="frame" :class="[`st-photo-${i}`, c.kind]" :style="{ opacity: i === 0 ? 1 : 0 }"
          >
            <img v-if="c.photo" :src="c.photo" :alt="c.person" loading="lazy" decoding="async" />
            <div v-else class="placeholder">
              <svg v-if="c.kind === 'portrait'" viewBox="0 0 120 150" class="sil" aria-hidden="true">
                <circle cx="60" cy="56" r="25" /><path d="M12 150c2-34 20-50 48-50s46 16 48 50z" />
              </svg>
              <svg v-else viewBox="0 0 240 150" class="sil land" aria-hidden="true">
                <path d="M0 110C40 84 70 98 110 76C150 54 190 72 240 50V150H0Z" />
                <path d="M0 126C50 108 90 122 140 106C180 94 210 108 240 98V150H0Z" opacity="0.7" />
                <circle cx="184" cy="38" r="14" opacity="0.8" />
              </svg>
              <span class="soon">Photo coming soon</span>
            </div>
            <figcaption><b>{{ c.person }}</b><span>{{ c.role }}</span></figcaption>
          </figure>
        </div>
      </div>

      <div class="st-track">
        <div class="st-bar"><div class="st-bar-fill" /></div>
        <ul>
          <li v-for="(c, i) in chapters" :key="c.year"><i class="st-dot" :class="`st-dot-${i}`" />{{ c.year }}</li>
        </ul>
      </div>
      <p class="st-hint" aria-hidden="true"><span /> Scroll to read our story</p>
    </div>
  </section>
</template>

<style scoped>
.story { position: relative; min-height: 100vh; min-height: 100svh; overflow: hidden; color: #fff; background: #0b2315; }
.anchor { position: absolute; top: 0; }
.st-bg { position: absolute; inset: -4%; width: 108%; height: 108%; object-fit: cover; object-position: left center; opacity: 0.55; will-change: transform; }
.st-shade { position: absolute; inset: 0; background: linear-gradient(100deg, rgba(8, 28, 16, 0.94) 0%, rgba(8, 28, 16, 0.82) 45%, rgba(8, 28, 16, 0.6) 100%); }
.st-glow { position: absolute; inset: 0; background: radial-gradient(600px 460px at 78% 52%, rgba(226, 189, 107, 0.2), transparent 70%); pointer-events: none; }
.st-inner { position: relative; z-index: 2; min-height: 100svh; display: grid; grid-template-rows: auto 1fr auto; padding: 118px 0 40px; }
.eyebrow { color: var(--gold-soft); }
.st-head h2 { color: #fff; font-size: clamp(2rem, 4vw, 3.4rem); margin-top: 12px; text-shadow: 0 2px 24px rgba(0, 0, 0, 0.4); }

.st-stage { display: grid; grid-template-columns: 1.15fr 0.85fr; align-items: center; gap: 40px; min-height: 0; }
.st-texts { position: relative; height: min(46vh, 380px); }
.st-text { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; }
.year { font-family: var(--serif); font-size: clamp(4.6rem, 12.5vw, 10.5rem); line-height: 0.92; letter-spacing: -0.03em; color: transparent; -webkit-text-stroke: 1.5px var(--gold-soft); }
.st-text h3 { color: #fff; font-size: clamp(1.5rem, 2.4vw, 2.1rem); margin: 28px 0 10px; }
.st-text p { max-width: 520px; font-size: 1.05rem; line-height: 1.7; color: rgba(255, 255, 255, 0.86); }

.st-photos { position: relative; justify-self: center; height: min(52vh, 480px); aspect-ratio: 4 / 5; }
.paper { position: absolute; inset: 0; border-radius: 18px; background: #efe3c6; box-shadow: 0 20px 40px -18px rgba(0, 0, 0, 0.6); }
.p1 { transform: rotate(-6deg) translate(-14px, 8px); opacity: 0.55; }
.p2 { transform: rotate(5deg) translate(16px, 4px); opacity: 0.75; }
.frame { position: absolute; inset: 0; margin: 0; border-radius: 18px; overflow: hidden; background: #e9dcc0; box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 240, 200, 0.25); will-change: transform, opacity; }
.frame img { width: 100%; height: 100%; object-fit: cover; filter: sepia(0.16) saturate(0.95); }
.placeholder { position: absolute; inset: 0; display: grid; place-items: center; background: radial-gradient(120% 90% at 50% 20%, #f4e8c9 0%, #e3d1a6 60%, #cdb985 100%); }
.placeholder::before { content: ''; position: absolute; inset: 12px; border: 1px solid rgba(110, 80, 30, 0.35); border-radius: 12px; }
.placeholder::after { content: ''; position: absolute; inset: 0; background: radial-gradient(100% 100% at 50% 50%, transparent 55%, rgba(80, 55, 20, 0.3)); }
.sil { width: 56%; margin-top: -10%; fill: rgba(92, 66, 28, 0.38); }
.sil.land { width: 96%; margin-top: -2%; fill: rgba(70, 92, 52, 0.45); }
.soon { position: absolute; top: 20px; left: 50%; translate: -50% 0; font-size: 0.64rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(90, 62, 24, 0.7); white-space: nowrap; z-index: 1; }
figcaption { position: absolute; left: 0; right: 0; bottom: 0; padding: 40px 20px 18px; display: flex; flex-direction: column; background: linear-gradient(transparent, rgba(20, 34, 20, 0.85)); z-index: 2; }
figcaption b { font-family: var(--serif); font-weight: 500; font-size: 1.25rem; }
figcaption span { font-size: 0.82rem; opacity: 0.85; }

.st-track .st-bar { height: 3px; background: rgba(255, 255, 255, 0.18); border-radius: 2px; overflow: hidden; }
.st-bar-fill { height: 100%; background: linear-gradient(90deg, var(--gold-soft), #fff); transform-origin: left; transform: scaleX(0); }
.st-track ul { display: flex; justify-content: space-between; list-style: none; margin: 14px 0 0; padding: 0; font-size: 0.82rem; letter-spacing: 0.14em; text-transform: uppercase; }
.st-track li { display: flex; align-items: center; gap: 10px; }
.st-dot { width: 9px; height: 9px; border-radius: 50%; background: rgba(255, 255, 255, 0.5); display: inline-block; }
.st-hint { position: absolute; left: 50%; bottom: 74px; translate: -50% 0; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255, 255, 255, 0.7); display: flex; align-items: center; gap: 10px; }
.st-hint span { width: 1px; height: 28px; background: linear-gradient(var(--gold-soft), transparent); animation: drip 1.8s ease-in-out infinite; }
@keyframes drip { 0% { transform: scaleY(0); transform-origin: top; } 50% { transform: scaleY(1); transform-origin: top; } 51% { transform-origin: bottom; } 100% { transform: scaleY(0); transform-origin: bottom; } }

@media (max-width: 860px) {
  .st-inner { padding-top: 96px; }
  .st-stage { grid-template-columns: 1fr; gap: 18px; align-content: center; }
  .st-photos { order: -1; height: min(30vh, 260px); }
  .st-texts { height: 230px; }
  .year { font-size: clamp(3.4rem, 18vw, 5rem); }
  .st-text p { font-size: 0.95rem; }
  .st-hint { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .story { min-height: auto; }
  .st-texts { height: auto; display: grid; gap: 40px; }
  .st-text { position: static; opacity: 1 !important; }
  .st-photos, .st-hint, .st-track { display: none; }
}
</style>
