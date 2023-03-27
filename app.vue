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
  const user = useDirectusUser();
  if (user.value) return;

  const { setToken } = useDirectusAuth();
  try {
    const { data } = await (
      await fetch(`${useDirectusUrl()}auth/refresh/`, {
        method: 'POST',
        credentials: 'include',
      })
    ).json();

    if (data === undefined) return;

    setToken(data.access_token);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
});
</script>
