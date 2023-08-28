<template>
  <DndProvider :backend="HTML5Backend">
    <div class="home">
      <Dustbin />
      <Simple />
      <MultipleTargets />
      <Indicator />
      <DropTargets />
    </div>
  </DndProvider>
</template>

<script lang="ts" setup>
import Indicator from '@/examples/indicator'
import MultipleTargets from '@/examples/multiple-targets'
import Simple from '@/examples/simple/index.vue'
import Dustbin from '@/examples/dustbin'
import DropTargets from '@/examples/drop-targets'
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
</script>
