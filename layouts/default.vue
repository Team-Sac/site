<template>
  <div id="layout">
    <header-base></header-base>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
div#layout {
  @apply h-screen grid grid-rows-[30px,30px,25fr];
}
</style>
