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
  streamers.value = streamersStore.streamers.sort(
    (x, y) => y.online - x.online,
  );
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
        :class="{ isOnline: !streamer.online }"
      >
        <img
          :src="streamer.profile_image_url"
          :alt="`image de profil ${streamer.display_name}`"
          class="streamerlist-icon"
        />
        <span v-if="streamer.online" class="streamerlist-online">LIVE</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.streamerlist-wrapper {
  @apply h-screen flex items-center;
}
.streamerlist-container {
  @apply h-[70%] overflow-auto flex flex-col gap-y-6;
}
.streamerlist-icon {
  @apply rounded-full w-20 h-20;
}
.streamerlist-element {
  @apply relative;
}
.streamerlist-element.isOnline .streamerlist-icon {
  @apply border-4 border-white;
}
.streamerlist-online {
  @apply absolute -bottom-2.5 left-1/2 -translate-x-1/2;
}
</style>
