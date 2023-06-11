<template>
  <div class="search">
    <label for="streamer-search"
      >Streamer
      <input
        id="streamer-search"
        v-model="searchText"
        name="streamer-search"
        type="text"
        @keyup="searchChannels"
      />
    </label>
    <div id="channel-list">
      <div
        v-for="streamer in searchResult"
        :key="streamer.id"
        class="searchResult"
        @click="addFollowedStreamer(streamer.display_name)"
      >
        <img :alt="streamer.display_name" :src="streamer.thumbnail_url" />
        <p>
          {{ streamer.display_name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';
import { useUserStore } from '~/stores/userStore';
import { StreamerSearch } from '~/components/streamer-list.vue';
import { useStreamersStore } from '~/stores/streamersStore';

const searchText = ref('');
const searchResult: Ref<StreamerSearch[]> = ref<StreamerSearch>();

const { getToken } = useUserStore();
const token = await getToken();

const searchChannels = useDebounceFn(async () => {
  const { data } = await useFetch('/api/searchTwitchChannels', {
    method: 'POST',
    body: {
      bearer: token.value,
      query: searchText.value,
    },
  });
  searchResult.value = data.value.data;
}, 500);

const { updateDirectusStreamer } = useStreamersStore();

const addFollowedStreamer = async (streamerName: string) => {
  await updateDirectusStreamer(streamerName);
};
</script>

<style scoped>
.search {
  @apply relative;
}
#channel-list {
  @apply absolute z-10 bg-white w-full overflow-x-auto;
}
.searchResult {
  @apply grid grid-cols-[50px,1fr];
}
img {
  @apply object-cover;
}
p {
  @apply text-center self-center;
}
</style>
