import { defineStore } from 'pinia';
// eslint-disable-next-line import/extensions
import { useUserStore } from '@/stores/userStore';

export interface Streamer {
  id: string;
  sac: boolean;
  online: boolean;
}

export const useStreamersStore = defineStore('streamers', () => {
  const { getItems } = useDirectusItems();
  const fetchDirectusStreamers = async (): Promise<Streamer[]> => {
    try {
      return getItems<Streamer[]>({
        collection: 'streamers',
      });
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

  async function getStreamers() {
    const directusStreamers = await fetchDirectusStreamers();
    const streamersNames = directusStreamers.map((streamer) => streamer.id);
    const { getToken } = useUserStore();

    const token = await getToken();

    console.log(token.value);

    const res = await useFetch('/api/getTwitchStreamers', {
      method: 'POST',
      body: {
        bearer: token.value,
        streamersNames,
      },
    });
    const { data } = res;
    console.log(data);
    return data;
  }

  return { getStreamers };
});
