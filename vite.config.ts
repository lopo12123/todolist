import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    envPrefix: [ 'VITE_', 'TAURI_' ],
    plugins: [ vue() ],
    resolve: {
        alias: {
            "@": resolve("src")
        }
    },
    server: {
        port: 5173,
        strictPort: true
    },
    build: {
        target: [ 'es2021', 'chrome97' ],
    },
})
