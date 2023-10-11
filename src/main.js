import './assets/styles/main.css'
import { createHead } from 'unhead'
// import { ViteSSG } from 'vite-ssg'
//https://github.com/antfu/vite-ssg

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
createHead()

app.use(router)
app.use(store)
app.mount('#app')

