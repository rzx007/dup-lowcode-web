<template>
  <ErrorBoundary>
    <component
      :is="componentName"
      ref="componentRef"
      v-bind="{
        ...attrs,
        ...memoizedProps,

        ...(isControlledComponent
          ? {
              'model-value': modelValue,
              ['onUpdate:modelValue']: (newValue: any) => (modelValue = newValue)
            }
          : {})
      }"
    >
      <!-- 渲染(作用域)插槽 -->
      <template v-for="k in Object.keys(slots)" #[k]="scope" :key="k">
        <slot :name="k" v-bind="scope"></slot>
      </template>
    </component>
    <!-- {{ isControlledComponent }} -->
    <!-- {{ slotScopeParams?.row }} -->
    <!-- <el-input v-model="modelValue"></el-input> -->
  </ErrorBoundary>
</template>
<script lang="ts">
export default {
  name: 'WrapComponent'
}
</script>
<script setup lang="ts">
import { computed, toRef, useAttrs, useSlots, watch, ref, ComponentPublicInstance } from 'vue'
import ErrorBoundary from './ErrorBoundary.vue'
import { useParseBinding } from '@/core/JsRuntime/useBinding'

const slots = useSlots()
const attrs = useAttrs()
const props = defineProps<{
  componentName: string
  nodeProps: Record<string, any>
  slotScopeParams: Record<string, any> // 作用域插槽参数, 没有则为{}
}>()

// 绑定组件props
const nodePropsRef = toRef(props, 'nodeProps')
const slotScopeParamsRef = toRef(props, 'slotScopeParams')
const { memoizedProps } = useParseBinding(nodePropsRef, slotScopeParamsRef)

const modelValue = computed({
  get: () => memoizedProps.value?.modelValue ?? '',
  set: val => {
    memoizedProps.value && (memoizedProps.value.modelValue = val)
    // todo: 更新store-state对应的值
  }
})
// --------------分割线----------------
const componentRef = ref<ComponentPublicInstance | null>(null)
// 判断组件是否是受控组件
const isControlledComponent = computed(() => {
  const instance = componentRef.value
  if (!instance) {
    return false
  }
  // 检查组件是否接收了'value'或'v-model'作为props
  const hasValueProp =
    (instance.$props as { modelValue?: any; 'v-model'?: any }) &&
    ('modelValue' in instance.$props || 'v-model' in instance.$props)
  return hasValueProp
})
watch(
  () => nodePropsRef.value,
  () => {
    if (componentRef.value) {
      console.log('是否是受控组件', isControlledComponent.value)
    }
  },
  { deep: true, immediate: true }
)
</script>
