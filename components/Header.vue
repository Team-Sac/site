<template>
  <div class="header">
    <NuxtLink to="/">Team Sac</NuxtLink>
    <NuxtLink to="/test">test</NuxtLink>
    <NuxtLink to="https://directus.teamsac.xyz/auth/login/twitch?redirect=http://localhost:3000">
      <i class="fab fa-twitch"></i>
      Login
    </NuxtLink>
    <button v-on:click="login">login</button>
    <button v-on:click="logout">logout</button>
  </div>
</template>

<script lang="ts" setup>

import {DirectusUser} from "nuxt-directus/dist/runtime/types";

async function login() {
  const {setUser} = useDirectusAuth();

  const login: DirectusUser = (await (await fetch('https://directus.teamsac.xyz/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  })).json()).data;
  console.log(login);
  setUser(login);

  const user = useDirectusUser();

  console.log(user.value);
}

const {logout} = useDirectusAuth();


</script>

<style scoped>
.header {
  @apply flex justify-around;
}
</style>
