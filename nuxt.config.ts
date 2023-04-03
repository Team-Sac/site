// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Les Sacs',
      charset: 'utf8',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://use.fontawesome.com/releases/v5.15.4/css/all.css',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/logo_team_sac.png',
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
    twitchClientId: 'twitch_client_id',
    twitchClientSecret: 'twitch_client_secret',
  },
});
