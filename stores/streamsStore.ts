import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useStreamsStore = defineStore('streams', () => {
  const streams = ref<string[]>([]);

  const add = (streamer: string) => {
    if (streams.value.length > 9) {
      throw new Error('Max number of streamer remove one');
    }
    streams.value.push(streamer);
  };

  const remove = (streamer: string) => {
    if (!streams.value.includes(streamer)) {
      throw new Error('Streamer not in streams lists');
    }
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
