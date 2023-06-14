<template>
  <div id="twitch-streams" :class="gridSize">
    <StreamerList @change-size="changeSize"></StreamerList>
    <LazyTwitchStreamsMultiTwitchStreams></LazyTwitchStreamsMultiTwitchStreams>
    <LazyTwitchStreamsMultiTwitchChats
      @change-size="changeSize"
    ></LazyTwitchStreamsMultiTwitchChats>
  </div>
</template>

<script lang="ts" setup>
const listSize = ref<'minmax(0,1fr)' | '30px'>('minmax(0,1fr)');
const chatSize = ref<'minmax(0,1fr)' | '60px' | '30px'>('minmax(0,1fr)');
const gridSize = ref<
  | 'grid-cols-[minmax(0,1fr),3fr,minmax(0,1fr)]'
  | 'grid-cols-[30px,3fr,minmax(0,1fr)]'
  | 'grid-cols-[minmax(0,1fr),3fr,60px]'
  | 'grid-cols-[minmax(0,1fr),3fr,30px]'
  | 'grid-cols-[30px,3fr,30px]'
>('grid-cols-[minmax(0,1fr),3fr,minmax(0,1fr)]');

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
        listSize.value = 'minmax(0,1fr)';
      } else {
        chatSize.value = 'minmax(0,1fr)';
      }
      break;
  }
  gridSize.value = `grid-cols-[${listSize.value},3fr,${chatSize.value}]`;
};
</script>

<style scoped>
#twitch-streams {
  @apply w-full h-[calc(100%-2.5rem)] grid overflow-hidden;
}
</style>
