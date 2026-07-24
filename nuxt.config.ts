export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vite-pwa/nuxt'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2026-07-24',

  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-css',
            expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts',
            expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
          },
        },
        {
          urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'jsdelivr-audio',
            expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
          },
        },
        {
          urlPattern: /^https:\/\/api\.pushplus\.tech\/.*/i,
          handler: 'NetworkOnly',
          options: { cacheName: 'api-pushplus' },
        },
      ],
    },
    manifest: {
      name: '锁车音效分享平台',
      short_name: '锁车音效',
      description: '海量个性锁车音效免费在线试听和下载',
      theme_color: '#e94560',
      background_color: '#fef2f2',
      display: 'standalone',
      lang: 'zh-CN',
      start_url: '/',
      scope: '/',
      icons: [
        {
          src: '/favicon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any maskable',
        },
      ],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      title: '锁车音效分享平台 - 蔚来乐道L60 川A·BQ0326 见到请滴滴',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Nunito:wght@400;600;700;800&display=swap' },
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
        { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: '' },
      ],
      meta: [
        { name: 'description', content: '锁车音效分享平台，海量个性锁车音效免费在线试听和下载。收录哪吒、蜡笔小新、变形金刚、马里奥等650+款热门锁车音效，支持分类筛选和播放。' },
        { name: 'keywords', content: '锁车音效,锁车声音,个性音效,锁车提示音,NFC音效' },
        { property: 'og:title', content: '锁车音效分享平台 - 蔚来乐道L60 川ABQ0326 见到请滴滴' },
        { property: 'og:description', content: '海量个性锁车音效免费试听下载，650+款热门音效每日更新' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '锁车音效' },
        { property: 'og:locale', content: 'zh_CN' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: '锁车音效分享平台' },
        { name: 'twitter:description', content: '海量个性锁车音效免费试听下载' },
        { name: 'robots', content: 'index, follow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },

  nitro: {
    compressPublicAssets: true,
  },
})
