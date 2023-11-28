<template>
  <ErrorBoundary>
    <component :is="componentName" v-bind="attrs">
      <template v-for="k in Object.keys(slots)" #[k] :key="k">
        <slot :name="k"></slot>
      </template>
    </component>
  </ErrorBoundary>
</template>
<script lang="ts">
export default {
  name: 'WrapComponent'
}
</script>
<script setup lang="ts">
import { useAttrs, useSlots } from 'vue'
import ErrorBoundary from './ErrorBoundary.vue'
const slots = useSlots()
const attrs = useAttrs()
defineProps<{
  componentName: string
}>()
</script>
