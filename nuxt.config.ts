// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Les Sacs',
      charset: 'utf8',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css',
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
    twitchClientId: '',
    twitchClientSecret: '',
    twitchTransportSecret: '',
    directusSecretKey: '',
    public: {
      protocol: 'http://',
      siteURL: 'localhost',
      port: ':3000',
    },
  },
});
