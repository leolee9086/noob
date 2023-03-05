const {
    app,
    BrowserWindow,
    shell,
    Menu,
    screen,
    nativeTheme,
    ipcMain,
    globalShortcut,
    Tray,
} = require("@electron/remote")
const ipcRenderer  =require("electron")
//继承事件触发器
export class serverHost extends EventEmitter{
    constructor(path,options){
        //调用super之后,才能够使用this
        super()
        let host = new BrowserWindow(
            {
                width: screen.getPrimaryDisplay().size.width / 2,
                height: screen.getPrimaryDisplay().workAreaSize.height / 2,
                frame: true,
                icon: path.join(appDir, 'stage', 'icon-large.png'),
                show:false,
                webPreferences: {
                    preload:'D:\\newSiyuan\\conf\\appearance\\themes\\noob\\script\\service\\UI\\preload.js',
                    nativeWindowOpen: true,
                    nodeIntegration: true,
                    webviewTag: true,
                    webSecurity: false,
                    contextIsolation: false,
                },
            }
        )
        //使host能够使用remote模块
        require("@electron/remote").require("@electron/remote/main").enable(serverHost.webContents)
        //host挂载到实例中
        this.host=host
    }
}
export default serverHost