<template>
  <div :id="`streamer-player-${props.streamer}`" ref="test"></div>
</template>

<script lang="ts" setup>
const props = defineProps({
  streamer: {
    default: '',
    type: String,
  },
});

const test = ref();

const { load } = useScriptTag(
  'https://player.twitch.tv/js/embed/v1.js',
  () => {},
  {
    manual: true,
  },
);

let isStreamExist = false;
const checkExist = setInterval(async () => {
  if (document.getElementById(`streamer-player-${props.streamer}`)) {
    await load();

    const options = {
      height: '100%',
      width: '100%',
      channel: props.streamer,
      allowfullscreen: true,
    };

    if (!isStreamExist) {
      /* global Twitch */
      const player = new Twitch.Player(
        `streamer-player-${props.streamer}`,
        options,
      );
      player.setVolume(0.5);
    }

    isStreamExist = true;
    clearInterval(checkExist);
  }
}, 100); // check every 100ms
</script>

<style scoped></style>
