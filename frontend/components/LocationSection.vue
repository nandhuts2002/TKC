<script setup lang="ts">
// Illustrative elevation profile (NOT to scale): sea level on the left rising to the
// high ranges. As you scroll, the terrain draws itself and a marker climbs to ~3,400 ft.
const { $gsap: gsap, $reduceMotion: reduce } = useNuxtApp() as any
const root = ref<HTMLElement>()
const terrain = ref<SVGPathElement>()
const alt = ref('3,400')
const trees = ref<{ x: number; y: number; s: number }[]>([])
let ctx: any

const FT = 0.07 // px per foot in the illustration
const BASE = 390 // y of sea level
const TARGET_Y = BASE - 3400 * FT // 152 → 3,400 ft
const ticks = [0, 1000, 2000, 3000, 4000]

onMounted(() => {
  const path = terrain.value!
  const L = path.getTotalLength()

  // length along the path where the marker rests (y reaches 3,400 ft)
  let lEnd = L
  for (let l = 0; l <= L; l += 1) {
    if (path.getPointAtLength(l).y <= TARGET_Y + 0.5) { lEnd = l; break }
  }
  // trees for the Periyar Tiger Reserve strip, sitting on the ridge line
  const t: { x: number; y: number; s: number }[] = []
  for (let l = lEnd + 18; l < L - 6; l += 11) {
    const p = path.getPointAtLength(l)
    t.push({ x: p.x, y: p.y + 2, s: 0.8 + ((l * 7) % 5) / 10 })
  }
  trees.value = t

  if (reduce) return

  ctx = gsap.context(() => {
    const line = root.value!.querySelector<SVGLineElement>('.drop')!
    const render = (v: number) => {
      const c = (x: number) => Math.min(1, Math.max(0, x))
      const draw = c(v / 0.35)
      path.style.strokeDasharray = `${L}`
      path.style.strokeDashoffset = `${L * (1 - draw)}`
      gsap.set('.area', { opacity: draw })
      const travel = c((v - 0.22) / 0.7)
      const p = path.getPointAtLength(lEnd * travel)
      gsap.set('.pin', { x: p.x, y: p.y, opacity: c((v - 0.2) / 0.08) })
      gsap.set('.card', { x: Math.max(0, 174 - p.x) }) // keep the label inside the frame near the coast
      line.setAttribute('y2', String(BASE - p.y))
      alt.value = (Math.round((BASE - p.y) / FT / 10) * 10).toLocaleString('en-US')
      gsap.set('.reserve', { opacity: c((v - 0.82) / 0.18) })
    }
    render(0)
    gsap.to({ v: 0 }, {
      v: 1, ease: 'none',
      scrollTrigger: { trigger: '.chart', start: 'top 78%', end: 'bottom 38%', scrub: 0.7 },
      onUpdate() { render((this as any).targets()[0].v) }
    })
    gsap.to('.cloud', { x: 60, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 3 })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="location" ref="root" class="loc">
    <div class="container grid">
      <div class="copy" data-reveal>
        <p class="eyebrow">Our Location</p>
        <h2>High in the Ranges<br />of Idukki</h2>
        <span class="rule" />
        <p class="lead">
          Located in Vandiperiyar, near the Periyar Tiger Reserve, TKC Plantations is surrounded by the natural landscape of Kerala’s high ranges. At an elevation of approximately 3,400 feet, the plantation enjoys conditions well suited to growing cardamom.
        </p>
        <ul class="facts">
          <li><span><Icon name="pin" :size="20" /></span><p><b>Vandiperiyar</b>Peermade Taluk, Idukki, Kerala</p></li>
          <li><span><Icon name="mountain" :size="20" /></span><p><b>~ 3,400 ft</b>Above sea level</p></li>
          <li><span><Icon name="paw" :size="20" /></span><p><b>Periyar Tiger Reserve</b>Our neighbour in the high ranges</p></li>
        </ul>
      </div>

      <figure class="chart" data-reveal>
        <svg viewBox="0 0 800 440" role="img" aria-label="Illustrated elevation profile rising from sea level to the high ranges of Idukki, with TKC Plantations at about 3,400 feet">
          <defs>
            <linearGradient id="loc-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dcebdf"/><stop offset="1" stop-color="#f6efdc"/></linearGradient>
            <linearGradient id="loc-land" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f7d47"/><stop offset="1" stop-color="#17432a"/></linearGradient>
            <radialGradient id="loc-sun" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff4cf"/><stop offset="1" stop-color="#fff4cf" stop-opacity="0"/></radialGradient>
          </defs>
          <rect width="800" height="440" fill="url(#loc-sky)" />
          <circle cx="690" cy="70" r="90" fill="url(#loc-sun)" />

          <!-- clouds -->
          <g fill="#fff" opacity="0.8">
            <g class="cloud"><ellipse cx="170" cy="86" rx="46" ry="11"/><ellipse cx="198" cy="78" rx="30" ry="10"/></g>
            <g class="cloud"><ellipse cx="420" cy="52" rx="52" ry="12"/><ellipse cx="450" cy="44" rx="30" ry="10"/></g>
          </g>

          <!-- elevation grid -->
          <g stroke="#2f6b3d" stroke-opacity="0.22" stroke-dasharray="4 7" fill="none">
            <line v-for="f in ticks" :key="f" x1="56" :y1="BASE - f * FT" x2="800" :y2="BASE - f * FT" />
          </g>
          <g font-size="11" fill="#5d6b5f" font-family="Inter, sans-serif">
            <text v-for="f in ticks" :key="f" x="8" :y="BASE - f * FT + 4">{{ f === 0 ? 'Sea level' : f.toLocaleString('en-US') + ' ft' }}</text>
          </g>

          <!-- far ridge + terrain -->
          <path d="M0 362C100 346 200 352 300 304C400 256 480 206 560 176C640 146 720 138 800 156L800 440L0 440Z" fill="#a9c6a2" opacity="0.7" />
          <path class="area" d="M0 390C80 388 150 378 220 358C290 338 340 300 400 262C460 224 500 184 560 152C600 132 640 124 680 134C730 146 770 176 800 196L800 440L0 440Z" fill="url(#loc-land)" />
          <path ref="terrain" d="M0 390C80 388 150 378 220 358C290 338 340 300 400 262C460 224 500 184 560 152C600 132 640 124 680 134C730 146 770 176 800 196" fill="none" stroke="#e2bd6b" stroke-width="3" stroke-linecap="round" />

          <!-- Periyar Tiger Reserve -->
          <g class="reserve">
            <g fill="#1d5a2f">
              <path v-for="(t, i) in trees" :key="i" :transform="`translate(${t.x} ${t.y}) scale(${t.s})`" d="M0 -22 L7 -8 H3 L9 2 H-9 L-3 -8 H-7 Z" />
            </g>
            <path d="M588 92H792" stroke="#b88a2e" stroke-width="1.5" stroke-dasharray="3 5" />
            <text x="690" y="82" text-anchor="middle" font-size="13" font-weight="600" fill="#12301b" font-family='Fraunces, Georgia, serif'>Periyar Tiger Reserve</text>
          </g>

          <!-- the marker: TKC Plantations -->
          <g class="pin" transform="translate(560 152)">
            <line class="drop" x1="0" y1="0" x2="0" y2="238" stroke="#b88a2e" stroke-width="1.5" stroke-dasharray="3 5" />
            <circle r="16" fill="#e2bd6b" opacity="0.28" class="pulse" />
            <circle r="8" fill="#e2bd6b" stroke="#fff" stroke-width="3" />
            <g class="card"><g transform="translate(-166 -66)">
              <rect width="152" height="50" rx="12" fill="#12301b" />
              <text x="14" y="21" font-size="12" fill="#e9d9a8" font-family="Inter, sans-serif" letter-spacing="0.5">TKC Plantations</text>
              <text x="14" y="41" font-size="18" fill="#fff" font-weight="600" font-family='Fraunces, Georgia, serif'>~ {{ alt }} ft</text>
            </g></g>
          </g>
        </svg>
        <figcaption>Illustrative elevation profile, not to scale.</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.loc { padding: 100px 0 110px; background: linear-gradient(var(--cream), #f3ecd9); }
.grid { display: grid; grid-template-columns: 0.9fr 1.3fr; gap: 56px; align-items: center; }
.copy h2 { font-size: clamp(2rem, 3.4vw, 2.9rem); margin: 14px 0 18px; }
.rule { display: block; width: 44px; height: 3px; background: var(--gold); border-radius: 2px; margin-bottom: 22px; }
.lead { color: #3f503f; line-height: 1.7; max-width: 480px; }
.facts { list-style: none; margin: 28px 0 0; padding: 0; display: grid; gap: 14px; }
.facts li { display: flex; align-items: center; gap: 14px; }
.facts li > span { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: var(--green-100); color: var(--green-800); border: 1px solid rgba(28, 74, 42, 0.18); flex: none; }
.facts p { display: flex; flex-direction: column; font-size: 0.85rem; color: var(--muted); line-height: 1.35; }
.facts b { font-family: var(--serif); font-weight: 500; font-size: 1.05rem; color: var(--green-900); }
.chart { margin: 0; border-radius: 24px; overflow: hidden; background: #fff; box-shadow: 0 30px 60px -30px rgba(18, 48, 27, 0.5), 0 0 0 1px rgba(28, 74, 42, 0.1); }
.chart svg { width: 100%; height: auto; display: block; }
.chart figcaption { padding: 10px 18px 14px; font-size: 0.74rem; color: var(--muted); background: #fbf8ef; }
.pulse { transform-box: fill-box; transform-origin: center; animation: pulse 2.2s ease-out infinite; }
@keyframes pulse { 0% { transform: scale(0.6); opacity: 0.6; } 100% { transform: scale(2.2); opacity: 0; } }
@media (max-width: 960px) { .grid { grid-template-columns: 1fr; gap: 36px; } }
</style>
