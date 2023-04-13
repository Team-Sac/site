<script lang="ts" setup>
import { useStreamersStore } from '@/stores/streamersStore';

const streamersStore = useStreamersStore();

const streamers = ref();

onMounted(async () => {
  const res = await streamersStore.getStreamers();
  streamers.value = streamersStore.streamers;
});
</script>
<template>
  <p>Liste Streamers</p>
  <div class="streamerlist-wrapper">
    <div class="streamerlist-container">
      <div
        v-for="streamer in streamers"
        :key="streamer"
        class="streamerlist-element"
      >
        <img
          :src="streamer.profile_image_url"
          :alt="`image de profil ${profile_image_url}`"
          class="streamerlist-icon"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.streamerlist-wrapper {
  @apply h-screen flex items-center;
}
.streamerlist-container {
  @apply max-h-[70%] overflow-auto flex flex-col space-y-7;
}
.streamerlist-icon {
  @apply rounded-full w-20 h-20;
}
</style>
