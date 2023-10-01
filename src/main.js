import './assets/main.css'
// import { ViteSSG } from 'vite-ssg'
//https://github.com/antfu/vite-ssg

import './assets/js/custom.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')


