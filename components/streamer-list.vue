<script lang="ts" setup>
import { useStreamersStore } from '@/stores/streamersStore';

const streamersStore = useStreamersStore();

streamersStore.getStreamers();
</script>
<template>
  <p>Liste Streamers</p>
  <div v-for="streamer in streamers">
    {{ streamer.id }} - {{ streamer.online ? 'En ligne' : 'Hors ligne' }}
  </div>
</template>
<style scoped></style>
