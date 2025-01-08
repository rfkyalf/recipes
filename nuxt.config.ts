// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/icon',
    'nuxt-svgo',
    '@nuxtjs/google-fonts',
  ],
  image: {
    dir: 'assets',
    domains: ['www.masakapahariini.com'],
    format: ['webp'],
  },
  googleFonts: {
    families: {
      Montserrat: true,
      Lobster: true,
    },
    display: 'swap',
  },
  tailwindcss: {
    config: {
      theme: {
        fontFamily: {
          montserat: 'Montserrat',
          lobster: 'Lobster',
        },
      },
    },
  },
});
