// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Team Sac',
      charset: 'utf8',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://use.fontawesome.com/releases/v5.15.4/css/all.css',
        },
      ],
    },
  },
  ssr: true,
  modules: [
    'nuxt-directus',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  directus: {
    url: 'https://directus.teamsac.xyz/',
  },
  runtimeConfig: {
    twitchClientId: process.env.NUXT_TWITCH_CLIENT_ID || 'twitch_client_id',
    twitchClientSecret:
      process.env.NUXT_TWITCH_CLIENT_SECRET || 'twitch_client_secret',
  },
});
