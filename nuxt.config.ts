// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxt/icon', 'nuxt-svgo'],
  image: {
    dir: 'assets/images',
    domains: ['www.masakapahariini.com'],
    format: ['webp'],
  },
});
