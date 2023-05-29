import { defineStore } from 'pinia';

import { useUserStore } from '@/stores/userStore';

export interface Streamer {
  id: string;
  sac: boolean;
  online: boolean;
  description: string;
}

export interface StreamerTwitch {
  broadcaster_type: string;
  created_at: string;
  description: string;
  display_name: string;
  id: string;
  login: string;
  offline_image_url: string;
  online: boolean;
  profile_image_url: string;
  type: string;
  view_count: number;
}

export const useStreamersStore = defineStore('streamers', () => {
  const { getItems } = useDirectusItems();
  const streamers = ref<StreamerTwitch[]>([]);

  const fetchDirectusStreamers = async (): Promise<Streamer[]> => {
    try {
      return getItems<Streamer[]>({
        collection: 'streamers',
      });
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

  async function getStreamers(): Promise<globalThis.Ref<Streamer[]>> {
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
        (streamer) =>
          streamer.display_name.toLowerCase() === dStreamer.id.toLowerCase(),
      );

      // Update this streamer online status
      streamers.value[streamerId].online = dStreamer.online;
    });
    return data;
  }

  return { streamers, getStreamers };
});
