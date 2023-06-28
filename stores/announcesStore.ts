import { defineStore } from 'pinia';

export interface Announce {
  id: number;
  title: string;
  content: string;
  url: string;
  date_created: string;
}

export const useAnnouncesStore = defineStore('announces', () => {
  const { getItems, createItems, updateItem, deleteItems } = useDirectusItems();

  const announces = ref<Announce[]>([]);

  const fetchAnnounces = async () => {
    try {
      announces.value = await getItems<Announce[]>({
        collection: 'announces',
      });
    } catch (e) {}
  };

  const getAnnounce = (id: number): Announce =>
    announces.value.find((announce) => announce.id === id);

  const createAnnounce = async ({
    title,
    content,
    url,
  }: {
    title: string;
    content?: string;
    url?: string;
  }) => {
    try {
      await createItems<Announce>({
        collection: 'announces',
        items: [
          {
            title,
            content,
            url,
          },
        ],
      });
    } catch (e) {}

    await fetchAnnounces();
  };

  const updateAnnounce = async ({
    id,
    title,
    content,
    url,
  }: {
    id: number;
    title: string;
    content?: string;
    url?: string;
  }) => {
    try {
      await updateItem<Announce>({
        id,
        collection: 'announces',
        item: {
          title,
          content,
          url,
        },
      });
    } catch (e) {}

    await fetchAnnounces();
  };

  const deleteAnnounce = async (id: number) => {
    try {
      await deleteItems({
        collection: 'announces',
        items: [id.toString()],
      });
    } catch (e) {}

    await fetchAnnounces();
  };

  return {
    announces,
    fetchAnnounces,
    getAnnounce,
    createAnnounce,
    updateAnnounce,
    deleteAnnounce,
  };
});
