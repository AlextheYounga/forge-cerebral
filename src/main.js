import './assets/main.css'
// import { ViteSSG } from 'vite-ssg'
//https://github.com/antfu/vite-ssg

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')

