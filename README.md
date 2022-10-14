vite + vue3 创建项目

安装前提：

1.安装nodejs

2.安装淘宝镜像cnpm

npm install cnpm -g --registry=https://registry.npm.taobao.org

正式搭建：

1、搭建脚手架 

cnpm init vite vue3-admin - -  - -template vue

2、选择vue、vue-ts

![](https://secure2.wostatic.cn/static/o8scApzyaLBhXyEAsTvkVq/image.png)

---

3、npm install 安装插件

4、npm run dev 运行

![](https://secure2.wostatic.cn/static/52YW91MCYZskjXWm6G7GBm/image.png)

5、安装 element-plus

cnpm install element-plus -D 

![](https://secure2.wostatic.cn/static/sBoHwUDJFAvvjZVig6ASaW/image.png)

6、安装 vue-router

cnpm i vue-router@next -D

![](https://secure2.wostatic.cn/static/dGdXwWEDNa4hBqm5A6kPid/image.png)

7、安装 unplugin-auto-import 

这个组件是按需引入包

cnpm i unplugin-auto-import -D

![](https://secure2.wostatic.cn/static/rHBebcW43STEkapeqjYrF1/image.png)

8、安装 cnpm i unplugin-vue-components -D

![](https://secure2.wostatic.cn/static/mCdNGDbvPU6pFF7V2fTRzi/image.png)

9、配置 vite.config.ts

```JavaScript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// {按需导包 自动导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
//}
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
  }
})

```

10、入口文件main.ts

```JavaScript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../src/router/index.js'
import "element-plus/dist/index.css"
/**
 * 完整引入 elementPlus 不推荐
 * import ElementPlus from 'element-plus'
 */


const app = createApp(App);
app.use(router);
app.mount('#app')

```

11、App.vue

```JavaScript
<script setup lang="ts">
</script>

<template>
  <!--配置路由-->
  <router-view></router-view>
</template>

<style scoped>

</style>

```

12、配置路由 router / index.js

```JavaScript
import {createWebHashHistory,createRouter,createWebHistory} from 'vue-router'
// 引入组件
import AxiosDemo1 from '../components/pages/AxiosDemo1.vue'

// 定义路由配置
const routes = [
    {
        path: "/axios",
        Component: AxiosDemo1
    }
]

// 创建路由实例
const router = createRouter({
    // 采用hash模式
    history: createWebHashHistory(),
    /**
     * 采用history模式
     * history: createWebHistory(),
     */
    routes,
})

export default router
```

