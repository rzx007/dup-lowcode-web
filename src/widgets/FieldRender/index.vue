<template>
  <el-tabs class="field-tabs" :model-value="activeName">
    <template v-for="(tab, index) in tabsList" :key="index">
      <el-tab-pane v-if="tab?.children.length" :label="tab.label" :name="tab.label">
        <el-row>
          <template v-for="(item, i) in tab?.children" :key="i">
            <el-col :span="7">{{ item['x-field']?.label }}</el-col>
            <el-col :span="17">
              <component :is="item.componentName" v-bind="item.props" v-model="fields[tab.name][item['x-field']?.name]">
                <template v-if="eles.includes(item.componentName) && item.props?.options">
                  <component :is="item.props?.childElement" v-for="(ele, idx) in item.props?.options" :key="idx"
                    :label="ele.value">
                    {{ ele.label }}
                  </component>
                </template>
                <template v-else-if="item.componentName === 'el-select' && item.props?.options">
                  <component :is="item.props?.childElement" v-for="(ele, idx) in item.props?.options" :key="idx"
                    v-bind="ele"></component>
                </template>
              </component>
            </el-col>
          </template>
        </el-row>
      </el-tab-pane>
    </template>
    <template v-if="controllerList.length" v-for="(tab, index) in controllerList" :key="index">
      <el-tab-pane :label="tab.label" :name="tab.label">
        <ControllerPanel :data="tab.children"></ControllerPanel>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script setup lang="ts">
import { useFieldsStore } from '@/store/fields-view'
import { ControllerPanel } from '@/widgets/ControllerWidgets'
import { storeToRefs } from 'pinia'
import { nextTick, ref, watch } from 'vue'

const activeName = ref('属性')
const tabsList = ref<any>([])
const controllerList = ref<any>([])
const fieldStore = useFieldsStore()
const { updateComponent } = fieldStore
const { currentNode, currentDesignerSchema, fields } = storeToRefs(fieldStore)
watch(
  () => currentNode.value?.id,
  () => {
    nextTick(() => {
      activeName.value = '属性'
      const { propsTab, styleTab, controllerTab, dataTab } = currentDesignerSchema.value
      console.log(controllerTab);

      tabsList.value = [
        {
          label: '属性',
          name: 'props',
          children: propsTab || [],
        },
        {
          label: '样式',
          name: 'style',
          children: styleTab || [],
        },
        {
          label: '数据',
          name: 'data',
          children: dataTab || [],
        },
      ]
      if (controllerTab.length) {
        controllerList.value = [{
          label: '事件',
          name: 'controller',
          children: controllerTab || [],
        }]
      }
      //@ts-ignore
      const { props = {}, style = {}, controller = {}, data = {} } = currentNode.value

      const propsData = bindFormValue(propsTab)
      const styleData = bindFormValue(styleTab)
      const controllerData = bindFormValue(controllerTab)
      const dataData = bindFormValue(dataTab)
      fields.value = {
        props: { ...propsData, ...props },
        style: { ...styleData, ...style },
        controller: { ...controllerData, ...controller },
        data: { ...dataData, ...data },
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
    schema.forEach((item) => {
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
