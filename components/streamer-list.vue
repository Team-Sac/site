<script lang="ts" setup>
/* const streamerStore = useStreamersStore();

streamerStore.getStreamers(); */

/* const { getItems } = useDirectusItems();

interface Streamer {
  id: string;
  sac: boolean;
  online: boolean;
} */

// const token = useDirectusToken();
// const user = useDirectusUser();

/*
const fetchStreamers = async () => {
  try {
    return await getItems<Streamer>({
      collection: 'streamers',
    });
  } catch (e) {
    throw new Error(e);
  }
};
*/

// const streamers = await fetchStreamers();

// console.log(await streamerStore.getStreamers());

// eslint-disable-next-line import/extensions
import { useStreamersStore } from '@/stores/streamersStore';

const streamersStore = useStreamersStore();

streamersStore.getStreamers();
</script>
<template>
  <p>Liste Streamers</p>
  <!-- <div v-for="streamer in streamers">
    {{ streamer.id }} - {{ streamer.online ? 'En ligne' : 'Hors ligne' }}
  </div> -->
</template>
<style scoped></style>
