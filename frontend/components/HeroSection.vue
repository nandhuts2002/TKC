<script setup lang="ts">
const { $gsap: gsap, $reduceMotion: reduce } = useNuxtApp()
const introDone = useState('introDone', () => false) // set by <IntroLoader>
const root = ref<HTMLElement>()
const elevation = ref('3,400')
const scrollTo = useScrollTo()
let ctx: any

onMounted(() => {
  if (reduce) return
  // pause the falling leaves once the hero is off-screen
  const io = new IntersectionObserver(([e]) => root.value?.classList.toggle('paused', !e.isIntersecting))
  io.observe(root.value!)
  onBeforeUnmount(() => io.disconnect())

  ctx = gsap.context(() => {
    // Everything below is built paused (so the start state is applied at once,
    // hidden behind the opening animation) and played when the loader lifts.
    const photo = gsap.fromTo('.hero-img', { scale: 1.16 }, { scale: 1, duration: 2.6, ease: 'power2.out', paused: true })
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } })
    tl.from('.eyebrow-h', { y: 18, opacity: 0, duration: 0.8 }, 0.3)
      .from('.hl .line-tradition > span:first-child, .hl .line-nature', { y: 60, opacity: 0, duration: 1.1, stagger: 0.16 }, 0.45)
      .fromTo('.flourish path', { strokeDasharray: 200, strokeDashoffset: 200 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, 1.2)
      .from('.hero-sub', { y: 22, opacity: 0, duration: 0.9 }, 1.0)
      .from('.hero-cta .btn', { y: 22, opacity: 0, duration: 0.8, stagger: 0.12 }, 1.15)
      .from('.facts', { y: 50, opacity: 0, duration: 1 }, 1.3)
      .from('.fact', { y: 12, opacity: 0, stagger: 0.12, duration: 0.7 }, 1.6)

    const n = { v: 0 }
    const count = gsap.to(n, { v: 3400, duration: 2.2, delay: 1.5, ease: 'power2.out', paused: true, onUpdate: () => (elevation.value = Math.round(n.v).toLocaleString('en-US')) })

    const play = () => { photo.play(); tl.play(); count.play() }
    watch(introDone, (v) => v && play(), { immediate: true })

    // scroll parallax: photo drifts slower than the page, copy fades up
    gsap.to('.hero-bg-wrap', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true } })
    gsap.to('.hero-content', { y: -60, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: root.value, start: '30% top', end: 'bottom top', scrub: true } })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="home" ref="root" class="hero">
    <div class="leaves" aria-hidden="true"><i v-for="n in 6" :key="n" :style="{ left: `${(n * 97) % 100}%`, animationDelay: `${-n * 2.3}s`, animationDuration: `${15 + (n % 5) * 3}s`, scale: `${0.6 + (n % 4) * 0.25}` }" /></div>
    <!-- Full-bleed Plantation Landscape Photo matching Mockup -->
    <div class="hero-bg-wrap">
      <img
        src="/images/hero_plantation.webp"
        fetchpriority="high"
        decoding="async"
        alt="TKC Plantations in the misty hills of Idukki Kerala"
        class="hero-img"
      />
      <div class="hero-overlay" />
    </div>

    <!-- Main Copy on Left -->
    <div class="container hero-content">
      <div class="hero-copy">
        <p class="eyebrow eyebrow-h">TKC PLANTATIONS</p>

        <h1 class="hl">
          <span class="line-tradition">
            <span>Rooted in Tradition.</span>
            <!-- Decorative organic green flourish stroke matching mockup -->
            <svg class="flourish" viewBox="0 0 170 14" fill="none" aria-hidden="true">
              <path d="M4 8C48 2.5 122 2 166 9.5" stroke="#e2bd6b" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="line-nature">Growing with Nature.</span>
        </h1>

        <p class="hero-sub">
          Premium cardamom, black pepper and coffee from our family plantation in the high ranges of Idukki, Kerala.
        </p>

        <div class="hero-cta">
          <a href="#story" class="btn btn-primary" @click.prevent="scrollTo('#story')">
            Our Story <Icon name="arrow" :size="16" />
          </a>
          <a href="#shop" class="btn btn-ghost" @click.prevent="scrollTo('#shop')">
            <Icon name="bag" :size="18" /> Shop Our Spices
          </a>
        </div>
      </div>
    </div>

    <!-- Floating Stats Capsule in Bottom Right matching Mockup -->
    <div class="container facts-container">
      <div class="facts">
        <div class="fact">
          <span class="fact-ic"><Icon name="mountain" :size="22" /></span>
          <div class="fact-text">
            <b>~ {{ elevation }} ft</b>
            <span>Above Sea Level</span>
          </div>
        </div>

        <div class="fact-sep" />

        <div class="fact">
          <span class="fact-ic"><Icon name="pin" :size="22" /></span>
          <div class="fact-text">
            <b>Vandiperiyar,</b>
            <span>Idukki, Kerala</span>
          </div>
        </div>

        <div class="fact-sep" />

        <div class="fact">
          <span class="fact-ic"><Icon name="paw" :size="22" /></span>
          <div class="fact-text">
            <b>Near</b>
            <span>Periyar Tiger Reserve</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh; /* full-screen: the cream content only appears once you scroll */
  max-height: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding-top: 124px;
  padding-bottom: 140px;
  background: #17321e;
}

.hero-bg-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 36%;
  display: block;
}

/* Subtle, natural gradient overlay: keeps the landscape crisp and vibrant
   while giving text maximum contrast */
