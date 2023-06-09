<template>
  <div id="streamer-list">
    <div id="button-streamer-list" :class="close ? 'close' : 'open'">
      <button @click="opening()">
        <i :class="close ? 'fa-users' : 'fa-times'" class="fas"></i>
      </button>
    </div>
    <div
      :class="close ? 'hidden' : ''"
      :hidden="close"
      class="container-streamer-list"
    >
      <SearchStreamer></SearchStreamer>
      <div
        v-for="streamer in streamers"
        :key="streamer"
        :class="streamer.online ? 'online' : 'offline'"
        class="element-streamer-list"
        @click="streamsStore.toggle(streamer.id)"
      >
        <img
          :alt="`image de profil ${streamer.id}`"
          :src="streamer.profile_image_url"
          class="icon-streamer-list"
        />
        <p class="name-streamer-list">{{ streamer.id }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Streamer, useStreamersStore } from '@/stores/streamersStore';
import { Ref } from 'vue';
import { useStreamsStore } from '~/stores/streamsStore';
import SearchStreamer from '~/components/search-streamer.vue';

export interface StreamerSearch {
  broadcaster_language: string;
  broadcaster_login: string;
  display_name: string;
  game_id: string;
  game_name: string;
  id: string;
  is_live: boolean;
  started_at: string;
  tag_ids: Array<string>;
  tags: Array<string>;
  thumbnail_url: string;
  title: string;
}

const emit = defineEmits(['changeSize']);

const streamersStore = useStreamersStore();
const streamsStore = useStreamsStore();

const streamers: Ref<Streamer[]> = ref();

onMounted(async () => {
  await streamersStore.getStreamers();
  streamers.value = streamersStore.streamers.sort(
    (x, y) => y.online - x.online,
  );
  if (streamsStore.streams.length === 0) {
    streamsStore.toggle(
      streamers.value[Math.floor(Math.random() * streamers.value.length)].id,
    );
  }
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
#button-streamer-list {
  @apply flex justify-end;
}

.open > button {
  @apply w-[10%];
}

.close > button {
  @apply w-full;
}

#streamer-list {
  @apply grid grid-rows-[30px,1fr] overflow-hidden;
}

.container-streamer-list {
  @apply flex flex-col overflow-y-auto overflow-x-hidden relative self-center;
}

.element-streamer-list {
  @apply flex items-center p-3 relative cursor-pointer hover:bg-gray-100 hover:shadow-lg rounded-lg;
}

.icon-streamer-list {
  @apply h-20 w-20 rounded-full object-cover mr-3;
}

.offline {
  @apply bg-gray-200 grayscale;
}

.hide,
.hidden {
  display: none;
}
</style>
