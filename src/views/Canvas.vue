<template>
  <DndProvider :backend="HTML5Backend" :context="window">
    <CanvasRender />
  </DndProvider>
</template>
<script setup lang="ts">
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { CanvasRender } from '@/widgets/CanvasRender'
</script>
<style></style>
