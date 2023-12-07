<template>
  <el-tabs class="field-tabs" :model-value="activeName">
    <template v-for="(tab, index) in tabsList" :key="index">
      <el-tab-pane v-if="tab?.children.length" :label="tab.label" :name="tab.label">
        <el-row>
          <template v-for="(item, i) in tab?.children" :key="i">
            <el-col :span="7">{{ item['x-field']?.label }}</el-col>
            <el-col :span="17">
              <component
                :is="item.componentName"
                v-bind="item.props"
                v-model="fields[tab.name][item['x-field']?.name]"
              >
                <template v-if="eles.includes(item.componentName) && item.props?.options">
                  <component
                    :is="item.props?.childElement"
                    v-for="(ele, idx) in item.props?.options"
                    :key="idx"
                    :label="ele.value"
                  >
                    {{ ele.label }}
                  </component>
                </template>
                <template v-else-if="item.componentName === 'el-select' && item.props?.options">
                  <component
                    :is="item.props?.childElement"
                    v-for="(ele, idx) in item.props?.options"
                    :key="idx"
                    v-bind="ele"
                  ></component>
                </template>
              </component>
            </el-col>
          </template>
        </el-row>
      </el-tab-pane>
    </template>
    <template v-if="eventsList.length">
      <el-tab-pane
        v-for="(tab, index) in eventsList"
        :key="index"
        :label="tab.label"
        :name="tab.label"
      >
        <EventsPanel :data="tab.children"></EventsPanel>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script setup lang="ts">
import { useFieldsStore } from '@/store/fields-view'
import { EventsPanel } from '@/widgets/EventsWidgets'
import { storeToRefs } from 'pinia'
import { nextTick, ref, watch } from 'vue'

const activeName = ref('属性')
const tabsList = ref<any>([])
const eventsList = ref<any>([])
const fieldStore = useFieldsStore()
const { updateComponent } = fieldStore
const { currentNode, currentDesignerSchema, fields } = storeToRefs(fieldStore)
watch(
  () => currentNode.value?.id,
  () => {
    nextTick(() => {
      activeName.value = '属性'
      const { propsTab, styleTab, eventsTab, dataTab } = currentDesignerSchema.value
      console.log(eventsTab)

      tabsList.value = [
        {
          label: '属性',
          name: 'props',
          children: propsTab || []
        },
        {
          label: '样式',
          name: 'style',
          children: styleTab || []
        },
        {
          label: '数据',
          name: 'data',
          children: dataTab || []
        }
      ]
      if (eventsTab.length) {
        eventsList.value = [
          {
            label: '事件',
            name: 'events',
            children: eventsTab || []
          }
        ]
      }
      //@ts-ignore
      const { props = {}, style = {}, events = {}, data = {} } = currentNode.value

      const propsData = bindFormValue(propsTab)
      const styleData = bindFormValue(styleTab)
      const dataData = bindFormValue(dataTab)
      fields.value = {
        props: {
          ...propsData,
          ...props,
          ...{
            // onClick: (value: any) => {
            //   console.log('ZthButton.ts ~ changeMyInput ~ value', value)
            // }
          }
        },
        style: { ...styleData, ...style },
        data: { ...dataData, ...data }
      }
      updateComponent()
    })
  }
)

const eles = ['el-radio-group', 'el-checkbox-group']

// 表单绑定值
const bindFormValue = (schema: any[]) => {
  const props: { [x: string]: any } = {}
  if (schema) {
    schema.forEach(item => {
      const key: string = item['x-field']?.name || ''
      const defaultValue = item['x-field']?.defaultValue
      const value = defaultValue !== 'undefined' ? defaultValue : ''
      if (key) {
        props[key] = value
      }
    })
  }
  return props
}
</script>
<style lang="scss">
.field-tabs {
  padding: 0 16px;

  .el-col {
    margin-bottom: 24px;
    line-height: 32px;
  }
}
</style>
