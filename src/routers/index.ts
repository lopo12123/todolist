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
        component: Home,
        redirect: { name: 'Calendar' },
        children: [
            {
                path: '/calendar',
                name: 'Calendar',
                component: () => import("@/views/Calendar.vue")
            },
            {
                path: '/overview',
                name: 'Overview',
                component: () => import("@/views/Overview.vue")
            },
        ]
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