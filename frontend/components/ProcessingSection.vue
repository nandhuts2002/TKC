<script setup lang="ts">
// Cardamom processing: five in-house stages, then what sets our sequence apart and
// where each grade goes. Copy comes from the "Cardamom Processing – Website Content" draft.
const steps = [
  {
    title: 'Washing',
    text: 'Freshly harvested cardamom arriving from the field is first fed into a washing machine. The pods are thoroughly washed to remove soil, mud and other field impurities.'
  },
  {
    title: 'Heat Pump Drying & Dehumidification',
    text: 'The washed cardamom moves to the drying unit, where a heat-pump dryer removes moisture through controlled dehydration and dehumidification. Drying runs for a specified period to preserve the natural colour, aroma and quality.'
  },
  {
    title: 'Polishing',
    text: 'Once dry, the cardamom moves directly to the polishing machine, which removes flower remnants and other dry residues attached to the pods.'
  },
  {
    title: 'Size Grading',
    text: 'The polished cardamom passes through a grading machine and is separated into size categories.',
    grades: ['5 mm', '6 mm', '7 mm', '8 mm', '8.5 mm']
  },
  {
    title: 'Selective Sortex Cleaning',
    text: 'After grading, the cardamom is sent to the Sortex machine, which identifies and removes pods with visible blemishes, colour deficiencies and other quality defects.'
  }
]

const equipment = machines

const scrollTo = useScrollTo()
const conventional = ['Sortex (all in bulk)', 'Size grading']
const tkc = ['Size grading', 'Selective Sortex']
</script>

<template>
  <section id="processing" class="processing">
    <div class="container">
      <header class="head" data-reveal>
        <p class="eyebrow">Cardamom Processing</p>
        <h2>From Field to Finished Grade, All Within the Plantation</h2>
        <p class="lead">
          At TKC Plantations, cardamom is processed entirely within the plantation using a carefully managed,
          step-by-step process. From washing and drying to polishing, grading and selective sorting, each stage is
          designed to maintain the natural colour, aroma and quality of the spice.
        </p>
      </header>

      <ol class="steps">
        <li v-for="(s, i) in steps" :key="s.title" class="step" data-reveal>
          <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="body">
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
            <ul v-if="s.grades" class="grades" aria-label="Size grades">
              <li v-for="g in s.grades" :key="g">{{ g }}</li>
            </ul>
          </div>
        </li>
      </ol>

      <div class="machines" data-reveal>
        <p class="eyebrow">Our Equipment</p>
        <h3>The Machines &amp; Store at the Plantation</h3>
        <div class="m-grid">
          <figure v-for="m in equipment" :key="m.title" class="mach">
            <div class="ph"><img :src="asset(m.src)" :alt="m.title" loading="lazy" /></div>
            <figcaption><b>{{ m.title }}</b><span>{{ m.caption }}</span></figcaption>
          </figure>
        </div>
        <a href="#gallery" class="btn btn-ghost more" @click.prevent="scrollTo('#gallery')">View full gallery <Icon name="arrow" :size="16" /></a>
      </div>

      <div class="diff" data-reveal>
        <div class="diff-copy">
          <p class="eyebrow light">What Makes Our Process Different</p>
          <h3>Graded first, then selectively sorted</h3>
          <p>
            In the conventional method described, cardamom is commonly passed through the Sortex machine in bulk
            before size grading. At TKC Plantations the sequence is different: cardamom is graded first and then sent
            for selective Sortex cleaning. This allows higher-value grades and cardamom intended for export orders to
            receive additional optical sorting and cleaning.
          </p>
        </div>
        <div class="flows">
          <div class="flow">
            <span class="flow-label">Conventional</span>
            <div class="chain">
              <template v-for="(c, i) in conventional" :key="c">
                <span class="chip">{{ c }}</span>
                <span v-if="i < conventional.length - 1" class="arr" aria-hidden="true"><Icon name="arrow" :size="16" /></span>
              </template>
            </div>
          </div>
          <div class="flow tkc">
            <span class="flow-label">TKC Plantations</span>
            <div class="chain">
              <template v-for="(c, i) in tkc" :key="c">
                <span class="chip">{{ c }}</span>
                <span v-if="i < tkc.length - 1" class="arr" aria-hidden="true"><Icon name="arrow" :size="16" /></span>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="market" data-reveal>
        <h3>Market Allocation</h3>
        <div class="market-grid">
          <article class="m-card">
            <span class="m-icon"><Icon name="award" :size="22" /></span>
            <div>
              <b>Higher-value grades &amp; export batches</b>
              <p>Undergo Sortex cleaning.</p>
            </div>
          </article>
          <article class="m-card">
            <span class="m-icon"><Icon name="bag" :size="22" /></span>
            <div>
              <b>Lower grades</b>
              <p>Directed to the Spices Board’s cardamom auction pool.</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.processing { padding: 95px 0 100px; background: var(--cream-2); }
