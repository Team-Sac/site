<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();

useHead({
  titleTemplate() {
    return route.path !== '/'
      ? `${route.path.split('/')[1]} - Team Sac`
      : 'Team Sac';
  },
});

onMounted(async () => {
  const { setToken } = useDirectusAuth();
  try {
    const { data } = await (
      await fetch(`${useDirectusUrl()}auth/refresh/`, {
        method: 'POST',
        credentials: 'include',
      })
    ).json();

    if (data === undefined) return;
    setToken(data.access_token, data.refresh_token, data.expires);
  } catch (e) {}
});
</script>

<style scoped>
NuxtPage {
  @apply h-screen w-screen;
}
</style>
