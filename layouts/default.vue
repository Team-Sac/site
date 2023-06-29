<template>
  <div id="layout" ref="layout">
    <shared-header-base></shared-header-base>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
#layout {
  @apply text-gray-50 bg-gradient-to-b from-[#000309] to-[#262B4A];
}
</style>
