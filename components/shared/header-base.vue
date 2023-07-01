<template>
  <div class="header">
    <div v-if="linksOpen" class="menu-background"></div>
    <NuxtLink id="logo-home" to="/">
      <img
        id="team-sac-logo"
        alt="Logo Team Sac"
        class="logo"
        height="810"
        src="/logo_team_sac.png"
        width="1089"
      />
    </NuxtLink>
    <div v-if="width >= 1024 || linksOpen" class="links">
      <NuxtLink
        id="link-home"
        :class="isActualRoute('index')"
        class="link"
        to="/"
        >Home</NuxtLink
      >
      <NuxtLink
        id="link-announce"
        :class="isActualRoute('announce')"
        class="link"
        to="announce"
        >Annonces</NuxtLink
      >
      <NuxtLink
        id="link-about"
        :class="isActualRoute('about')"
        class="link"
        to="about"
        >Qui sommes-nous ?</NuxtLink
      >
      <NuxtLink
        id="discord-button"
        class="button"
        target="_blank"
        to="https://discord.gg/32HZP9qrnV"
      >
        <i class="fab fa-discord"></i>
        <p>Rejoindre le Discord</p>
      </NuxtLink>
      <div v-if="width >= 1024">
        <NuxtLink
          v-if="!token"
          id="login-button"
          :to="`https://directus.teamsac.xyz/auth/login/twitch?redirect=${
            runtimeConfig.public.protocol +
            runtimeConfig.public.siteURL +
            runtimeConfig.public.port
          }`"
          class="button"
        >
          <i class="fab fa-twitch"></i>
          Login
        </NuxtLink>
        <button v-else class="button" @click="logout">
          <i class="fab fa-twitch"></i>
          Logout
        </button>
      </div>
    </div>
    <div v-if="width < 1024" class="relative">
      <button id="menu-burger" @click="openLinks">
        <i v-if="linksOpen" class="fas fa-times fa-lg"></i>
        <i v-else class="fas fa-bars fa-lg"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';

const runtimeConfig = useRuntimeConfig();

const { token } = useDirectusToken();

const { width } = useWindowSize();

const linksOpen = ref<boolean>(false);

const openLinks = () => {
  linksOpen.value = !linksOpen.value;
};

const route = useRoute();

watch(
  route,
  () => {
    linksOpen.value = false;
  },
  { deep: true, immediate: true },
);

const isActualRoute = (pathName: string): string => {
  if (route.name === pathName) return '!text-secondary-100';
  return '';
};

const logout = () => {
  token.value = null;
};
</script>

<style scoped>
#team-sac-logo {
  @apply h-full w-full;
}
#logo-home {
  @apply z-10 relative h-[5rem] lg:h-full;
}

a {
  @apply cursor-pointer;
}

.header {
  @apply relative flex h-36 justify-between lg:items-center gap-12 p-0 px-16 py-8;
}

.menu-background {
  @apply z-10 absolute h-screen w-screen top-0 left-0 bg-gray-900 opacity-60;
}

.links {
  @apply z-10 absolute lg:relative w-full lg:w-auto flex flex-col lg:flex-row justify-center items-center gap-[25px] top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] lg:top-auto lg:left-auto lg:translate-x-0 lg:translate-y-0 py-16;
}

.link {
  @apply font-heading text-[25px] tracking-[0.45px] leading-[16px] text-white hover:!text-secondary-50;
}

#link-about {
  @apply text-white;
}

.button {
  @apply px-5 bg-gray-800 rounded-3xl lg:h-full text-center lg:px-5 py-1.5 tracking-[0.45px] text-white hover:bg-opacity-60;
}

#discord-button {
  @apply flex gap-[5px] items-center;
}

#login-button {
  @apply flex gap-[5px] items-center;
}

#menu-burger {
  @apply z-10 relative;
}

#menu-burger > i {
  @apply text-secondary-100 h-full;
}
</style>
