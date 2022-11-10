export default class messageBridge {
    constructor(serverHost){
        const main = window
        const mainWebContents = require("@electron/remote").webContents.getFocusedWebContents()
        console.log(mainWebContents)
    }
    
}