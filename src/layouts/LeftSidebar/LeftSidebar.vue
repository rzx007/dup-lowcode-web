<template>
  <div class="zth-left-sidebar">
    <slot />
  </div>
</template>
<script setup lang="ts">
import './style.scss'
</script>
<style lang="scss" scoped>
.LeftSidebar {
  width: 50px;
  display: flex;
  flex-flow: column;
  height: 100%;
  overflow: auto;
}
</style>
