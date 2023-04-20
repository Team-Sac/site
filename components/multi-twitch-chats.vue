<template>
  <div id="multi-twitch-chats" :class="streams.length > 1 && 'multi-chats'">
    <div v-if="streams.length > 1" id="tabs-multi-twitch-chats">
      <button
        v-for="(stream, key) in streams"
        :key="stream"
        class="tabs-chat"
        @click="selected = key"
      >
        {{ stream }}
      </button>
    </div>
    <div class="h-full">
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
  @apply h-full;
}

.multi-chats {
  @apply grid grid-rows-[60px,1fr];
}

#tabs-multi-twitch-chats {
  @apply inline whitespace-nowrap overflow-x-auto bg-white;
}

.tabs-chat {
  @apply m-2 w-1/3 text-ellipsis overflow-hidden whitespace-nowrap;
}
</style>
