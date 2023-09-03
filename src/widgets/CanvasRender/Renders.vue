<template>
  <template v-for="item in data" :key="item?.id">
    <Shell v-if="item?.componentName" :item="item" @click="handleClick">
      <component :is="item.componentName" v-if="item.slots?.length">
        <template v-for="(slot, i) in item?.slots" :key="i" #[slotName(slot)]>
          <Renders
            v-if="slot[slotName(slot)]?.length"
            :parent-id="item.id"
            :slot-name="slotName(slot)"
            :data="slot[slotName(slot)]"
          ></Renders>
          <SlotPalcehodler v-else :parent-id="item.id" :slot-name="slotName(slot)" :item-schema="item" />
        </template>
      </component>
      <component :is="item.componentName" v-bind="item.props!" v-else>{{ item.compoentsTitle }}</component>
    </Shell>
  </template>
</template>
<script setup lang="ts">
import { Shell } from './Shell'
import { ITreeSchema } from '@/core/interfaces/component'
import { SlotPalcehodler } from './SlotPalcehodler'
import { isObject } from '@/utils'
import './style.scss'

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
const handleClick = (item: ITreeSchema) => {
  console.log(item);
  
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
