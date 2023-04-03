import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useStreamersStore = defineStore('streamers', () => {
  const bearer = ref({});

  async function getStreamers() {
    /* await useAsyncData('getBearer', () => $fetch('/api/getBearerToken')).then(
      (res) => {
        bearer.value = res.data.value.access_token;
      }
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
  } */
    // TODO: Move it to a userStore
    // const test = console.log(test.data.value);
    /* return useFetch('/api/getStreamers', {
      method: 'POST',
      body: {
        bearerToken: bearer.value,
      },
    }); */
  }

  return { bearer, getStreamers };
});
