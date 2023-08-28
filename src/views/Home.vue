<template>
  <ShellContainer>
    <Topbar>
      <Logo />
      <el-space wrap>
        <ThemeButton />
        <SaveButton />
      </el-space>
    </Topbar>
    <Workbench>
      <LeftSidebar>
        <LeftNav default-actived-key="compoenets" :items="navList" />
      </LeftSidebar>
      <ToggleAblePane :toggle-type="ToggleType.right"></ToggleAblePane>
      <CenterContent>
        <CanvasToolbar />
      </CenterContent>
      <ToggleAblePane />
    </Workbench>
  </ShellContainer>
</template>
<script setup lang="ts">
import { ThemeButton } from '@/widgets/ThemeButton'
import { SaveButton } from '@/widgets/SaveButton'
import { LeftNav } from '@/widgets/LeftNav'
import { Logo } from '@/widgets/Logo'
import { componentsIcon, historyIcon, outlineIcon } from '@/icons'
import {
  Workbench,
  ShellContainer,
  Topbar,
  ToggleAblePane,
  ToggleType,
  LeftSidebar,
  CenterContent,
  CanvasToolbar,
} from '@/layouts'
import { ButtonItem } from '@/widgets/LeftNav/NavItem'

const navList: ButtonItem[] = [
  {
    key: 'components',
    title: 'components',
    icon: componentsIcon,
  },
  {
    key: 'outline',
    title: 'outline',
    icon: outlineIcon,
  },
  {
    key: 'history',
    title: 'history',
    icon: historyIcon,
  },
]
</script>
<style></style>
