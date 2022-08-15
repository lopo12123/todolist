// import "element-plus/dist/index.css";
import "./styles/transition.scss";
import "./fonts/fonts.scss";
import "./styles/index.scss";
import { createApp } from "vue";
import { router } from "@/routers";
import { createPinia } from "pinia";
import App from "./App.vue";

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
