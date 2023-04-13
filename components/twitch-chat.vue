<template>
  <iframe
    :id="`streamer-chat-${streamer}`"
    :src="`https://www.twitch.tv/embed/${streamer}/chat?parent=localhost`"
    height="100%"
    sandbox="
      allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups
      allow-popups-to-escape-sandbox allow-modals
    "
    width="100%"
  >
  </iframe>
</template>

<script lang="ts" setup>
defineProps({
  streamer: {
    default: '',
    type: String,
  },
});
</script>

<style scoped></style>
