<template>
  <div id="layout">
    <header-base></header-base>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
div#layout {
  @apply h-full w-full;
}
</style>
