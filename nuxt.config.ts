export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  vite: {
    server: {
      hmr: {
        port: 3000, // Or whatever port you want to use
      }
    }
  },
  routeRules: {
    '/**': {},
  },
});
