<template>
  <div id="twitch-streams" :class="gridSize">
    <StreamerList v-if="width >= 1024" @change-size="changeSize"></StreamerList>
    <LazyTwitchStreamsMultiTwitchStreams
      v-if="width >= 1024"
    ></LazyTwitchStreamsMultiTwitchStreams>
    <LazyTwitchStreamsMultiTwitchChats
      v-if="width >= 1024"
      @change-size="changeSize"
    ></LazyTwitchStreamsMultiTwitchChats>

    <div v-if="width < 1024" class="screen-too-small">
      <div>
        <p>
          Vous êtes sur un écran trop petit pour être pris en charge par le
          site.
        </p>
        <p>
          Pour accéder à toutes les fonctionnalités, passez sur un ordinateur.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';

const listSize = ref<'minmax(0,2fr)' | '30px'>('minmax(0,2fr)');
const chatSize = ref<'minmax(0,3fr)' | '60px' | '30px'>('minmax(0,3fr)');
const gridSize = ref<
  | 'grid-cols-[minmax(0,2fr),7fr,minmax(0,3fr)]'
  | 'grid-cols-[30px,7fr,minmax(0,3fr)]'
  | 'grid-cols-[minmax(0,2fr),7fr,60px]'
  | 'grid-cols-[minmax(0,2fr),7fr,30px]'
  | 'grid-cols-[30px,7fr,60px]'
  | 'grid-cols-[30px,7fr,30px]'
>('grid-cols-[minmax(0,2fr),7fr,minmax(0,3fr)]');

const changeSize = ({
  element,
  type,
}: {
  element: 'list' | 'chat';
  type: 'minimize' | 'close' | 'open';
}) => {
  switch (type) {
    case 'minimize':
      if (element === 'chat') {
        chatSize.value = '60px';
      }
      break;
    case 'close':
      if (element === 'list') {
        listSize.value = '30px';
      } else {
        chatSize.value = '30px';
      }
      break;
    default:
      if (element === 'list') {
        listSize.value = 'minmax(0,2fr)';
      } else {
        chatSize.value = 'minmax(0,3fr)';
      }
      break;
  }
  gridSize.value = `grid-cols-[${listSize.value},7fr,${chatSize.value}]`;
};

const { width } = useWindowSize();
</script>

<style scoped>
#twitch-streams {
  @apply w-full h-[calc(100vh-9rem)] lg:grid lg:overflow-hidden lg:px-40 lg:pb-16;
}

.screen-too-small {
  @apply h-full w-full flex flex-col justify-center items-center;
}
.screen-too-small > div {
  @apply p-6 rounded-3xl bg-gray-900;
}
</style>