.head { max-width: 760px; margin-bottom: 56px; }
.head .eyebrow { margin-bottom: 14px; }
.head h2 { font-size: clamp(1.9rem, 3.2vw, 2.8rem); margin-bottom: 18px; }
.lead { color: var(--muted); font-size: 1rem; line-height: 1.7; }

.steps { list-style: none; margin: 0 0 64px; padding: 0; display: grid; grid-template-columns: repeat(6, 1fr); gap: 18px; counter-reset: s; }
.step { grid-column: span 2; position: relative; display: flex; gap: 18px; padding: 26px 24px; background: #fff; border-radius: var(--radius); box-shadow: 0 12px 28px -16px rgba(18, 48, 27, 0.3); border: 1px solid rgba(28, 74, 42, 0.08); }
.step:nth-child(4), .step:nth-child(5) { grid-column: span 3; }
.num { font-family: var(--serif); font-size: 2.2rem; line-height: 1; color: transparent; -webkit-text-stroke: 1.2px var(--gold); flex: none; }
.body h3 { font-size: 1.15rem; margin-bottom: 8px; }
.body p { font-size: 0.92rem; line-height: 1.65; color: var(--muted); }
.grades { list-style: none; margin: 14px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.grades li { padding: 5px 13px; border-radius: 999px; background: var(--green-100); color: var(--green-800); font-size: 0.8rem; font-weight: 600; }

.diff { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 44px; align-items: center; padding: 44px; border-radius: 24px; color: #fff; background: linear-gradient(135deg, var(--green-900), var(--green-800)); box-shadow: 0 26px 50px -24px rgba(18, 48, 27, 0.7); }
.eyebrow.light { color: var(--gold-soft); margin-bottom: 12px; }
.diff h3 { color: #fff; font-size: clamp(1.5rem, 2.4vw, 2rem); margin-bottom: 14px; }
.diff-copy p:not(.eyebrow) { color: rgba(255, 255, 255, 0.85); line-height: 1.7; font-size: 0.97rem; }
.flows { display: grid; gap: 16px; }
.flow { padding: 18px 20px; border-radius: 16px; background: rgba(255, 255, 255, 0.07); border: 1px solid rgba(255, 255, 255, 0.14); }
.flow.tkc { background: rgba(216, 181, 101, 0.16); border-color: var(--gold-soft); }
.flow-label { display: block; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 12px; color: rgba(255, 255, 255, 0.7); }
.flow.tkc .flow-label { color: var(--gold-soft); }
.chain { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.chip { padding: 8px 14px; border-radius: 999px; background: rgba(255, 255, 255, 0.12); font-size: 0.88rem; font-weight: 500; }
.flow.tkc .chip { background: var(--gold-soft); color: var(--green-900); font-weight: 600; }
.arr { color: rgba(255, 255, 255, 0.6); display: inline-flex; }

.market { margin-top: 56px; }
.market h3 { font-size: 1.5rem; margin-bottom: 20px; }
.market-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
.m-card { display: flex; gap: 16px; align-items: center; padding: 22px 24px; background: #fff; border-radius: var(--radius); border: 1px solid rgba(28, 74, 42, 0.1); }
.m-icon { width: 46px; height: 46px; border-radius: 50%; display: grid; place-items: center; flex: none; background: var(--green-100); color: var(--green-800); }
.m-card b { display: block; font-family: var(--serif); font-weight: 500; font-size: 1.05rem; color: var(--green-900); margin-bottom: 2px; }
.m-card p { font-size: 0.9rem; color: var(--muted); }

.machines { margin: 0 0 64px; }
.machines .eyebrow { margin-bottom: 10px; }
.machines h3 { font-size: 1.5rem; margin-bottom: 22px; }
.m-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.mach { margin: 0; background: #fff; border-radius: var(--radius); overflow: hidden; border: 1px solid rgba(28, 74, 42, 0.08); box-shadow: 0 12px 28px -16px rgba(18, 48, 27, 0.3); }
.ph { aspect-ratio: 4 / 3; overflow: hidden; }
.ph img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s var(--ease); }
.mach:hover .ph img { transform: scale(1.05); }
.mach figcaption { padding: 16px 18px 20px; display: grid; gap: 6px; }
.mach figcaption b { font-family: var(--serif); font-weight: 500; font-size: 1.05rem; color: var(--green-900); }
.mach figcaption span { font-size: 0.86rem; line-height: 1.55; color: var(--muted); }
.more { margin-top: 22px; }

@media (max-width: 1024px) {
  .m-grid { grid-template-columns: repeat(2, 1fr); }
  .steps { grid-template-columns: repeat(2, 1fr); }
  .step, .step:nth-child(4), .step:nth-child(5) { grid-column: span 1; }
  .diff { grid-template-columns: 1fr; padding: 32px; gap: 28px; }
}
@media (max-width: 640px) {
  .processing { padding: 70px 0; }
  .steps, .market-grid, .m-grid { grid-template-columns: 1fr; }
  .diff { padding: 26px 22px; }
}
</style>
