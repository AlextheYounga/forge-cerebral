import { createStore } from 'vuex'
import { checkDarkMode, checkBionicReading, setColorScheme, setBionicReading } from './assets/js/settings'



// Create a new store instance.
const store = createStore({
    state() {
        return {
            bionicReading: checkBionicReading(),
            darkMode: checkDarkMode()
        }
    },
    mutations: {
        toggleBionicReading(state) {
            state.bionicReading = !state.bionicReading
            setBionicReading(state.bionicReading)
        },
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode
            setColorScheme(state.darkMode)
        }
    }
})

export default store