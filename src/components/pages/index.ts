import { RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'
export default [
    {
        path: '/',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: () => import('./Login.vue')
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '面板'
                },
                component: () => import('./Dashboard.vue')
            },
            {
                path: '/:pathMatch(.*)', // 或者 /:pathMatch(.*)*
                name: '404',
                hidden: false, // 自定义添加的属性
                meta: {
                    title: '404'
                },
                component: () => import('./404.vue')
            },
        ]
    },


] as RouteRecordRaw[]