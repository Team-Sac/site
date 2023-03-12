<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";

const route = useRoute();

useHead({
  titleTemplate: () => {
    return route.path !== "/" ? `${ route.path.split("/")[1] } - Team Sac` : 'Team Sac';
  },
})


onMounted(async () => {
  const user = useDirectusUser();
  if (user.value) return;

  const {setToken} = useDirectusAuth();
  try {
    const {data: {access_token}} = await (await fetch(`${useDirectusUrl()}auth/refresh/`, {
      method: 'POST',
      credentials: 'include'
    })).json();

    setToken(access_token);
  } catch (e) {
    console.log(e);
  }
})
</script>
