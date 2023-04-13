<template>
  <div>
    <TwitchStream
      v-for="stream in streams"
      :key="stream"
      :streamer="stream"
    ></TwitchStream>
  </div>
</template>

<script lang="ts" setup>
import { useStreamsStore } from '~/stores/streamsStore';

const { streams } = useStreamsStore();
</script>

<style scoped>
div {
  @apply grid grid-cols-[repeat(auto-fit,minmax(33rem,1fr))] items-center;
}
</style>
