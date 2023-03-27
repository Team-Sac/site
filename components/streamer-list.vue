<script lang="ts" setup>
const { getItems } = useDirectusItems();
const router = useRouter();

interface Streamer {
  id?: string | number;
  sac: boolean;
  online: boolean;
}

const fetchStreamers = async () => {
  try {
    // var filters = { content: "testcontent", title: "Test1" };
    return await getItems<Streamer>({
      collection: 'streamers',
    });
  } catch (e) {}
};

const streamers = await fetchStreamers();
</script>
<template>
  <p>Liste Streamers</p>
</template>
<style scoped></style>
