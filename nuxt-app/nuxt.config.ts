// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        dir: 'rtl',
        lang: 'ar',
      },
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
