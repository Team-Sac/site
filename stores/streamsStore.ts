import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useStreamsStore = defineStore('streams', () => {
  const streams = ref<string[]>(['Cannonbark', 'DeuxLames']);

  const add = (streamer: string) => {
    streams.value.push(streamer);
  };

  const remove = (streamer: string) => {
    streams.value.splice(streams.value.indexOf(streamer), 1);
  };

  const toggle = (streamer: string) => {
    if (streams.value.includes(streamer)) {
      remove(streamer);
    } else {
      add(streamer);
    }
  };

  return {
    streams,
    add,
    remove,
    toggle,
  };
});
