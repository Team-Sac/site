<template>
  <div id="multi-twitch-chats">
    <div id="tabs-multi-twitch-chats">
      <button
        v-for="(stream, key) in streams"
        :key="stream"
        @click="selected = key"
      >
        {{ stream }}
      </button>
    </div>
    <div>
      <TwitchChat
        v-for="(stream, key) in streams"
        :key="stream"
        :hidden="key !== selected"
        :streamer="stream"
      ></TwitchChat>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStreamsStore } from '~/stores/streamsStore';

const { streams } = useStreamsStore();

const selected = ref<number>(0);
</script>

<style scoped>
#multi-twitch-chats {
  @apply h-full grid grid-rows-[1fr,19fr];
}

#tabs-multi-twitch-chats {
  @apply flex justify-around;
}
</style>
