import { defineStore } from 'pinia';
import { useUserStore } from '~/stores/userStore';

export interface Streamer {
  id: string;
  sac: boolean;
  online: boolean;
  description: string;
  profile_image_url: string;
  users: number[];
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
  const { getItems, updateItem } = useDirectusItems();
  const user = useDirectusUser();
  const { updateUser } = useDirectusUsers();
  const streamers = ref<Streamer[]>([]);
  const sacs = ref<Streamer[]>([]);

  const fetchDirectusStreamers = async (): Promise<Streamer[]> => {
    try {
      streamers.value = await getItems<Streamer[]>({
        collection: 'streamers',
      });
      sacs.value = streamers.value.filter((streamer) => streamer.sac);
    } catch (e) {
      throw new Error((e as Error).message);
    }
    return streamers.value;
  };

  const followDirectusStreamer = async ({
    streamerName,
    thumbnailURL,
  }: {
    streamerName: string;
    thumbnailURL: string;
  }): Promise<Streamer[]> => {
    if (
      streamers.value.some(
        (streamer) => streamer.id.toLowerCase() === streamerName.toLowerCase(),
      )
    ) {
      return streamers.value;
    }

    if (!user.value) return streamers.value;

    try {
      await updateUser({
        id: user.value.id,
        user: {
          streamers: {
            create: [
              {
                streamers_id: {
                  id: streamerName,
                  profile_image_url: thumbnailURL,
                },
              },
            ],
            update: [],
            delete: [],
          },
        },
      });
      await fetchDirectusStreamers();
    } catch (e) {
      throw new Error((e as Error).message);
    }

    return streamers.value;
  };

  const unfollowDirectusStreamer = async ({
    streamerRelationId,
  }: {
    streamerRelationId: string;
  }): Promise<Streamer[]> => {
    if (!user.value) return streamers.value;

    try {
      await updateUser({
        id: user.value.id,
        user: {
          streamers: {
            create: [],
            update: [],
            delete: [streamerRelationId],
          },
        },
      });
      await fetchDirectusStreamers();
    } catch (e) {
      throw new Error((e as Error).message);
    }

    return streamers.value;
  };

  const updateStreamers = async (streamersNames: string[]) => {
    try {
      const { getToken } = useUserStore();

      const token = await getToken();

      const { data } = await useFetch('/api/getTwitchStreamers', {
        method: 'POST',
        body: {
          bearer: token.value,
          streamersNames,
        },
      });
      // @ts-ignore
      const res = data.value?.data.map((streamer: Streamer) => streamer);

      res.map(async (streamer: StreamerTwitch) => {
        await updateItem({
          collection: 'streamers',
          id: streamer.display_name,
          item: {
            description: streamer.description,
            profile_image_url: streamer.profile_image_url,
          },
        });
      });
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

  const getStreamers = async () => {
    if (streamers.value.length === 0) {
      streamers.value = await fetchDirectusStreamers();
    }

    return streamers;
  };

  return {
    streamers,
    sacs,
    fetchDirectusStreamers,
    followDirectusStreamer,
    unfollowDirectusStreamer,
    getStreamers,
    updateStreamers,
  };
});
