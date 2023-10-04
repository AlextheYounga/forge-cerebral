export function setBionicReading(mode) {
    localStorage.setItem('bionicReading', mode)
    document.body.classList.toggle('bionic');
}

export function checkBionicReading() {
    // Check settings
    const localStorageValue = localStorage.getItem('bionicReading')
    if (localStorageValue) {
        const bionicSetting = localStorageValue === 'true' ? true : false

        if (bionicSetting === true) {
            setBionicReading(true)
            return true
        }
    }

    return false // default to false
}

export function setColorScheme(mode) {
    localStorage.setItem('darkMode', mode)
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
}

export function checkDarkMode() {
    // Check settings
    const localStorageValue = localStorage.getItem('darkMode')
    if (localStorageValue) {
        const darkModeSetting = localStorageValue === 'true' ? true : false

        if (darkModeSetting !== true) {
            setColorScheme(false)
            return false
        }
    }

    return true // default to true
}