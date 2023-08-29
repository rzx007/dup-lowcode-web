<template>
  <div class="Topbar">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
</script>
<style lang="scss" scoped>
.Topbar {
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border-bottom: 1px solid var(--border-color);
}
</style>
