import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useStreamsStore = defineStore('streams', () => {
  const streams = ref<string[]>(['deuxlames', 'jeykon_']);

  return { streams };
});
