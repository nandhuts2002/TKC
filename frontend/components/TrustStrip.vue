<script setup lang="ts">
const items = [
  { icon: 'leaf', a: 'Estate Fresh', b: 'Spices' },
  { icon: 'award', a: 'Generational', b: 'Expertise' },
  { icon: 'sprout', a: 'Nature-Conscious', b: 'Cultivation' },
  { icon: 'truck', a: 'Direct from', b: 'Our Plantation' }
]
</script>

<template>
  <section class="trust" aria-label="Plantation Highlights">
    <div class="container grid">
      <div v-for="i in items" :key="i.a" class="t" data-reveal>
        <span class="ic"><Icon :name="i.icon" :size="24" /></span>
        <p class="t-text">
          <b>{{ i.a }}</b>
          <span>{{ i.b }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust {
  background: #fdfaf4;
  border-bottom: 1px solid rgba(28, 74, 42, 0.08);
  box-shadow: 0 4px 20px rgba(18, 48, 27, 0.02);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.t {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px 14px;
  position: relative;
  transition: transform 0.3s var(--ease);
}

.t:hover {
  transform: translateY(-2px);
}

.t + .t::before {
  content: '';
  position: absolute;
  left: 0;
  top: 26%;
  bottom: 26%;
  width: 1px;
  background: rgba(28, 74, 42, 0.15);
}

.ic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #f0f6ec;
  color: var(--green-800);
  border: 1.5px solid rgba(36, 91, 52, 0.35);
  transition: transform 0.4s var(--ease), background 0.3s, color 0.3s, border-color 0.3s;
  flex: none;
}

.t:hover .ic {
  transform: scale(1.08) rotate(-6deg);
  background: var(--green-800);
  color: #fff;
  border-color: var(--green-800);
}

.t-text {
  display: flex;
  flex-direction: column;
  font-family: var(--serif);
  font-size: 0.98rem;
  line-height: 1.25;
  color: var(--green-900);
}

.t-text b {
  font-weight: 600;
}

.t-text span {
  font-weight: 400;
  color: #384d3c;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
  .t:nth-child(3)::before {
    display: none;
  }
  .t {
    padding: 24px 12px;
  }
}

@media (max-width: 520px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .t + .t::before {
    display: none;
  }
}
</style>
