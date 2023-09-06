<template>
  <template v-for="item in data" :key="item?.id">
    <Shell v-if="item?.componentName" :item="item" @click="handleClick">
      <component :is="item.componentName" v-if="item.slots?.length" v-bind="{ ...item.props!, ...$attrs }"
        :style="toCss(item?.style)">
        <template v-for="(slot, i) in item?.slots" :key="i" #[slotName(slot)]="slotData">
          <Renders v-if="slot[slotName(slot)]?.length" :parent-id="item.id" :slot-name="slotName(slot)"
            :data="slot[slotName(slot)]" v-bind="slotData || {}"></Renders>
          <SlotPalcehodler v-else :parent-id="item.id" :slot-name="slotName(slot)" :item-schema="item" />
        </template>
      </component>
      <component :is="item.componentName" v-bind="{ ...item.props!, ...$attrs }" v-else :style="toCss(item?.style)">
      </component>
    </Shell>
  </template>
</template>
<script setup lang="ts">
import { Shell } from './Shell'
import { ITreeSchema } from '@/core/interfaces/component'
import { SlotPalcehodler } from './SlotPalcehodler'
import { useFieldsStore } from '@/store/fields-view'
import { isObject, toCss } from '@/utils'
import './style.scss'

const fieldStore = useFieldsStore()

defineProps<{
  data: ITreeSchema[]
  parentId?: string | undefined
}>()

const slotName = (slot: string | Object): string => {
  if (isObject(slot)) {
    return Object.keys(slot)[0] as string
  }
  return slot as string
}

// 点击组件
const handleClick = (item: ITreeSchema) => {
  // console.log(item);
  fieldStore.setCurNode(item)
}
</script>
<script lang="ts">
export default {
  name: 'Renders',
}
</script>
<style lang="scss" scoped>
.shell-node-outlined {
  // 辅助线
  outline: dashed grey 1px;
}
</style>
