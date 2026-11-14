// GitHub Pages serves a project site from /<repo>/; the workflow sets NUXT_APP_BASE_URL.
const base = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: base,
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'TKC Plantations | Premium Cardamom, Pepper & Coffee from Idukki, Kerala',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'A family plantation in Vandiperiyar, Idukki, Kerala at about 3,400 ft near the Periyar Tiger Reserve. Cardamom, black pepper and coffee grown with traditional, nature-conscious practices.'
        },
        { name: 'theme-color', content: '#1c4a2a' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: `${base}favicon.png` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap'
        }
      ],
      // Mark the page as "animated" before first paint so reveal targets never flash.
      script: [
        {
          innerHTML:
            "var d=document.documentElement,r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r){d.classList.add('anim')}try{if(r||sessionStorage.getItem('tkc-intro')){d.classList.add('intro-seen')}}catch(e){}"
        }
      ]
    }
  }
})
