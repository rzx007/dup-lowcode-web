<template>
  <div class="zth-editor-left-pane" :style="{ width: toggled ? 0 : width }">
    <div class="pane-content">
      <div class="pane-placeholder">
        <slot></slot>
      </div>
      <ToggleButton :toggle-type="toggleType" :toggled="toggled" :on-click="handleToggle" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ToggleButton, ToggleType } from './ToggleButton'
import './style.scss'
import { ref } from 'vue'

withDefaults(defineProps<{ toggleType?: ToggleType; width?: string }>(), {
  toggleType: ToggleType.left,
  width: '260px',
})
const toggled = ref<boolean>(false)
const handleToggle = () => {
  toggled.value = !toggled.value
}
</script>
<style></style>
