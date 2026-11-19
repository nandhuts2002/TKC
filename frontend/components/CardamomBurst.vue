<script setup lang="ts">
/**
 * Scroll-driven cardamom pod: the section pins, the pod turns toward the viewer,
 * splits along its seam and the seeds burst out toward the camera.
 * Scroll position scrubs the whole timeline (reversible, no autoplay).
 */
const { $gsap: gsap, $reduceMotion: reduce } = useNuxtApp()
const scrollTo = useScrollTo()
const root = ref<HTMLElement>()
const stage = ref<HTMLElement>()
let ctx: any

// Deterministic PRNG so server and client render identical markup.
function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ---- Pod geometry (viewBox 0 -20 300 560) ---------------------------------
const OUTLINE = 'M150 14 C196 40 276 118 280 262 C283 392 218 474 150 502 C82 474 17 392 20 262 C24 118 104 40 150 14 Z'
const CAVITY = 'M150 46 C188 68 250 138 254 262 C257 372 204 440 150 468 C96 440 43 372 46 262 C50 138 112 68 150 46 Z'

// Ridges run tip to tip, following the outline scaled across the width.
const ridges = [-0.8, -0.42, 0, 0.42, 0.8].map((k) => ({
  k,
  d: `M150 14 C${150 + 46 * k} 40 ${150 + 126 * k} 118 ${150 + 130 * k} 262 C${150 + 133 * k} 392 ${150 + 68 * k} 474 150 502`
}))

// One shared jagged seam so the two halves fit back together exactly.
const seamOffsets = [0, 5, -4, 6, -3, 5, -6, 4, -5, 6, -3, 4, -5, 3, 0]
const seam = seamOffsets.map((o, i) => `${150 + o} ${-20 + i * 40}`)
const seamLine = `M${seam.join(' L')}`
const clipLeft = `M0 -20 L${seam.join(' L')} L0 540 Z`
const clipRight = `M300 -20 L${seam.join(' L')} L300 540 Z`

// ---- Seeds ----------------------------------------------------------------
const rand = rng(11)
const seeds = Array.from({ length: 38 }, (_, i) => {
  const depth = Math.pow(rand(), 1.4) // 0 = far, 1 = right at the camera
  const sy = (rand() - 0.5) * 0.66
  const halfW = Math.sqrt(Math.max(0, 1 - Math.pow(sy / 0.5, 2))) * 0.24
  return {
    i,
    v: i % 4,
    tone: i % 3,
    depth,
    ang: rand() * Math.PI * 2,
    dist: 0.38 + rand() * 0.72,
    sx: (rand() < 0.5 ? -1 : 1) * (0.03 + rand() * 0.8) * halfW,
    sy,
    rot0: rand() * 360,
    spin: (rand() - 0.5) * 900,
    delay: rand() * 0.55,
    dur: 2.3 + rand() * 1.5
  }
})

