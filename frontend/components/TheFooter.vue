<script setup lang="ts">
const email = ref('')
const done = ref(false)
const scrollTo = useScrollTo()
function submit() {
  if (!/^\S+@\S+\.\S+$/.test(email.value)) return
  // TODO: POST to /api/subscribe once the backend exists.
  done.value = true
}
const quick = [['Home', '#home'], ['About Us', '#about'], ['Our Story', '#story'], ['Our Crops', '#crops'], ['Gallery', '#gallery']]
const help = [['Shop', '#shop'], ['My Account', '#home'], ['Track Order', '#home'], ['Contact Us', '#footer']]
</script>

<template>
  <footer id="footer" class="ftr">
    <div class="container grid">
      <div class="brand"><Logo light :height="150" /></div>
      <div class="col loc">
        <p><Icon name="pin" :size="20" /> Vandiperiyar, Idukki<br />Kerala, India</p>
        <p><Icon name="mountain" :size="20" /> ~ 3,400 ft Above Sea Level<br />Near Periyar Tiger Reserve</p>
      </div>
      <div class="col">
        <h4>Quick Links</h4>
        <a v-for="[l, h] in quick" :key="l" :href="h" @click.prevent="scrollTo(h)">{{ l }}</a>
      </div>
      <div class="col">
        <h4>Help</h4>
        <a v-for="[l, h] in help" :key="l" :href="h" @click.prevent="scrollTo(h)">{{ l }}</a>
      </div>
      <div class="col news">
        <h4>Stay Connected</h4>
        <p v-if="!done">Get updates on new harvests, products and plantation stories.</p>
        <p v-else class="ok">Thank you. You’re on the list.</p>
        <form v-if="!done" @submit.prevent="submit">
          <input v-model="email" type="email" placeholder="Enter your email" aria-label="Email address" required />
          <button aria-label="Subscribe"><Icon name="arrow" :size="20" /></button>
        </form>
      </div>
    </div>
    <p class="copy">© {{ new Date().getFullYear() }} TKC Plantations. Rooted in Tradition. Growing with Nature.</p>
  </footer>
</template>

<style scoped>
.ftr { position: relative; background: var(--green-900); color: #e6efe0; padding: 64px 0 24px; overflow: hidden; }
.ftr::before { content: ''; position: absolute; right: -60px; bottom: -80px; width: 340px; height: 340px; background: radial-gradient(circle, rgba(95, 170, 105, 0.3), transparent 70%); }
.grid { position: relative; display: grid; grid-template-columns: 1fr 1.2fr 0.8fr 0.8fr 1.5fr; gap: 36px; align-items: start; }
.col h4 { color: #fff; font-family: var(--sans); font-size: 0.95rem; font-weight: 600; margin-bottom: 16px; }
.col a { display: block; margin-bottom: 10px; font-size: 0.9rem; opacity: 0.8; transition: opacity 0.3s, transform 0.3s var(--ease); }
.col a:hover { opacity: 1; transform: translateX(6px); }
.loc p { display: flex; gap: 12px; font-size: 0.88rem; margin-bottom: 18px; opacity: 0.9; }
.loc svg { flex: none; color: var(--gold-soft); }
.news p { font-size: 0.88rem; opacity: 0.85; margin-bottom: 14px; }
.ok { color: var(--gold-soft); opacity: 1 !important; }
form { display: flex; background: #fff; border-radius: 12px; padding: 5px; }
input { flex: 1; min-width: 0; border: 0; outline: 0; padding: 10px 14px; font: inherit; font-size: 0.9rem; background: transparent; color: var(--ink); }
form button { width: 44px; border-radius: 9px; background: var(--green-800); color: #fff; display: grid; place-items: center; transition: background 0.3s; }
form button:hover { background: var(--green-600); }
.copy { position: relative; margin-top: 44px; text-align: center; font-size: 0.8rem; opacity: 0.55; }
@media (max-width: 1000px) { .grid { grid-template-columns: 1fr 1fr; } .brand { grid-column: 1 / -1; } .news { grid-column: 1 / -1; } }
</style>
