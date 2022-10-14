import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// {按需导包 自动导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
//}

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  AutoImport({
    resolvers: [ElementPlusResolver()]
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  })
  ],
  // 配置端口
  server: {
    port: 3005
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      "assets": path.resolve(__dirname, "src/assets")
    }
  }
})
