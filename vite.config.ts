import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const resolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    script: {
      defineModel: true, // 开启defineModel功能
      propsDestructure: true, // 开启props结构响应式
    }
  }), vueJsx()],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
})
