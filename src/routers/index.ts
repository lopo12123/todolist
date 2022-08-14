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
                path: 'calendar',
                name: 'Calendar',
                component: () => import("@/views/Calendar.vue")
            },
            {
                path: 'create',
                name: 'Create',
                component: () => import("@/views/Create.vue")
            },
            {
                path: 'setting',
                name: 'Setting',
                component: () => import("@/views/Setting.vue")
            },
            {
                path: 'specific',
                name: 'Specific',
                component: () => import("@/views/Specific.vue")
            },
            {
                path: 'overview',
                name: 'Overview',
                component: () => import("@/views/Overview.vue"),
                redirect: { name: 'OverviewSummary' },
                children: [
                    {
                        path: 'summary',
                        name: 'OverviewSummary',
                        component: () => import("@/views/Overview/OverviewSummary.vue")
                    },
                    {
                        path: 'detail',
                        name: 'OverviewDetail',
                        component: () => import("@/views/Overview/OverviewDetail.vue")
                    }
                ]
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