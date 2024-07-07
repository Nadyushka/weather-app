import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import { AppContent } from "@/pages";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'main-page',
        components: {
            default: AppContent,
        },
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