onMounted(() => {
  if (reduce) return
  const q = gsap.utils.selector(root.value!)
  const dims = () => ({ w: stage.value!.clientWidth, h: stage.value!.clientHeight })
  const podH = () => parseFloat(getComputedStyle(stage.value!).getPropertyValue('--h')) || 520

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: '+=340%',
        pin: true,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    })

    // initial state
    gsap.set(q('.cb-half-l'), { transformOrigin: '0% 50%' })
    gsap.set(q('.cb-half-r'), { transformOrigin: '100% 50%' })
    gsap.set(q('.cb-seed'), { opacity: 0 })

    // 1) the pod turns toward the viewer and settles upright (0 -> 3)
    tl.fromTo(q('.cb-pod'), { scale: 0.55, rotation: -32, rotationY: 38, rotationX: 14, y: 70, opacity: 0 }, { scale: 1, rotation: 0, rotationY: 0, rotationX: 0, y: 0, opacity: 1, ease: 'power2.out', duration: 3 }, 0)
      .fromTo(q('.cb-shadow'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, ease: 'power2.out', duration: 3 }, 0)
      .fromTo(q('.cb-intro > *'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', duration: 1.1, stagger: 0.18 }, 0.2)
      .to(q('.cb-intro'), { y: -50, opacity: 0, ease: 'power2.in', duration: 1 }, 2.4)

    // 2) the pod splits along its seam (3.2 -> 5.4)
    tl.to(q('.cb-half-l'), { x: () => -podH() * 0.17, rotation: -7, rotationY: -26, duration: 2.2, ease: 'power2.inOut' }, 3.2)
      .to(q('.cb-half-r'), { x: () => podH() * 0.17, rotation: 7, rotationY: 26, duration: 2.2, ease: 'power2.inOut' }, 3.2)
      .fromTo(q('.cb-cavity'), { opacity: 0, scaleX: 0.7 }, { opacity: 1, scaleX: 1, duration: 1.4, ease: 'power2.out' }, 3.1)
      .fromTo(q('.cb-bloom'), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1.7, duration: 3, ease: 'power2.out' }, 3.6)
      .to(q('.cb-bloom'), { opacity: 0, duration: 2.2, ease: 'power1.in' }, 6.6)
      .to(q('.cb-shadow'), { opacity: 0, scale: 1.4, duration: 2, ease: 'power1.in' }, 4.4)

    // 3) the seeds burst toward the camera (3.7 -> ~7)
    seeds.forEach((s) => {
      const el = q(`.cb-seed[data-i="${s.i}"]`)
      const inner = q(`.cb-seed[data-i="${s.i}"] i`)
      const at = 4.6 + s.delay * 0.8
      const near = s.depth > 0.72
      const endScale = 0.55 + s.depth * 2.9
      const startScale = 0.75 + s.depth * 0.25

      tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out', immediateRender: false }, 4.3)
        .fromTo(
          el,
          { x: () => s.sx * podH() * 0.42, y: () => s.sy * podH(), scale: startScale, rotation: s.rot0, rotationX: 0, rotationY: 0, transformPerspective: 700 },
          {
            x: () => Math.cos(s.ang) * dims().w * 0.56 * s.dist,
            y: () => Math.sin(s.ang) * dims().h * 0.56 * s.dist,
            scale: endScale,
            rotation: s.rot0 + s.spin,
            rotationX: s.spin * 0.08,
            rotationY: s.spin * -0.06,
            duration: s.dur,
            ease: 'expo.out'
          },
          at
        )
        // slow gravity drift after the burst, near seeds leave the frame
        .to(el, { y: `+=${60 + s.depth * 160}`, rotation: `+=${s.spin * 0.25}`, opacity: near ? 0 : 0.8, duration: 3.2, ease: 'sine.inOut' }, at + s.dur * 0.7)

      // depth of field: near seeds blur as they pass the lens
      if (near) tl.to(inner, { filter: `blur(${2 + s.depth * 5}px)`, duration: s.dur * 0.7, ease: 'power2.out' }, at + 0.15)
    })

    // 4) the empty pod falls away and the closing copy arrives (6.4 -> 10)
    tl.to(q('.cb-half-l'), { x: () => -podH() * 0.5, y: 140, rotation: -26, opacity: 0, duration: 3, ease: 'power2.in' }, 6.3)
      .to(q('.cb-half-r'), { x: () => podH() * 0.5, y: 140, rotation: 26, opacity: 0, duration: 3, ease: 'power2.in' }, 6.3)
      .to(q('.cb-cavity'), { opacity: 0, y: 80, duration: 2.2, ease: 'power2.in' }, 6.4)
      .fromTo(q('.cb-outro > *'), { y: 46, opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', duration: 1.2, stagger: 0.18 }, 7.4)
      .to({}, { duration: 1.4 }, 8.6) // hold on the finished frame
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="cardamom-story" ref="root" class="cb" :class="{ 'cb-static': reduce }" aria-label="From pod to seed: cardamom">
    <!-- shared artwork, defined once and referenced by both halves -->
    <svg width="0" height="0" style="position: absolute" aria-hidden="true">
      <defs>
        <clipPath id="cb-outline"><path :d="OUTLINE" /></clipPath>
        <clipPath id="cb-clip-l"><path :d="clipLeft" /></clipPath>
        <clipPath id="cb-clip-r"><path :d="clipRight" /></clipPath>

        <radialGradient id="cb-body" cx="36%" cy="30%" r="88%">
          <stop offset="0" stop-color="#b3c577" />
          <stop offset="0.32" stop-color="#8ea757" />
          <stop offset="0.68" stop-color="#688536" />
          <stop offset="1" stop-color="#3a561d" />
        </radialGradient>
        <!-- three faces of the pod catch the light differently -->
        <linearGradient id="cb-faces" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="#0d1a06" stop-opacity="0.38" />
          <stop offset="0.2" stop-color="#0d1a06" stop-opacity="0.05" />
          <stop offset="0.36" stop-color="#fff" stop-opacity="0.1" />
          <stop offset="0.52" stop-color="#0d1a06" stop-opacity="0.1" />
          <stop offset="0.7" stop-color="#fff" stop-opacity="0.04" />
          <stop offset="1" stop-color="#0d1a06" stop-opacity="0.5" />
        </linearGradient>
        <radialGradient id="cb-in" cx="50%" cy="45%" r="62%">
          <stop offset="0" stop-color="#ecefc9" />
          <stop offset="0.55" stop-color="#cfd8a2" />
          <stop offset="1" stop-color="#7f9846" />
        </radialGradient>

        <!-- papery longitudinal fibres -->
        <filter id="cb-tex" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.85" numOctaves="3" seed="4" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.12  0 0 0 0 0.2  0 0 0 0 0.04  0 0 0 2.4 -0.95" />
        </filter>
        <!-- slow mottling: patches of yellower and darker green -->
        <filter id="cb-mottle" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="9" result="m" />
          <feColorMatrix in="m" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.6  0 0 0 0 0.2  0 0 0 2.2 -0.9" />
        </filter>
        <!-- fine specks and blemishes -->
        <filter id="cb-speck" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="2" result="s" />
          <feColorMatrix in="s" type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.14  0 0 0 0 0.03  0 0 0 9 -5.4" />
        </filter>
        <filter id="cb-soft"><feGaussianBlur stdDeviation="9" /></filter>
        <filter id="cb-soft-s"><feGaussianBlur stdDeviation="2.2" /></filter>

        <g id="cb-art">
          <path :d="OUTLINE" fill="url(#cb-body)" />
          <g clip-path="url(#cb-outline)">
            <rect x="0" y="-20" width="300" height="560" filter="url(#cb-mottle)" opacity="0.55" style="mix-blend-mode: soft-light" />
            <rect x="0" y="-20" width="300" height="560" filter="url(#cb-tex)" opacity="0.6" style="mix-blend-mode: multiply" />
            <rect x="0" y="-20" width="300" height="560" filter="url(#cb-speck)" opacity="0.35" />
            <rect x="0" y="-20" width="300" height="560" fill="url(#cb-faces)" />
          </g>
          <g clip-path="url(#cb-outline)" fill="none" stroke-linecap="round">
            <template v-for="r in ridges" :key="r.k">
              <path :d="r.d" stroke="#2a4012" stroke-opacity="0.4" stroke-width="2.6" transform="translate(1.8 0)" />
              <path :d="r.d" stroke="#d3e29a" stroke-opacity="0.3" stroke-width="1.6" transform="translate(-1.2 0)" />
            </template>
          </g>
          <!-- dried stalk remnant and beak -->
          <path d="M143 20 C141 6 146 -10 150 -10 C155 -10 159 6 157 20 Z" fill="#7d6b3a" />
          <path d="M147 14 C146 2 149 -6 150 -6" stroke="#b9a766" stroke-width="1.6" fill="none" opacity="0.7" />
          <path d="M141 500 C145 510 155 510 159 500 Z" fill="#5a4a24" opacity="0.8" />
          <!-- waxy highlight + rim -->
          <ellipse cx="108" cy="170" rx="20" ry="104" transform="rotate(-8 108 170)" fill="#fff" opacity="0.2" filter="url(#cb-soft)" clip-path="url(#cb-outline)" />
          <ellipse cx="206" cy="330" rx="8" ry="70" transform="rotate(6 206 330)" fill="#fff" opacity="0.1" filter="url(#cb-soft-s)" clip-path="url(#cb-outline)" />
          <path :d="OUTLINE" fill="none" stroke="#e6efb4" stroke-opacity="0.22" stroke-width="1.6" />
          <path :d="OUTLINE" fill="none" stroke="#17260b" stroke-opacity="0.45" stroke-width="7" clip-path="url(#cb-outline)" style="mix-blend-mode: multiply" />
        </g>
      </defs>
    </svg>

    <div ref="stage" class="cb-stage">
      <div class="cb-bloom" aria-hidden="true" />

      <div class="cb-intro">
        <p class="cb-eyebrow">OUR PRINCIPAL CROP</p>
        <h2>Every pod holds<br />a little of Idukki.</h2>
      </div>

      <div class="cb-scene" aria-hidden="true">
        <div class="cb-shadow" />

        <!-- inside of the pod, revealed as the seam opens -->
        <svg class="cb-layer cb-cavity" viewBox="0 -20 300 560">
          <path :d="CAVITY" fill="url(#cb-in)" />
          <g clip-path="url(#cb-outline)" fill="none" stroke="#7f9840" stroke-opacity="0.35" stroke-width="1.4">
            <path d="M122 72 C106 160 106 380 124 456" />
            <path d="M178 72 C194 160 194 380 176 456" />
          </g>
          <path :d="CAVITY" fill="none" stroke="#4b6320" stroke-opacity="0.55" stroke-width="10" filter="url(#cb-soft-s)" clip-path="url(#cb-outline)" />
        </svg>

        <div class="cb-pod">
          <svg class="cb-layer cb-half cb-half-l" viewBox="0 -20 300 560">
            <g clip-path="url(#cb-clip-l)">
              <use href="#cb-art" />
              <path :d="seamLine" fill="none" stroke="#d9e3a8" stroke-width="5" stroke-linejoin="round" clip-path="url(#cb-outline)" />
              <path :d="seamLine" fill="none" stroke="#56702a" stroke-opacity="0.55" stroke-width="1.2" transform="translate(-4 0)" clip-path="url(#cb-outline)" />
            </g>
          </svg>
          <svg class="cb-layer cb-half cb-half-r" viewBox="0 -20 300 560">
            <g clip-path="url(#cb-clip-r)">
              <use href="#cb-art" />
              <path :d="seamLine" fill="none" stroke="#d9e3a8" stroke-width="5" stroke-linejoin="round" clip-path="url(#cb-outline)" />
              <path :d="seamLine" fill="none" stroke="#56702a" stroke-opacity="0.55" stroke-width="1.2" transform="translate(4 0)" clip-path="url(#cb-outline)" />
            </g>
          </svg>
        </div>

        <span v-for="s in seeds" :key="s.i" class="cb-seed" :data-i="s.i" :data-v="s.v" :data-t="s.tone"><i /></span>
      </div>

      <div class="cb-outro">
        <p class="cb-eyebrow">SMALL SEEDS · BIG AROMA</p>
        <h2>The heart of<br />our plantation.</h2>
        <p class="cb-sub">Grown at 3,400 ft in the misty high ranges of Idukki, Kerala.</p>
        <a href="#shop" class="btn btn-ghost" @click.prevent="scrollTo('#shop')">Shop Cardamom <Icon name="arrow" :size="16" /></a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cb {
  position: relative;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  color: #fff;
  background:
    radial-gradient(ellipse 70% 60% at 50% 48%, #2b6a3b 0%, #1c4a2a 48%, #0f2917 100%);
}
.cb::after {
  /* soft vignette */
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 55%, rgba(5, 16, 9, 0.55) 100%);
  z-index: 6;
}
.cb-stage {
  --h: min(56vh, 112vw, 560px);
  position: relative;
  height: 100%;
  display: grid;
  place-items: center;
  perspective: 1400px;
}

.cb-eyebrow {
  font-size: 0.74rem;
  letter-spacing: 0.32em;
  font-weight: 600;
  color: var(--gold-soft);
  margin-bottom: 16px;
}
.cb h2 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(2.1rem, 5.4vw, 4.2rem);
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: #fff;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
}

.cb-intro,
.cb-outro {
  position: absolute;
  left: 50%;
  translate: -50% 0;
  width: min(900px, 100% - 48px);
  text-align: center;
  z-index: 5;
  pointer-events: none;
}
.cb-intro { top: clamp(72px, 11vh, 120px); }
.cb-outro {
  top: 50%;
  translate: -50% -50%;
  pointer-events: auto;
}
.cb-outro > * { opacity: 0; }
.cb-intro > * { opacity: 0; }
.cb-sub {
  margin: 20px auto 30px;
  max-width: 460px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.05rem;
  line-height: 1.6;
}

/* ---- scene ---- */
.cb-scene {
  position: relative;
  width: calc(var(--h) * 300 / 560);
  height: var(--h);
  transform-style: preserve-3d;
  z-index: 3;
  top: 7vh;
}
.cb-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.cb-pod {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  will-change: transform;
  filter: drop-shadow(0 26px 30px rgba(0, 0, 0, 0.45));
}
.cb-half { will-change: transform; }
.cb-cavity { will-change: transform, opacity; opacity: 0; }

.cb-shadow {
  position: absolute;
  left: 50%;
  bottom: -9%;
  width: 90%;
  height: 8%;
  translate: -50% 0;
  background: radial-gradient(ellipse, rgba(0, 0, 0, 0.55), transparent 70%);
  filter: blur(10px);
}
.cb-bloom {
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--h) * 1.5);
  height: calc(var(--h) * 1.5);
  translate: -50% -50%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 244, 190, 0.55) 0%, rgba(216, 181, 101, 0.22) 34%, transparent 66%);
  opacity: 0;
  z-index: 2;
  pointer-events: none;
}

