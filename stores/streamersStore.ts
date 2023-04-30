import { defineStore } from 'pinia';

import { useUserStore } from '@/stores/userStore';

export interface Streamer {
  id: string;
  sac: boolean;
  online: boolean;
}

export const useStreamersStore = defineStore('streamers', () => {
  const { getItems } = useDirectusItems();
  const streamers = ref<Streamer[]>([]);

  const filters = { sac: true };
  const fetchDirectusStreamers = async (): Promise<Streamer[]> => {
    try {
      return getItems<Streamer[]>({
        collection: 'streamers',
        params: {
          filter: filters,
        },
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
    directusStreamers.forEach((dStreamer) => {
      // Get id of streamer in streamers array
      const streamerId = streamers.value.findIndex(
        (streamer) => streamer.display_name.toLowerCase() === dStreamer.id.toLowerCase(),
      );
      // Update this streamer online status
      streamers.value[streamerId].online = dStreamer.online;
    });
    return data;
  }

  return { streamers, getStreamers };
});
