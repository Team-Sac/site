import { defineStore } from 'pinia';

export const useStreamersStore = defineStore('streamers', () => {
  const bearer = ref(null);
  async function getStreamers() {
    await useAsyncData('getBearer', () => $fetch('/api/getBearerToken')).then(
      (res) => {
        bearer.value = res.data.value.access_token;
      },
    );
    console.log(bearer.value);

    const streamers = await fetch('http://localhost:3000/api/getStreamers', {
      method: 'POST',
      body: {
        bearerToken: bearer.value,
      },
    });
    console.log(streamers);
    return streamers;
  }

  return { getStreamers };
});
