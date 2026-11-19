<script setup lang="ts">
onMounted(() => {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
  const show = (el: HTMLElement) => el.classList.add('revealed')
  if (!('IntersectionObserver' in window)) return targets.forEach(show)

  // Stagger siblings that enter together (cards, pillars, ...)
  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((e) => e.isIntersecting)
        .forEach((e, i) => {
          const el = e.target as HTMLElement
          el.style.transitionDelay = `${i * 0.12}s`
          show(el)
          observer.unobserve(el)
        })
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0 }
  )
  targets.forEach((t) => observer.observe(t))

  // Failsafe: never leave content hidden if the observer is throttled
  setTimeout(() => {
    targets.forEach((t) => {
      const r = t.getBoundingClientRect()
      if (r.top < window.innerHeight) show(t)
    })
  }, 1800)
})
</script>

<template>
  <div class="site-wrap">
    <IntroLoader />
    <TheHeader />
    <main>
      <HeroSection />
      <TrustStrip />
      <StorySection />
      <CropsSection />
      <CardamomBurst />
      <ProcessingSection />
      <GallerySection />
      <LocationSection />
      <PhilosophySection />
      <ProductsSection />
      <CommitmentSection />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.site-wrap {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
}
</style>
