<script lang="ts" setup>
/* const streamerStore = useStreamersStore();

streamerStore.getStreamers(); */

/* const { getItems } = useDirectusItems();

interface Streamer {
  id?: string | number;
  sac: boolean;
  online: boolean;
} */

// const token = useDirectusToken();
// const user = useDirectusUser();

/* const fetchStreamers = async () => {
  try {
    return await getItems<Streamer>({
      collection: 'streamers',
    });
  } catch (e) {
    throw new Error(e);
  }
}; */

// const streamers = await fetchStreamers();

// console.log(await streamerStore.getStreamers());

import { useStreamersStore } from '@/stores/streamersStore';

const streamersStore = useStreamersStore();

const streamers = ref();

onMounted(async () => {
  const res = await streamersStore.getStreamers();
  streamers.value = streamersStore.streamers;
  console.log(streamers.value);
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
