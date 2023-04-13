<template>
  <div id="layout">
    <header-base></header-base>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
div#layout {
  @apply h-screen grid grid-rows-[1fr,1fr,25fr];
}
</style>
