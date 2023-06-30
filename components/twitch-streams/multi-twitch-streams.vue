<template>
  <div id="multi-twitch-streams" :class="`grid${streams.length}`">
    <twitch-stream
      v-for="stream in streams"
      :key="stream"
      :streamer="stream"
    ></twitch-stream>
  </div>
</template>

<script lang="ts" setup>
import { useStreamsStore } from '~/stores/streamsStore';

const { streams } = useStreamsStore();
</script>

<style scoped>
#multi-twitch-streams {
  @apply h-full w-full grid content-center justify-center;
}

.grid1 {
  @apply grid-cols-[1fr] grid-rows-1;
}

.grid2 {
  @apply grid-rows-2 grid-cols-[1fr];
}

.grid3 {
  @apply grid-cols-4 grid-rows-2;
}
.grid3 :nth-child(n) {
  @apply col-span-2;
}
.grid3 :nth-child(3) {
  @apply col-start-2 col-span-2;
}

.grid4 {
  @apply grid-cols-2 grid-rows-2;
}

.grid5 {
  @apply grid-cols-6 grid-rows-2;
}
.grid5 :nth-child(n) {
  @apply col-span-2;
}
.grid5 :nth-child(4) {
  @apply col-start-2 col-span-2;
}
.grid5 :nth-child(5) {
  @apply col-start-4 col-span-2;
}

.grid6 {
  @apply grid-cols-3 grid-rows-2;
}

.grid7 {
  @apply grid-cols-6 grid-rows-3;
}
.grid7 :nth-child(n) {
  @apply col-span-2;
}
.grid7 :nth-child(7) {
  @apply col-start-3;
}

.grid8 {
  @apply grid-cols-6 grid-rows-3;
}
.grid8 :nth-child(n) {
  @apply col-span-2;
}
.grid8 :nth-child(7) {
  @apply col-start-2;
}
.grid8 :nth-child(8) {
  @apply col-start-4;
}

.grid9 {
  @apply grid-cols-3 grid-rows-3;
}
</style>
