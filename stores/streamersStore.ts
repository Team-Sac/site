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
  const streamers = ref<Streamer[]>([]);

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

    const res = await useFetch('/api/getTwitchStreamers', {
      method: 'POST',
      body: {
        bearer: token.value,
        streamersNames,
      },
    });
    const { data } = await res;
    streamers.value = data.value.data;
    streamers.value.forEach((streamer, index) => {
      directusStreamers.forEach((dStreamer) => {
        if (dStreamer.id === streamer.display_name) {
          streamers.value[index].online = dStreamer.online;
        }
      });
    });
    return data;
  }

  return { streamers, getStreamers };
});
