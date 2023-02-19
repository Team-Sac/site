<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute();

useHead({
  titleTemplate: () => {
    return route.path !== "/" ? `${ route.path.split("/")[1] } - Team Sac` : 'Team Sac';
  },
})
</script>
