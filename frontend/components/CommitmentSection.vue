<template>
  <section class="commit">
    <div class="container">
      <div class="commit-card" data-reveal>
        <!-- Panoramic Golden Landscape of Plantation Hills -->
        <div class="landscape-wrap">
          <img loading="lazy" decoding="async"
            :src="asset('/images/commitment_landscape.webp')"
            alt="Misty golden plantation hills of Idukki"
            class="landscape-img"
          />
          <div class="landscape-shade" />
        </div>

        <div class="commit-content">
          <div class="commit-heading">
            <span class="commit-icon"><Icon name="leaf" :size="30" /></span>
            <h2>Our Commitment</h2>
          </div>

          <div class="commit-divider" />

          <p class="commit-text">
            We believe that caring for the land today contributes to a better tomorrow. Through traditional, nature-conscious practices, TKC Plantations strives to grow quality spices with consideration for the environment and future generations.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.commit {
  padding: 0 0 100px;
  background: var(--cream);
}

.commit-card {
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  background: #f4ecdc;
  border: 1px solid rgba(28, 74, 42, 0.12);
  box-shadow: 0 14px 34px -16px rgba(18, 48, 27, 0.15);
  min-height: 160px;
}

.landscape-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
}

.landscape-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  opacity: 1;
  transition: transform 1.2s var(--ease);
}

.commit-card:hover .landscape-img {
  transform: scale(1.03);
}

/* Smooth gradient overlay that leaves panoramic hills visible on left
   and creates a clean warm ivory card surface for text on right */
.landscape-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      rgba(244, 236, 220, 0) 0%,
      rgba(244, 236, 220, 0) 22%,
      rgba(244, 236, 220, 0.97) 40%,
      rgba(244, 236, 220, 0.98) 100%
    );
}

.commit-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 40px;
  padding: 44px 52px 44px 30%;
}

.commit-heading {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
}

.commit-icon {
  color: var(--green-700);
  display: flex;
  align-items: center;
  justify-content: center;
}

.commit-heading h2 {
  font-family: var(--serif);
  font-size: clamp(1.6rem, 2.6vw, 2.2rem);
  font-weight: 500;
  color: var(--green-900);
  white-space: nowrap;
}

.commit-divider {
  width: 1px;
  height: 70px;
  background: rgba(28, 74, 42, 0.25);
}

.commit-text {
  color: #314434;
  font-size: 0.95rem;
  line-height: 1.65;
  max-width: 580px;
}

@media (max-width: 960px) {
  .commit-content {
    grid-template-columns: 1fr;
    padding: 36px 28px;
    gap: 20px;
  }
  .commit-heading {
    justify-content: flex-start;
  }
  .commit-divider {
    display: none;
  }
  .landscape-shade {
    background: rgba(244, 236, 220, 0.92);
  }
  .commit-content { padding-left: 28px; }
}
</style>