/* ---- seeds: faceted, wrinkled, dark brown ---- */
.cb-seed {
  --s: calc(var(--h) * 0.045);
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--s);
  height: calc(var(--s) * 1.28);
  margin: calc(var(--s) * -0.64) 0 0 calc(var(--s) * -0.5);
  will-change: transform, opacity;
  filter: drop-shadow(0 4px 5px rgba(0, 0, 0, 0.5));
  z-index: 4;
}
.cb-seed i {
  display: block;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(ellipse 55% 40% at 30% 24%, rgba(255, 228, 184, 0.6), transparent 72%),
    repeating-linear-gradient(8deg, rgba(0, 0, 0, 0.42) 0 1.2px, rgba(255, 210, 160, 0.08) 1.2px 2px, transparent 2px 3.6px),
    radial-gradient(ellipse at 40% 34%, var(--c1, #86512c), var(--c2, #3f2212) 55%, #140a05 100%);
  box-shadow: inset -2px -3px 5px rgba(0, 0, 0, 0.55), inset 1px 1px 3px rgba(255, 220, 170, 0.25);
}
.cb-seed[data-v='0'] i { clip-path: polygon(22% 4%, 70% 0, 98% 30%, 92% 78%, 58% 100%, 12% 90%, 0 42%); }
.cb-seed[data-v='1'] i { border-radius: 54% 46% 42% 58% / 50% 62% 38% 50%; clip-path: polygon(8% 18%, 52% 0, 94% 22%, 100% 66%, 62% 100%, 16% 88%, 0 50%); }
.cb-seed[data-v='2'] i { clip-path: polygon(30% 0, 84% 10%, 100% 52%, 76% 96%, 24% 100%, 2% 58%, 8% 20%); }
.cb-seed[data-v='3'] i { border-radius: 52% 48% 60% 40% / 44% 58% 42% 56%; clip-path: polygon(14% 8%, 70% 0, 100% 36%, 88% 88%, 40% 100%, 4% 70%); }
.cb-seed[data-t='1'] { --c1: #6e3f22; --c2: #301a0c; }
.cb-seed[data-t='2'] { --c1: #94603a; --c2: #4a2a14; }

/* ---- reduced motion: no pin, no pod, just the closing message ---- */
.cb-static { height: auto; padding: 120px 0; }
.cb-static .cb-scene,
.cb-static .cb-intro,
.cb-static .cb-bloom { display: none; }
.cb-static .cb-stage { height: auto; }
.cb-static .cb-outro { position: static; translate: none; }
.cb-static .cb-outro > * { opacity: 1; }
.cb-static::after { display: none; }

@media (max-width: 640px) {
  .cb-stage { --h: min(58vh, 112vw); }
  .cb-sub { font-size: 0.98rem; }
}
</style>
