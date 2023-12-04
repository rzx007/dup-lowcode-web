<template>
  <ErrorBoundary>
    <component :is="componentName" v-bind="{ ...attrs, ...memoizedProps }">
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
import { toRef, useAttrs, useSlots, watch } from 'vue'
import ErrorBoundary from './ErrorBoundary.vue'
import { useParseBinding } from '@/core/JsRuntime/useBinding'

const props = defineProps<{
  componentName: string
  nodeProps: Record<string, any>
}>()
// 绑定组件props
const nodePropsRef = toRef(props, 'nodeProps')
watch(
  () => nodePropsRef.value,
  () => {
    // console.log('nodePropsRef', nodePropsRef.value)
  },
  { immediate: true }
)

const { memoizedProps } = useParseBinding(nodePropsRef)

const slots = useSlots()
const attrs = useAttrs()
</script>
