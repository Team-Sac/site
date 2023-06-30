<template>
  <div class="multi-twitch-chats">
    <div id="buttons-twitch-chat" :class="minimize ? 'close' : 'open'">
      <button @click="opening()">
        <i :class="close ? 'fa-comments' : 'fa-times'" class="fas"></i>
      </button>
      <button :hidden="close" @click="maximize()">
        <i
          :class="minimize ? 'fa-window-maximize' : 'fa-window-minimize'"
          class="fas"
        ></i>
      </button>
    </div>
    <div
      v-if="!close"
      id="multi-twitch-chats"
      :class="!minimize && streams.length > 1 && 'multi-chats'"
      :hidden="minimize"
    >
      <div v-if="streams.length > 1" id="tabs-multi-twitch-chats">
        <button
          v-for="(stream, key) in streams"
          :key="stream"
          class="tabs-chat"
          @click="() => (selected = key)"
        >
          {{ stream }}
        </button>
      </div>
      <div class="h-full">
        <twitch-chat
          v-for="(stream, key) in streams"
          :key="stream"
          :hidden="key !== selected"
          :streamer="stream"
        ></twitch-chat>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStreamsStore } from '~/stores/streamsStore';
import TwitchChat from '#components';

const emit = defineEmits(['changeSize']);

const { streams } = useStreamsStore();

const selected = ref<number>(0);

const close = ref(false);
const minimize = ref(false);

const opening = () => {
  close.value = !close.value;
  minimize.value = close.value;
  emit('changeSize', {
    element: 'chat',
    type: close.value ? 'close' : 'open',
  });
};
const maximize = () => {
  minimize.value = !minimize.value;
  emit('changeSize', {
    element: 'chat',
    type: minimize.value ? 'minimize' : 'open',
  });
};
</script>

<style scoped>
#multi-twitch-chats {
  @apply h-full;
}

#buttons-twitch-chat {
  @apply flex justify-start;
}

.multi-chats {
  @apply grid grid-rows-[60px,1fr];
}

.multi-twitch-chats {
  @apply grid grid-rows-[30px,1fr];
}

.open {
  @apply w-1/5;
}

.open > button {
  @apply w-1/2;
}

.close > button {
  @apply w-full;
}

#tabs-multi-twitch-chats {
  @apply inline whitespace-nowrap overflow-x-auto;
}

.tabs-chat {
  @apply p-2 text-ellipsis overflow-hidden whitespace-nowrap;
}
</style>
