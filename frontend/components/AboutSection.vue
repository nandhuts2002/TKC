<script setup lang="ts">
const { $gsap: gsap, $reduceMotion: reduce } = useNuxtApp()
const root = ref<HTMLElement>()
let ctx: any
const text =
  'Nestled near the Periyar Tiger Reserve in Vandiperiyar, Idukki, Kerala, TKC Plantations carries forward a family agricultural legacy dating back to 1942. Today, cardamom is our primary focus, alongside coffee and black pepper.'
const words = text.split(' ')

onMounted(() => {
  if (reduce) return
  ctx = gsap.context(() => {
    gsap.fromTo('.w', { opacity: 0.16 }, {
      opacity: 1, stagger: 0.5, ease: 'none',
      scrollTrigger: { trigger: '.copy', start: 'top 80%', end: 'bottom 45%', scrub: true }
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="about" ref="root" class="about">
    <div class="container">
      <p class="eyebrow" data-reveal>About Us</p>
      <p class="copy"><template v-for="(w, i) in words" :key="i"><span class="w">{{ w }}</span>{{ ' ' }}</template></p>
    </div>
  </section>
</template>

<style scoped>
.about { padding: 110px 0 40px; background: #fbf6ea; }
.eyebrow { margin-bottom: 22px; }
.copy { font-family: var(--serif); font-size: clamp(1.5rem, 3vw, 2.5rem); line-height: 1.3; color: var(--green-900); max-width: 980px; letter-spacing: -0.01em; }
</style>
