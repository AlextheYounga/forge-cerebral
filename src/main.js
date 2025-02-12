import './assets/styles/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createHead } from 'unhead'
import router from './router'
import store from './store'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(store)
app.use(head)
app.mount('#app')

