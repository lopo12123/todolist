import "./styles/index.css";
import { createApp } from "vue";
import { router } from "@/routers";
import Vue3SeamlessScroll from "vue3-seamless-scroll";
import App from "./App.vue";

createApp(App)
    .use(router)
    .use(Vue3SeamlessScroll)
    .mount('#app')
