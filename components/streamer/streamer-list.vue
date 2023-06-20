<template>
  <div id="streamer-list">
    <div id="button-streamer-list" :class="close ? 'close' : 'open'">
      <button @click="opening()">
        <i :class="close ? 'fa-users' : 'fa-times'" class="fas"></i>
      </button>
    </div>
    <div :class="close ? '!hidden' : ''" class="container-streamer-list">
      <StreamerSearchStreamer v-if="hasRight"></StreamerSearchStreamer>
      <div class="streamers">
        <div
          v-for="streamer in streamers"
          :key="streamer"
          :class="streamer.online ? 'online' : 'offline'"
          class="element-streamer-list"
          @click.self="streamsStore.toggle(streamer.id)"
        >
          <img
            :alt="`image de profil ${streamer.id}`"
            :src="streamer.profile_image_url"
            class="icon-streamer-list"
          />
          <p class="name-streamer-list">{{ streamer.id }}</p>
          <button
            v-if="!streamer.sac"
            class="unfollow-streamer"
            @click="removeFollowedStreamer(streamer.users[0])"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStreamersStore } from '~/stores/streamersStore';
import { useStreamsStore } from '~/stores/streamsStore';
import { DirectusUser } from 'nuxt-directus/dist/runtime/types';

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

const streamers = computed(() => streamersStore.streamers);

onMounted(async () => {
  await streamersStore.getStreamers();
  streamers.value.sort((x, y) => y.online - x.online);
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

const user = computed<DirectusUser>(() => useDirectusUser().value);

const hasRight = computed(() =>
  [
    'e5c8b057-49ff-4781-af76-ab555f5a0465',
    'bdb50fa6-c41d-4b5f-8d23-91d4f3748533',
  ].includes(user.value?.role),
);

const removeFollowedStreamer = async (streamerRelationId: string) => {
  await streamersStore.unfollowDirectusStreamer({
    streamerRelationId,
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
  @apply grid grid-rows-[30px,1fr] overflow-hidden pr-0.5;
}

.container-streamer-list {
  @apply grid grid-rows-[minmax(30px,auto),1fr] overflow-hidden;
}

.streamers {
  @apply flex flex-col overflow-y-auto overflow-x-hidden relative self-center h-full;
}

.element-streamer-list {
  @apply grid grid-cols-[5rem,1fr,20px] items-center p-1 relative cursor-pointer hover:opacity-75 hover:shadow-lg;
}

.icon-streamer-list {
  @apply h-20 w-20 object-cover mr-3 rounded;
}

.name-streamer-list {
  @apply overflow-hidden text-ellipsis pl-2;
}

.unfollow-streamer {
  @apply w-full hover:bg-gray-600 hover:rounded;
}

.element-streamer-list:has(.unfollow-streamer:hover) {
  @apply hover:opacity-100;
}
</style>
