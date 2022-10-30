
export default async function relaod() {
    if (window.require&&window.notMain) {
        const { webContents } = require('@electron/remote');
        window.location.reload()
        setTimeout(() => {
            webContents.getAllWebContents().forEach(element => {
               element.reloadIgnoringCache()
            })
        }, 1000
        )
    }
    else {
        window.location.reload()
    }
}