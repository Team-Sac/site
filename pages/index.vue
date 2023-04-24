<template>
  <p>Dingue une première page</p>
  <div
    id="twitch-streams"
    :class="minimize.minimize ? minimize.type : 'maximize'"
  >
    <MultiTwitchStreams></MultiTwitchStreams>
    <MultiTwitchChats @change-size="changeSize"></MultiTwitchChats>
  </div>
</template>

<script lang="ts" setup>
const minimize = ref({ type: null, minimize: false });

const changeSize = ({
  type,
  isMinimized,
}: {
  type?: string;
  isMinimized: boolean;
}) => {
  minimize.value.type = type;
  minimize.value.minimize = isMinimized;
};
</script>

<style scoped>
#twitch-streams {
  @apply w-full h-full grid justify-self-center;
}
.maximize {
  @apply grid-cols-[3fr,minmax(0,1fr)];
}

.closed {
  @apply grid-cols-[3fr,30px];
}

.minimized {
  @apply grid-cols-[3fr,60px];
}
</style>
