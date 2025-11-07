// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  app: {
    head: {
      htmlAttrs: {
        dir: 'rtl',
        lang: 'ar',
      },
      title: 'بوابة طلبات التصاريح',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'بوابة طلبات التصاريح - تقديم ومتابعة طلبات التصاريح',
        },
      ],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    // Private keys (only available on server-side)
    backendUrl: process.env.BACKEND_URL || 'http://localhost:3001',

    // Public keys (exposed to client-side)
    public: {
      apiBase: '/api',
    },
  },
});
