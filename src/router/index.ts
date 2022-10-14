import { createWebHashHistory, createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import menus from '../components/pages'


// 定义路由配置
const routes = [
    ...menus
] as RouteRecordRaw[];


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