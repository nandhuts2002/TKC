<script setup lang="ts">
const pillars = [
  {
    icon: 'leaf',
    title: 'Nature-Conscious',
    title2: 'Cultivation'
  },
  {
    icon: 'sprout',
    title: 'Traditional',
    title2: 'Practices'
  },
  {
    icon: 'mountain',
    title: 'Sustainable',
    title2: 'Land Care'
  }
]
</script>

<template>
  <section id="philosophy" class="philosophy">
    <!-- Botanical Branch Artwork on Left & Right Margins matching mockup -->
    <div class="botanical-wrap botanical-left" aria-hidden="true">
      <img loading="lazy" decoding="async"
        src="/images/botanical_cutout.webp"
        alt=""
        class="botanical-img"
      />
    </div>
    <div class="botanical-wrap botanical-right" aria-hidden="true">
      <img loading="lazy" decoding="async"
        src="/images/botanical_cutout.webp"
        alt=""
        class="botanical-img"
      />
    </div>

    <div class="container phil-inner">
      <header class="head" data-reveal>
        <p class="eyebrow">
          <span class="eyebrow-line" />
          <span>OUR FARMING PHILOSOPHY</span>
          <span class="eyebrow-line" />
        </p>
        <h2>Cultivation in Harmony with Nature</h2>
      </header>

      <!-- Clean 3-Item Capsule Strip matching Mockup exactly -->
      <div class="pillars-card" data-reveal>
        <template v-for="(p, i) in pillars" :key="p.title">
          <div class="pillar-item">
            <span class="pillar-icon">
              <Icon :name="p.icon" :size="24" />
            </span>
            <div class="pillar-text">
              <b>{{ p.title }}</b>
              <span>{{ p.title2 }}</span>
            </div>
          </div>
          <div v-if="i < pillars.length - 1" class="pillar-divider" />
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.philosophy {
  position: relative;
  padding: 85px 0 95px;
  background: #f7f1e6;
  overflow: hidden;
}

/* Botanical Branches */
.botanical-wrap {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
  pointer-events: none;
  opacity: 0.9;
  z-index: 1;
}

.botanical-left { left: 1%; }
.botanical-right { right: 1%; }
.botanical-left .botanical-img { transform: scaleX(-1); transform-origin: 50% 100%; animation: sway 7s ease-in-out infinite alternate; }
.botanical-right .botanical-img { transform-origin: 50% 100%; animation: sway2 8s ease-in-out infinite alternate; }
@keyframes sway { from { transform: scaleX(-1) rotate(-3deg); } to { transform: scaleX(-1) rotate(4deg); } }
@keyframes sway2 { from { transform: rotate(-4deg); } to { transform: rotate(3deg); } }

.botanical-img {
  width: 100%;
  height: auto;
  display: block;
}

.phil-inner {
  position: relative;
  z-index: 2;
  max-width: 960px;
}

.head {
  text-align: center;
  margin-bottom: 46px;
}

.eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 0.76rem;
  letter-spacing: 0.28em;
  font-weight: 600;
  color: var(--green-700);
  margin-bottom: 14px;
}

.eyebrow-line {
  width: 44px;
  height: 1px;
  background: rgba(36, 91, 52, 0.4);
}

.head h2 {
  font-family: var(--serif);
  font-size: clamp(2rem, 3.6vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--green-900);
}

/* Single unified capsule strip with 3 pillars and dividers */
.pillars-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: 0;
  padding: 18px 0;
}

.pillar-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 10px 16px;
}

.pillar-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #eaf3e5;
  color: var(--green-800);
  border: 1.5px solid rgba(36, 91, 52, 0.3);
  flex: none;
  transition: transform 0.3s var(--ease), background 0.25s, color 0.25s;
}

.pillar-item:hover .pillar-icon {
  transform: scale(1.08);
  background: var(--green-800);
  color: #fff;
}

.pillar-text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
  font-family: var(--serif);
  font-size: 1.05rem;
  color: var(--green-900);
}

.pillar-text b {
  font-weight: 600;
}

.pillar-text span {
  font-weight: 400;
  color: #2b4430;
}

.pillar-divider {
  width: 1px;
  height: 48px;
  background: rgba(28, 74, 42, 0.15);
  flex: none;
}

@media (max-width: 860px) {
  .pillars-card {
    flex-direction: column;
    border-radius: 20px;
    padding: 16px 20px;
    gap: 14px;
  }
  .pillar-item {
    width: 100%;
    justify-content: flex-start;
  }
  .pillar-divider {
    width: 100%;
    height: 1px;
  }
  .botanical-wrap {
    display: none;
  }
}
</style>
