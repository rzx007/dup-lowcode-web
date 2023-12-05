import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
const resolve = (dir: string) => path.join(__dirname, dir)
const prefix = `monaco-editor/esm/vs`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueDevTools(),
    vue({
      script: {
        defineModel: true, // 开启defineModel功能
        propsDestructure: true // 开启props结构响应式
      }
    }),
    vueJsx()
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  server: {
    port: 3456,
    host: '0.0.0.0',
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          jsonWorker: [`${prefix}/language/json/json.worker`],
          cssWorker: [`${prefix}/language/css/css.worker`],
          htmlWorker: [`${prefix}/language/html/html.worker`],
          tsWorker: [`${prefix}/language/typescript/ts.worker`],
          editorWorker: [`${prefix}/editor/editor.worker`]
        }
      }
    }
  }
})
