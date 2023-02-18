// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Team Sac",
      charset: "utf8"
    },
  },
  ssr: true,
  modules: [
    'nuxt-windicss',
    'nuxt-directus',
  ],
  directus: {
    url: 'https://directus.teamsac.xyz/'
  }
})
