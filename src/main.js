import './assets/main.css'
// import { ViteSSG } from 'vite-ssg'
//https://github.com/antfu/vite-ssg

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            bionicReading: false
        }
    },
    mutations: {
        toggleBionicReading(state) {
            state.bionicReading = !state.bionicReading
        }
    }
})

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')

