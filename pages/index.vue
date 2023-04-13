<template>
  <p>Dingue une première page</p>
  <div id="twitch-streams">
    <MultiTwitchStreams></MultiTwitchStreams>
    <TwitchChat streamer="twitchdev"></TwitchChat>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
#twitch-streams {
  @apply h-full grid grid-cols-[2fr,minmax(300px,1fr)];
}
</style>
