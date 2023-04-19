<template>
  <div class="header">
    <NuxtLink to="/">Team Sac</NuxtLink>
    <NuxtLink to="/test">test</NuxtLink>
    <NuxtLink
      to="https://directus.teamsac.xyz/auth/login/twitch?redirect=http://localhost:3000"
    >
      <i class="fab fa-twitch"></i>
      Login
    </NuxtLink>
    <button @click="login">login</button>
    <button @click="logout">logout</button>
  </div>
</template>

<script lang="ts" setup>
import { DirectusUser } from 'nuxt-directus/dist/runtime/types';

async function login() {
  const { setUser } = useDirectusAuth();

  const userToken: DirectusUser = (
    await (
      await fetch('https://directus.teamsac.xyz/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      })
    ).json()
  ).data;

  setUser(userToken);
}

const { logout } = useDirectusAuth();
</script>

<style scoped>
.header {
  @apply flex justify-around bg-white;
}
</style>
