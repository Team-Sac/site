<template>
  <div class="about">
    <div v-for="sac in sacs" :key="sac.id">
      <h2>{{ sac.id }}</h2>
      <p>{{ sac.description }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Streamer, useStreamersStore } from '~/stores/streamersStore';

const streamersStore = useStreamersStore();

await streamersStore.fetchDirectusStreamers();
const sacs = await computed<Streamer[]>(() => streamersStore.sacs);
</script>

<style scoped></style>
