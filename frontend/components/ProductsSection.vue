<script setup lang="ts">
const cart = useState('cart', () => 0)
const toast = ref('')
let timer: any

const products = [
  {
    key: 'cardamom',
    name: 'Premium Cardamom',
    price: 1950,
    size: '250 g',
    img: '/images/product_cardamom.webp',
    origin: 'Vandiperiyar, Kerala'
  },
  {
    key: 'pepper',
    name: 'Natural Black Pepper',
    price: 480,
    size: '250 g',
    img: '/images/product_pepper.webp',
    origin: 'High Ranges, Idukki'
  },
  {
    key: 'coffee',
    name: 'Estate Coffee Beans',
    price: 420,
    size: '250 g',
    img: '/images/product_coffee.webp',
    origin: 'Single Estate Roast'
  }
] as const

function add(name: string) {
  cart.value++
  toast.value = `${name} added to cart`
  clearTimeout(timer)
  timer = setTimeout(() => (toast.value = ''), 2400)
}

const fmt = (n: number) => '₹' + n.toLocaleString('en-IN')
</script>

<template>
  <section id="shop" class="shop">
    <div class="container">
      <header class="head" data-reveal>
        <p class="eyebrow">FEATURED PRODUCTS</p>
        <h2>From Our Plantation to Your Kitchen</h2>
      </header>

      <div class="grid">
        <article
          v-for="p in products"
          :key="p.key"
          class="prod"
          data-reveal
        >
          <div class="img-frame">
            <img loading="lazy" decoding="async" :src="p.img" :alt="p.name" class="prod-img" />
          </div>

          <div class="meta">
            <h3>{{ p.name }}</h3>
            <p class="price">
              <b>{{ fmt(p.price) }}</b>
              <span> / {{ p.size }}</span>
            </p>
          </div>

          <button
            class="add-btn"
            :aria-label="`Add ${p.name} to cart`"
            @click="add(p.name)"
          >
            <Icon name="cart" :size="20" />
          </button>
        </article>
      </div>
    </div>

    <!-- Add to Cart Toast Notification -->
    <Transition name="toast">
      <div v-if="toast" class="toast" role="status">
        <Icon name="cart" :size="18" />
        <span>{{ toast }}</span>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.shop {
  padding: 100px 0 110px;
  background: var(--cream);
}

.head {
  text-align: center;
  margin-bottom: 52px;
}

.head .eyebrow {
  margin-bottom: 14px;
}

.head h2 {
  font-size: clamp(2rem, 3.6vw, 3rem);
  font-weight: 500;
  color: var(--green-900);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.prod {
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 18px 14px 14px;
  border-radius: 20px;
  background: #f1e9d6;
  border: 1px solid rgba(28, 74, 42, 0.1);
  box-shadow: 0 10px 28px -14px rgba(18, 48, 27, 0.1);
  transition: transform 0.4s var(--ease), box-shadow 0.4s, background 0.3s;
}

.prod:hover {
  transform: translateY(-5px);
  background: #fbf7ee;
  box-shadow: 0 20px 38px -18px rgba(18, 48, 27, 0.22);
}

.img-frame {
  width: 120px;
  height: 96px;
  border-radius: 14px;
  overflow: hidden;
  flex: none;
  background: #e3d6be;
}

.prod-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s var(--ease);
}

.prod:hover .prod-img {
  transform: scale(1.1);
}

.meta {
  flex: 1;
  min-width: 0;
}

.meta h3 {
  font-family: var(--serif);
  font-size: 1.12rem;
  font-weight: 600;
  color: var(--green-900);
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price {
  font-size: 0.86rem;
  color: var(--muted);
}

.price b {
  font-family: var(--serif);
  font-size: 1.28rem;
  font-weight: 600;
  color: var(--green-900);
}

.add-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--green-800);
  color: #fff;
  display: grid;
  place-items: center;
  flex: none;
  transition: transform 0.3s var(--ease), background 0.3s, box-shadow 0.3s;
  box-shadow: 0 6px 16px -6px rgba(18, 48, 27, 0.5);
}

.add-btn:hover {
  background: var(--green-700);
  transform: scale(1.08) rotate(-4deg);
  box-shadow: 0 10px 22px -6px rgba(18, 48, 27, 0.65);
}

.add-btn:active {
  transform: scale(0.92);
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--green-900);
  color: #fff;
  padding: 14px 28px;
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 500;
  box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.toast svg {
  color: var(--gold-soft);
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.4s var(--ease);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

@media (max-width: 1060px) {
  .grid {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin-inline: auto;
  }
}

.prod { min-width: 0; }
.meta { min-width: 0; flex: 1; }
.meta h3 { overflow-wrap: anywhere; }
.img-frame { overflow: hidden; flex: none; }
.prod-img { transition: transform 0.8s var(--ease); }
.prod:hover .prod-img { transform: scale(1.12) rotate(-2deg); }
.add-btn { transition: transform 0.3s var(--ease), background 0.25s; }
.add-btn:hover { transform: scale(1.12) rotate(-8deg); }
@media (max-width: 1100px) { .grid { grid-template-columns: 1fr; max-width: 560px; margin-inline: auto; } }
.meta h3 { white-space: normal !important; text-overflow: clip !important; overflow: visible !important; line-height: 1.2; font-size: 1.08rem; }
</style>
