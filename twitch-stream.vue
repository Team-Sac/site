<template>
  <div id="streamer-div"></div>
</template>

<script lang="ts" setup>
const props = defineProps({
  streamer: {
    default: '',
    type: String,
  },
});

useScriptTag('https://player.twitch.tv/js/embed/v1.js', () => {
  const options = {
    height: '100%',
    width: '100%',
    channel: props.streamer,
    allowfullscreen: true,
  };
  /* global Twitch */
  const player = new Twitch.Player('streamer-div', options);
  player.setVolume(0.5);
});
</script>

<style scoped>
div {
  @apply w-full aspect-video;
}
</style>
