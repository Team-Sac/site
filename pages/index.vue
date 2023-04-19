<template>
  <p>Dingue une première page</p>
  <div id="twitch-streams">
    <MultiTwitchStreams></MultiTwitchStreams>
    <MultiTwitchChats></MultiTwitchChats>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
#twitch-streams {
  @apply w-full h-full grid grid-cols-[3fr,minmax(0,1fr)] justify-self-center;
}
</style>
