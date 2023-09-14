<template>
  <template v-for="(item, index) in dropItems" :key="item?.id">
    <Shell v-if="item?.componentName" :id="item?.id" :index="item?.id" :item-schema="item">
      <component :is="item.componentName" v-if="item.slots?.length" :item="item">
        <template v-for="(slot, i) in item?.slots" :key="i" #[slotName(slot)]>
          <Renders
            v-if="slot[slotName(slot)]?.length"
            :parent-id="item.id"
            :slot-name="slotName(slot)"
            :drop-items="slot[slotName(slot)]"
            :sort-items="() => {}"
          ></Renders>
          <SlotPalcehodler
            v-else
            :parent-id="item.id"
            :slot-name="slotName(slot)"
            :item-schema="item"
          />
        </template>
      </component>
      <component :is="item.componentName" v-else :item="item">{{ item.componentName }}</component>
    </Shell>
  </template>
</template>
<script setup lang="ts">
import Shell from './Shell.vue'
import SlotPalcehodler from './SlotPalcehodler.vue'
import { isObject } from '@/utils'
defineProps<{
  dropItems: any[]
  parentId?: string | undefined
}>()

const slotName = (slot: string | Object): string => {
  if (isObject(slot)) {
    return Object.keys(slot)[0] as string
  }
  return slot as string
}
</script>

<style lang="scss" scoped>
.shell-node-outlined {
  // 辅助线
  outline: dashed grey 1px;
}
</style>
