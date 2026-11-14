<script setup lang="ts">
const scrollTo = useScrollTo()

function tilt(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  el.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * 8}deg`)
  el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`)
}
function untilt(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}

const crops = [
  {
    key: 'cardamom',
    name: 'Cardamom',
    icon: 'leaf',
    img: '/images/crop_cardamom.webp',
    text: 'Our principal crop and the heart of our plantation activities.'
  },
  {
    key: 'pepper',
    name: 'Black Pepper',
    icon: 'sprout',
    img: '/images/crop_black_pepper.webp',
    text: 'An important part of our continuing cultivation tradition.'
  },
  {
    key: 'coffee',
    name: 'Coffee',
    icon: 'award',
    img: '/images/crop_coffee.webp',
    text: 'A crop with deep roots in the plantation’s history.'
  }
] as const
</script>

<template>
  <section id="crops" class="crops">
    <div class="container layout">
      <div class="intro" data-reveal>
        <p class="eyebrow">OUR CROPS</p>
        <h2>A Rich<br />Plantation Heritage</h2>
        <p class="lead">
          We cultivate premium spices and coffee in the high ranges of Idukki, with cardamom as our primary focus.
        </p>
        <a href="#shop" class="btn btn-primary" @click.prevent="scrollTo('#shop')">
          Explore Our Crops <Icon name="arrow" :size="16" />
        </a>
      </div>

      <div class="cards">
        <article
          v-for="c in crops"
          :key="c.key"
          class="card"
          data-reveal
          @click="scrollTo('#shop')"
          @mousemove="tilt"
          @mouseleave="untilt"
        >
          <div class="img-wrap">
            <img loading="lazy" decoding="async" :src="c.img" :alt="`TKC Plantations ${c.name}`" class="crop-img" />
          </div>
          <div class="shade" />

          <div class="card-badge">
            <div class="badge-content">
              <h3>
                <Icon :name="c.icon" :size="16" /> {{ c.name }}
              </h3>
              <p>{{ c.text }}</p>
            </div>
            <span class="go" aria-hidden="true">
              <Icon name="arrow" :size="15" />
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.crops {
  padding: 85px 0 95px;
  background: var(--cream);
}

.layout {
  display: grid;
  grid-template-columns: 0.82fr 2.18fr;
  gap: 48px;
  align-items: center;
}

.intro {
  max-width: 320px;
}

.intro .eyebrow {
  margin-bottom: 14px;
}

.intro h2 {
  font-family: var(--serif);
  font-size: clamp(2.1rem, 3.2vw, 2.85rem);
  line-height: 1.15;
  margin-bottom: 20px;
  color: var(--green-900);
}

.lead {
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 28px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.card {
  position: relative;
  aspect-ratio: 3 / 3.8;
  border-radius: 20px;
  overflow: hidden;
  color: #fff;
  cursor: pointer;
  background: #1e3824;
  box-shadow: 0 12px 28px -12px rgba(18, 48, 27, 0.35);
  --rx: 0deg; --ry: 0deg;
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.4s var(--ease), box-shadow 0.35s var(--ease), opacity 0.9s var(--ease);
  will-change: transform;
}

.card:hover {
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(-6px);
  box-shadow: 0 22px 42px -16px rgba(18, 48, 27, 0.55);
}

.img-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.crop-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s var(--ease);
}

.card:hover .crop-img {
  transform: scale(1.08);
}

.shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 30%,
    rgba(10, 30, 16, 0.35) 60%,
    rgba(10, 30, 16, 0.92) 100%
  );
  pointer-events: none;
}

/* Frosted pill badge overlay at bottom of card */
.card-badge {
  position: absolute;
  left: 18px;
  right: 16px;
  bottom: 18px;
  padding: 0;
  transform: translateZ(30px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  transition: background 0.3s;
}


.badge-content {
  flex: 1;
}

.badge-content h3 {
  color: #fff;
  font-size: 1.08rem;
  font-family: var(--serif);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 3px;
}

.badge-content h3 svg {
  color: var(--gold-soft);
}

.badge-content p {
  font-size: 0.75rem;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.82);
}

.go {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.6);
  display: grid;
  place-items: center;
  color: #fff;
  flex: none;
  transition: background 0.25s, color 0.25s, transform 0.25s;
}

.card:hover .go {
  background: #fff;
  color: var(--green-900);
  transform: translateX(2px);
}

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .intro {
    max-width: 100%;
  }
}

@media (max-width: 720px) {
  .cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .card {
    aspect-ratio: 4 / 3;
  }
}
</style>
