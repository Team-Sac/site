<template>
  <div class="header">
    <NuxtLink to="/">
      <img id="team-sac-logo" alt="Logo Team Sac" src="/logo_team_sac.png" />
    </NuxtLink>
    <NuxtLink to="about">Qui sommes-nous ?</NuxtLink>
    <NuxtLink to="announce">Annonces</NuxtLink>
    <NuxtLink target="_blank" to="https://discord.gg/32HZP9qrnV">
      <i class="fab fa-discord"></i>
      Discord
    </NuxtLink>
    <NuxtLink
      v-if="!refreshToken"
      to="https://directus.teamsac.xyz/auth/login/twitch?redirect=http://localhost:3000"
    >
      <i class="fab fa-twitch"></i>
      Login
    </NuxtLink>
    <button v-else @click="logout">
      <i class="fab fa-twitch"></i>
      Logout
    </button>
  </div>
</template>

<script lang="ts" setup>
const { refreshToken } = useDirectusToken();
const { logout } = useDirectusAuth();
</script>

<style scoped>
a {
  @apply cursor-pointer;
}

.header {
  @apply flex justify-around bg-white items-center;
}

#team-sac-logo {
  @apply w-auto max-h-10;
}
</style>
