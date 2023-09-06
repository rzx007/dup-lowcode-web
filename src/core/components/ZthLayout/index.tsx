import { defineComponent } from 'vue'
import './style.scss'
import { Expand, UserFilled } from '@element-plus/icons-vue'
const style = {
  width: '100%',
  heigt: '100vh',
}
export const ZthLayout = defineComponent({
  name: 'ZthLayout',
  setup(_props, { slots }) {
    return () => (
      <el-container class="zth-container">
        <el-aside width="200px" class="aside">{slots.aside?.()}</el-aside>
        <el-container class="content-container">
          <el-header class="header">
            <div class='header-content'>
              <div class='left'><el-icon size={20}><Expand /></el-icon></div>
              <div class='right'>
                <el-avatar icon={UserFilled} size={35} />
              </div>
            </div>
          </el-header>
          <el-main class="main">{slots.default?.()}</el-main>
          <el-footer class="footer">{slots.footer?.()}</el-footer>
        </el-container>
      </el-container>
    )
  }
})