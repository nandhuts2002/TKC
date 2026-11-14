<script setup lang="ts">
const cart = useState('cart', () => 0)
const scrolled = ref(false)
const open = ref(false)
const cropsOpen = ref(false)
const active = ref('home')
const scrollTo = useScrollTo()

const links = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about' },
  { label: 'Our Story', id: 'story' },
  { label: 'Our Crops', id: 'crops', children: ['Cardamom', 'Black Pepper', 'Coffee'] },
  { label: 'Processing', id: 'processing' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Farming Philosophy', id: 'philosophy' },
  { label: 'Shop', id: 'shop' }
]

function go(id: string) {
  open.value = false
  cropsOpen.value = false
  scrollTo(id === 'home' ? '#home' : `#${id}`)
}

onMounted(() => {
  const onScroll = () => (scrolled.value = window.scrollY > 40)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (active.value = e.target.id)),
    { rootMargin: '-45% 0px -50% 0px' }
  )
  ;['home', 'about', 'story', 'crops', 'processing', 'gallery', 'philosophy', 'shop'].forEach((id) => {
    const el = document.getElementById(id)
    if (el) io.observe(el)
  })
  onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll); io.disconnect() })
})
</script>

<template>
  <header class="hdr" :class="{ scrolled }">
    <div class="bar container">
      <a href="#home" class="brand" @click.prevent="go('home')"><Logo :light="!scrolled" :height="96" /></a>

      <nav class="nav" :class="{ open }">
        <div v-for="l in links" :key="l.id" class="item" @mouseenter="l.children && (cropsOpen = true)" @mouseleave="cropsOpen = false">
          <a :href="`#${l.id}`" :class="{ on: active === l.id }" @click.prevent="go(l.id)">
            {{ l.label }}<Icon v-if="l.children" name="chevron" :size="14" />
          </a>
          <div v-if="l.children" class="drop" :class="{ show: cropsOpen }">
            <a v-for="c in l.children" :key="c" href="#crops" @click.prevent="go('crops')">{{ c }}</a>
          </div>
        </div>
      </nav>

      <div class="tools">
        <button aria-label="Search"><Icon name="search" :size="20" /></button>
        <button aria-label="Account" class="hide-sm"><Icon name="user" :size="20" /></button>
        <button aria-label="Cart" class="cart" @click="go('shop')">
          <Icon name="cart" :size="20" />
          <span class="badge" :key="cart">{{ cart }}</span>
        </button>
        <button class="burger" aria-label="Menu" @click="open = !open"><Icon :name="open ? 'close' : 'menu'" :size="24" /></button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hdr { position: fixed; inset: 0 0 auto 0; z-index: 50; transition: background 0.4s, box-shadow 0.4s, backdrop-filter 0.4s; background: rgba(248, 243, 232, 0.72); }
.hdr.scrolled { background: rgba(248, 243, 232, 0.97); box-shadow: 0 6px 30px -14px rgba(18, 48, 27, 0.35); }
.bar { display: flex; align-items: center; justify-content: space-between; height: 100px; transition: height 0.4s var(--ease); }
.scrolled .bar { height: 76px; }
.brand { display: block; transform-origin: left center; transform: scale(1); transition: transform 0.4s var(--ease); }
.scrolled .brand { transform: scale(0.7); }
.nav { display: flex; gap: 6px; }
.item { position: relative; }
.item > a { display: flex; align-items: center; gap: 4px; padding: 10px 16px; font-size: 0.93rem; font-weight: 500; color: var(--green-900); position: relative; }
.item > a::after { content: ''; position: absolute; left: 16px; right: 16px; bottom: 2px; height: 2px; background: var(--green-800); transform: scaleX(0); transform-origin: left; transition: transform 0.45s var(--ease); }
.item > a:hover::after, .item > a.on::after { transform: scaleX(1); }
.drop { position: absolute; top: 100%; left: 0; min-width: 180px; background: #fff; border-radius: 14px; padding: 8px; box-shadow: 0 20px 40px -16px rgba(18, 48, 27, 0.35); opacity: 0; transform: translateY(8px); pointer-events: none; transition: 0.3s var(--ease); }
.drop.show { opacity: 1; transform: none; pointer-events: auto; }
.drop a { display: block; padding: 10px 14px; border-radius: 9px; font-size: 0.9rem; }
.drop a:hover { background: var(--green-100); }
.tools { display: flex; align-items: center; gap: 8px; }
.tools button { padding: 8px; border-radius: 50%; color: var(--green-900); transition: background 0.3s; position: relative; }
.tools button:hover { background: rgba(28, 74, 42, 0.1); }
.badge { position: absolute; top: 0; right: 0; min-width: 18px; height: 18px; border-radius: 9px; background: var(--green-800); color: #fff; font-size: 0.65rem; display: grid; place-items: center; font-weight: 600; animation: pop 0.5s var(--ease); }
@keyframes pop { 0% { transform: scale(0.4); } 60% { transform: scale(1.35); } 100% { transform: scale(1); } }
.burger { display: none; }

@media (max-width: 960px) {
  .burger { display: block; }
  .hide-sm { display: none; }
  .nav { position: fixed; inset: 76px 0 auto 0; flex-direction: column; background: var(--cream); padding: 12px 24px 28px; gap: 0; transform: translateY(-120%); transition: transform 0.55s var(--ease); box-shadow: 0 30px 40px -20px rgba(0, 0, 0, 0.3); max-height: calc(100vh - 76px); overflow: auto; }
  .nav.open { transform: none; }
  .item > a { padding: 14px 4px; font-size: 1.05rem; border-bottom: 1px solid rgba(28, 74, 42, 0.1); }
  .item > a::after { display: none; }
  .drop { display: none; }
}

/* Transparent, white header while over the hero photo */
.hdr:not(.scrolled) { background: linear-gradient(rgba(6, 26, 13, 0.55), rgba(6, 26, 13, 0)); backdrop-filter: none; box-shadow: none; }
.hdr:not(.scrolled) .item > a, .hdr:not(.scrolled) .tools button { color: #fff; }
.hdr:not(.scrolled) .item > a::after { background: var(--gold-soft); }
.hdr:not(.scrolled) .tools button:hover { background: rgba(255, 255, 255, 0.16); }
.hdr:not(.scrolled) .badge { background: var(--gold-soft); color: #12301b; }
@media (max-width: 960px) {
  .hdr:not(.scrolled) .nav .item > a { color: var(--green-900); }
}
</style>
