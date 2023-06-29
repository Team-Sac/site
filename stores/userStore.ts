import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useUserStore = defineStore('user', () => {
  const token = ref('');
  const expireIn = ref(0);

  const getToken = async () => {
    try {
      const res = await useFetch('/api/getBearerToken');
      const { data } = res;
      token.value = data.value.access_token;
      expireIn.value = data.value.expire_in;

      return token;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

  return { token, getToken };
});
