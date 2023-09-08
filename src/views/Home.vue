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
          <ToggleAblePane width="280px">
            <FieldRender />
          </ToggleAblePane>
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
import FieldRender from '@/widgets/FieldRender/index.vue'
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { computed, ref } from 'vue'
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

const dndStore = useDndActionStore()
const dragType = computed(() => {
  return dndStore.dragType
})
</script>
<style></style>
