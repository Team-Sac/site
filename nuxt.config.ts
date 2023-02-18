// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    'nuxt-windicss',
    'nuxt-directus',
  ],
  directus: {
    url: 'https://directus.teamsac.xyz/'
  }
})
