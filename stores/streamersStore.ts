import { defineStore } from 'pinia';
// eslint-disable-next-line import/extensions
import { useUserStore } from '@/stores/userStore';

export interface Streamer {
  id: string;
  sac: boolean;
  online: boolean;
}

export const useStreamersStore = defineStore('streamers', () => {
  const streamers = ref<Streamer[]>([]);

  async function getStreamers() {
    const { getToken } = useUserStore();

    const token = await getToken();

    console.log(token.value);
  }

  return { streamers, getStreamers };
});
