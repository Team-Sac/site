<template>
  <div>
    <div id="button-list-streamer">
      <button @click="opening()">
        <i :class="close ? 'fa-users' : 'fa-times'" class="fas"></i>
      </button>
    </div>
    <div :hidden="close">
      <p>Liste Streamers</p>
      <div class="streamerlist-wrapper"></div>
      <div class="streamerlist-container">
        <div
          v-for="streamer in streamers"
          :key="streamer"
          :class="{ isOnline: !streamer.online }"
          class="streamerlist-element"
        >
          <img
            :alt="`image de profil ${streamer.display_name}`"
            :src="streamer.profile_image_url"
            class="streamerlist-icon"
          />
          <span v-if="streamer.online" class="streamerlist-online">LIVE</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStreamersStore } from '@/stores/streamersStore';

const emit = defineEmits(['changeSize']);

const streamersStore = useStreamersStore();

const streamers = ref();

onMounted(async () => {
  await streamersStore.getStreamers();
  streamers.value = streamersStore.streamers.sort(
    (x, y) => y.online - x.online,
  );
});

const close = ref(false);
const opening = () => {
  close.value = !close.value;
  emit('changeSize', {
    element: 'list',
    type: close.value ? 'close' : 'open',
  });
};
</script>

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