.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to right,
      rgba(253, 251, 246, 0.66) 0%,
      rgba(253, 251, 246, 0.46) 34%,
      rgba(253, 251, 246, 0.1) 56%,
      transparent 72%
    ),
    linear-gradient(
      to top,
      rgba(18, 48, 27, 0.25) 0%,
      transparent 20%
    );
}

.hero-content {
  position: relative;
  z-index: 3;
}

.hero-copy {
  max-width: 660px;
}

.eyebrow-h {
  margin-bottom: 16px;
  color: var(--green-800);
  font-weight: 600;
  letter-spacing: 0.28em;
  font-size: 0.78rem;
}

.hl {
  font-family: var(--serif);
  font-size: clamp(2.4rem, 4.3vw, 3.85rem);
  letter-spacing: -0.02em;
  font-weight: 500;
  line-height: 1.15;
  color: var(--green-900);
  display: flex;
  flex-direction: column;
}

.line-tradition {
  position: relative;
  display: inline-block;
  white-space: nowrap;
}

.flourish {
  position: absolute;
  left: 0;
  bottom: -14px;
  width: 140px;
  height: 10px;
  pointer-events: none;
}

.line-nature {
  display: block;
  white-space: nowrap;
}

.hero-sub {
  margin-top: 22px;
  max-width: 480px;
  font-size: 1.08rem;
  line-height: 1.6;
  color: #243527;
  font-weight: 450;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
}

.btn-primary {
  background: var(--green-800);
  color: #fff;
  padding: 13px 26px;
}

.btn-ghost {
  background: #ffffff;
  color: var(--green-900);
  border: 1px solid rgba(28, 74, 42, 0.25);
  padding: 13px 28px;
}

/* Floating Stats Capsule */
.facts-container {
  position: absolute;
  z-index: 4;
  left: 0;
  right: 0;
  bottom: 30px;
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
}

.facts {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 14px 26px;
  border-radius: 999px;
  background: rgba(18, 48, 27, 0.76);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #fff;
  box-shadow: 0 16px 32px -10px rgba(0, 0, 0, 0.4);
}

.fact {
  display: flex;
  align-items: center;
  gap: 11px;
}

.fact-ic {
  color: var(--gold-soft);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fact-text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.85);
}

.fact-text b {
  font-size: 0.92rem;
  font-weight: 600;
  color: #fff;
  font-variant-numeric: tabular-nums;
}

.fact-sep {
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 1024px) {
  .hero {
    min-height: 100svh;
    padding-bottom: 150px;
  }
  .line-tradition, .line-nature {
    white-space: normal;
  }
  .facts-container {
    bottom: 20px;
  }
}

@media (max-width: 820px) {
  .hero {
    padding-bottom: 24px;
  }
  .facts-container {
    position: relative;
    bottom: auto;
    margin-top: 36px;
  }
  .facts {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 18px;
    padding: 16px 20px;
    gap: 14px;
  }
  .fact-sep {
    display: none;
  }
}

.leaves { position: absolute; inset: 0; z-index: 2; pointer-events: none; overflow: hidden; }
.leaves i { position: absolute; top: -40px; width: 16px; height: 9px; border-radius: 0 100% 0 100%; background: linear-gradient(135deg, #7ab86a, #2b6a33); opacity: 0.75; animation: fall linear infinite; }
@keyframes fall { 0% { transform: translate3d(0, 0, 0) rotate(0); } 50% { transform: translate3d(70px, 45vh, 0) rotate(240deg); } 100% { transform: translate3d(-30px, 105vh, 0) rotate(520deg); } }
.hero-bg-wrap { inset: -16% 0 0 0; will-change: transform; }
.hero-img { will-change: transform; transform-origin: center; }

/* ===== Cinematic theme: rich forest green + golden light, white type ===== */
.hero-img { width: 106%; max-width: none; margin-left: -3%; }
.hero-overlay {
  background:
    radial-gradient(55% 60% at 82% 12%, rgba(255, 196, 104, 0.34), transparent 70%),
    linear-gradient(100deg, rgba(7, 30, 15, 0.92) 0%, rgba(8, 34, 17, 0.74) 30%, rgba(8, 34, 17, 0.28) 55%, transparent 74%),
    linear-gradient(to top, rgba(6, 24, 12, 0.55) 0%, transparent 28%),
    linear-gradient(to bottom, rgba(6, 24, 12, 0.5) 0%, transparent 22%);
}
.eyebrow-h { color: var(--gold-soft); }
.hl { color: #fff; text-shadow: 0 4px 34px rgba(0, 0, 0, 0.35); }
.hero-sub { color: rgba(255, 255, 255, 0.9); text-shadow: 0 2px 16px rgba(0, 0, 0, 0.4); }
.btn-primary { background: linear-gradient(135deg, #e6c474, #bf9137); color: #12301b; box-shadow: 0 12px 28px -10px rgba(216, 170, 70, 0.8); }
.btn-primary:hover { background: linear-gradient(135deg, #f0d286, #c9a047); }
.btn-ghost { background: rgba(20, 50, 28, 0.35); color: #fff; border: 1px solid rgba(255, 255, 255, 0.55); backdrop-filter: none; }
.btn-ghost:hover { background: rgba(255, 255, 255, 0.24); }
.facts { background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.35); box-shadow: 0 18px 40px -14px rgba(0, 0, 0, 0.55); backdrop-filter: none; -webkit-backdrop-filter: none; background: rgba(10, 40, 20, 0.58); }
.hero.paused .leaves i { animation-play-state: paused; }
.hero-img { image-rendering: auto; backface-visibility: hidden; }
</style>
