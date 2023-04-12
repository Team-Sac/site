import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useStreamsStore = defineStore('streams', () => {
  const streams = ref<string[]>([]);

  const add = (streamer: string) => {
    streams.value.push(streamer);
  };

  const remove = (streamer: string) => {
    streams.value.splice(streams.value.indexOf(streamer), 1);
  };

  return { streams, add, remove };
});
