import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Home from "@/views/Home.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '',
        redirect: {
            name: 'Home'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: () => import("@/views/Calendar.vue")
    },
    {
        path: '/order-list',
        name: 'OrderList',
        component: () => import("@/views/OrderList.vue")
    },
    {
        path: '/full-screen',
        name: 'FullScreen',
        component: () => import("@/views/FullScreen.vue")
    },
    {
        path: '/blank',
        name: 'Blank',
        component: () => import("@/views/Blank.vue")
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})