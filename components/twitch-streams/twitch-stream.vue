<template>
  <div :id="`streamer-player-${props.streamer}`"></div>
</template>

<script lang="ts" setup>
const props = defineProps({
  streamer: {
    default: '',
    type: String,
  },
});

const { load } = useScriptTag(
  'https://player.twitch.tv/js/embed/v1.js',
  () => {},
  {
    manual: true,
  },
);

let isStreamLoaded = false;

onBeforeMount(async () => {
  await load();

  const options = {
    height: '100%',
    width: '100%',
    channel: props.streamer,
    allowfullscreen: true,
  };

  /* global Twitch */
  const player = new Twitch.Player(
    `streamer-player-${props.streamer}`,
    options,
  );
  player.setVolume(0.5);
  isStreamLoaded = true;
});

if (!isStreamLoaded) {
  await load();

  const options = {
    height: '100%',
    width: '100%',
    channel: props.streamer,
    allowfullscreen: true,
  };

  /* global Twitch */
  const player = new Twitch.Player(
    `streamer-player-${props.streamer}`,
    options,
  );
  player.setVolume(0.5);
}
</script>

<style scoped></style>
