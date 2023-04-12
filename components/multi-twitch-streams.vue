<template>
  <div>
    <TwitchStream
      v-for="(stream, key) in streams"
      :key="key"
      :streamer="stream"
    ></TwitchStream>
  </div>
</template>

<script lang="ts" setup>
import { useStreamsStore } from '~/stores/streamsStore';

const streamsStore = useStreamsStore();
const { streams } = streamsStore;
</script>

<style scoped></style>
