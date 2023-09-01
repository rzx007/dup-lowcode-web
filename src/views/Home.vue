<template>
  <Designer>
    <ShellContainer>
      <Topbar>
        <Logo />
        <el-space wrap>
          <ThemeButton />
          <SaveButton />
        </el-space>
      </Topbar>
      <DndProvider :backend="HTML5Backend">
        <Workbench>
          <LeftSidebar>
            <LeftNav default-actived-key="components" :items="navList" :on-active="handleActive" />
          </LeftSidebar>
          <ToggleAblePane :toggle-type="ToggleType.right">
            <PagesWidget v-show="activedKey === LeftNavType.pages"></PagesWidget>
            <ResourceWidget v-show="activedKey === LeftNavType.compoents" :accept="dragType"></ResourceWidget>
            <HistoryWidget v-show="activedKey === LeftNavType.history"></HistoryWidget>
            <OutlineWidget v-show="activedKey === LeftNavType.outline"></OutlineWidget>
          </ToggleAblePane>
          <CenterContent>
            <DocumentView />
          </CenterContent>
          <ToggleAblePane />
        </Workbench>
      </DndProvider>
    </ShellContainer>
  </Designer>
</template>
<script setup lang="ts">
import { Designer } from '@/core/Designer'
import { ThemeButton } from '@/widgets/ThemeButton'
import { SaveButton } from '@/widgets/SaveButton'
import { LeftNav } from '@/widgets/LeftNav'
import { Logo } from '@/widgets/Logo'
import { componentsIcon, historyIcon, outlineIcon, document } from '@/icons'
import { Workbench, ShellContainer, Topbar, ToggleAblePane, ToggleType, LeftSidebar, CenterContent } from '@/layouts'
import { DocumentView } from '@/widgets/DocumentView'
import { ButtonItem } from '@/widgets/LeftNav/NavItem'
import { ResourceWidget } from '@/widgets/ResourceWidget'
import { PagesWidget } from '@/widgets/PagesWidget'
import { HistoryWidget } from '@/widgets/HistoryWidget'
import { OutlineWidget } from '@/widgets/OutlineWidget'
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { computed, provide, ref } from 'vue'
import { ITreeSchema } from '@/core/interfaces/component'
import { INode } from '@/types'
import { useDndActionStore } from '@/store/dnd-action'

enum LeftNavType {
  pages = 'pages',
  compoents = 'components',
  outline = 'outline',
  history = 'history',
}

const navList: ButtonItem[] = [
  {
    key: 'pages',
    title: '页面',
    icon: document,
  },
  {
    key: 'components',
    title: '组件',
    icon: componentsIcon,
  },
  {
    key: 'outline',
    title: '大纲树',
    icon: outlineIcon,
  },
  {
    key: 'history',
    title: '历史',
    icon: historyIcon,
  },
]

const activedKey = ref(LeftNavType.compoents)
const handleActive = (key: LeftNavType) => {
  activedKey.value = key
}

const data = ref<ITreeSchema[]>([])
provide('grid-provide', {
  data,
  addItems: (item: any) => {
    const itemSchema = { ...item }
    data.value.push(itemSchema)
    return itemSchema
  },
  // 往空插槽添加dragItem
  insertSlotItems: (dropItem: any, dragItem: any, slotName: string, source?: string) => {
    if (!source) {
      // 从画布上拖拽, 先删除拖拽前的dragItem
      findIndex(dragItem.id, data.value, (list, index) => {
        list.splice(index, 1)
      })
    }
    findIndex(dropItem.id, data.value, (list, index) => {
      const item = list[index]
      item.slots = item.slots || [{ default: [] }]
      item.slots.forEach((slotItem) => {
        if (Object.keys(slotItem)[0] === slotName) {
          slotItem[slotName].push(dragItem)
        }
      })
    })
  },
  // 添加dragItem
  insertItems: (dropItem: any, dragItem: any, source?: string) => {
    if (!source) {
      findIndex(dragItem.id, data.value, (list, index) => {
        list.splice(index, 1)
      })
    }
    findIndex(dropItem.id, data.value, (list, index) => {
      list.splice(index + 1, 0, dragItem)
    })
  },
  // 删除dragItem
  deleteItems: (dragItem: any) => {
    findIndex(dragItem.id, data.value, (list, index) => {
      list.splice(index, 1)
    })
  },
  // 复制dragItem
  copyItems: (dragItem: any) => {
    const itemSchema = { ...dragItem }
    data.value.push(itemSchema)
    return itemSchema
  },
})

const dndStore = useDndActionStore()

const dragType = computed(() => {
  return dndStore.dragType
})

// 根据id寻找节点
const findIndex = (id: string, list: INode[], callback: (list: INode[], index: number) => void) => {
  if (!list) {
    return
  }
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item.id === id) {
      callback(list, i)
      break
    } else if (item.slots?.length) {
      item.slots.forEach((slotObj: { [key: string]: INode[] }) => {
        for (const [, slots] of Object.entries(slotObj)) {
          findIndex(id, slots, callback)
        }
      })
    }
  }
}
</script>
<style></style>
