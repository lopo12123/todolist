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
    // {
    //     path: '/test',
    //     name: 'Test',
    //     component: () => import("@/test/TestView.vue")
    // }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})