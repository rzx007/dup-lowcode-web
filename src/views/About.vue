<template>
  <DndProvider :backend="HTML5Backend">
    <Grid />
  </DndProvider>
</template>
<script lang="ts" setup>
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Grid from '@/examples/grid'
</script>
