<template>
  <div class="header">
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
    <div v-if="width >= 960" class="links">
      <NuxtLink id="link-home" class="link" to="/">Home</NuxtLink>
      <NuxtLink id="link-announce" class="link" to="announce"
        >Annonces</NuxtLink
      >
      <NuxtLink id="link-about" class="link" to="about"
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
      <NuxtLink
        v-if="!refreshToken"
        class="button"
        to="https://directus.teamsac.xyz/auth/login/twitch?redirect=http://localhost:3000"
      >
        <i class="fab fa-twitch"></i>
        Login
      </NuxtLink>
      <button v-else class="button" @click="logout">
        <i class="fab fa-twitch"></i>
        Logout
      </button>
    </div>
    <div v-else>
      <button id="menu-burger">
        <i class="fas fa-bars fa-lg"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';

const { refreshToken } = useDirectusToken();
const { logout } = useDirectusAuth();

const { width } = useWindowSize();
</script>

<style scoped>
#team-sac-logo {
  @apply h-full w-full;
}
#logo-home {
  @apply h-full;
}
a {
  @apply cursor-pointer;
}

.header {
  @apply flex h-36 justify-between items-center gap-12 p-0 px-16 py-8;
}

.links {
  @apply flex justify-center items-center gap-[25px];
}

.link {
  @apply font-heading text-[25px] tracking-[0.45px] leading-[16px];
}

#link-home {
  @apply text-secondary-100;
}

#link-announce {
  @apply text-gray-50;
}

#link-about {
  @apply text-white;
}

.button {
  @apply bg-gray-800 rounded-3xl h-full text-center px-5 py-1.5 tracking-[0.45px] text-white;
}

#discord-button {
  @apply flex gap-[5px] items-center;
}

#menu-burger > i {
  @apply text-secondary-100 h-full;
}
</style>
