<template>
  <el-tabs class="field-tabs" :model-value="activeName">
    <template v-for="(tab, index) in tabsList" :key="index">
      <el-tab-pane v-if="tab?.children" :label="tab.label" :name="tab.label">
        <el-row>
          <template v-for="(item, i) in tab?.children" :key="i">
            <el-col :span="7">{{ item['x-field']?.label }}</el-col>
            <el-col :span="17">
              <component :is="item.componentName" v-bind="item.props">
                <template v-if="eles.includes(item.componentName) && item.props?.options">
                  <component v-for="(ele, idx) in item.props?.options" :key="idx" :is="item.props?.childElement"
                    v-bind="ele"></component>
                </template>
              </component>
            </el-col>
          </template>
        </el-row>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script setup lang="ts">
import { buttonSchema } from '@/core/materials/Button/schema'
import { ref } from 'vue';
const { propsTab, styleTab } = buttonSchema
const activeName = ref('属性')
const tabsList = [
  {
    label: '属性',
    children: propsTab || []
  },
  {
    label: '样式',
    children: styleTab || []
  }
]

const eles = ['el-radio-group', 'el-checkbox-group', 'el-select']
</script>
<style lang='scss'>
.field-tabs {
  padding: 0 10px;

  .el-col {
    margin-bottom: 24px;
    line-height: 32px;
  }

  .el-tabs__item {}
}
</style>
