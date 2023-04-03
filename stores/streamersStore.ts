import { defineStore } from 'pinia';
// eslint-disable-next-line import/extensions
import { useUserStore } from '@/stores/userStore';

// eslint-disable-next-line import/prefer-default-export
export const useStreamersStore = defineStore('streamers', () => {
  const bearer = ref({});

  async function getStreamers() {
    const { getToken } = useUserStore();

    const token = await getToken();

    console.log(token.value);
  }

  return { bearer, getStreamers };
});
