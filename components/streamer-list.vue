<script lang="ts" setup>
import { useStreamersStore } from '@/stores/StreamersStore.ts';

const streamerStore = useStreamersStore();

const { getItems } = useDirectusItems();
const router = useRouter();

interface Streamer {
  id?: string | number;
  sac: boolean;
  online: boolean;
}

const token = useDirectusToken();
const user = useDirectusUser();

const fetchStreamers = async () => {
  try {
    return await getItems<Streamer>({
      collection: 'streamers',
    });
  } catch (e) {}
};

const streamers = await fetchStreamers();

console.log(await streamerStore.getStreamers());
</script>
<template>
  <p>Liste Streamers</p>
  <!-- <div v-for="streamer in streamers">
    {{ streamer.id }} - {{ streamer.online ? 'En ligne' : 'Hors ligne' }}
  </div> -->
</template>
<style scoped></style>
