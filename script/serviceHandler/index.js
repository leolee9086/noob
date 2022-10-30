import Button from "./UI/button.js"
const { EventEmitter } = require("stream")
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
const path = require("path")
const fs = require("fs")
const appDir = path.dirname(app.getAppPath())
let createServiceHost = (icon) => {
    let serverHost = new BrowserWindow(
        {
            width: screen.getPrimaryDisplay().size.width / 2,
            height: screen.getPrimaryDisplay().workAreaSize.height / 2,
            frame: true,
            icon: icon||path.join(appDir, 'stage', 'icon-large.png'),
            show: false,
            webPreferences: {
                preload: 'D:\\newSiyuan\\conf\\appearance\\themes\\naive\\script\\serviceHandler\\UI\\preload.js',
                nativeWindowOpen: true,
                nodeIntegration: true,
                webviewTag: true,
                webSecurity: false,
                contextIsolation: false,
            },
        }
    )
    window.addEventListener('beforeunload', () => {
        serverHost.close()
        serverHost.webContents.destroy
        serverHost.webContents.send("重新加载", {})

    })
    serverHost.webContents.send("setGlobal", { key: "appDir", value: appDir })

    require("@electron/remote").require("@electron/remote/main").enable(serverHost.webContents)
    return serverHost
}
export default class naiveService extends EventEmitter {
    constructor(_path, option) {
        super()
        this.option = option
        if (_path.endsWith('index.html')) {
            _path = path.dirname(_path)
        }
        this.hosts = []
        this.id = _path
        if(fs.existsSync(path.join(_path, "favicon.png"))){
            this.icon = path.join(_path, "favicon.png")
        }else if(fs.existsSync(path.join(_path, "favicon.ico"))){
            this.icon = path.join(_path, "favicon.ico")
        }else if(fs.existsSync(path.join(_path, "favicon.svg"))){
            this.icon = path.join(_path, "favicon.svg")
        }else{
            this.icon = path.join(appDir, 'stage', 'icon-large.png')
        }
        let serverHost = createServiceHost(this.icon)
        this.serverHost = serverHost

        this.button = new Button(this.id,  this.icon, this)
        serverHost.webContents.on('did-finish-load', () => {
            if (!serverHost) {
                return
            }

        })
        ipcMain.on('服务启动完成', (event, msg) => {
            try {
                console.log(msg)
                this.emit("服务启动完成",msg)
            } catch (e) {
                console.log(e)
            }
        })
        this.自杀计数 = 0
        ipcMain.on(this.id, (event, msg) => {
            this.自杀计数 = 0
        })
        this.path = _path
        if (option.url) {
            this.url = option.url
        } else {
            this.url = this.path
        }
        this.加载服务界面()
        this.加载脚本()
        this.开始自杀计数()
        if (option && option.show) {
            this.是否显示界面 = true
            this.显示界面()
        }
        this.serverHost.webContents.on("close", () => {
            this.destoyed = true
            this.button.remove()
            if (option && option.stayAlive) {
                this.重新初始化()
            }
        })
        this.serverHost.webContents.on("destoyed", () => {
            this.destoyed = true
            this.button.remove()
            if (option && option.stayAlive) {
                this.重新初始化()
            }
        })
    }
    自杀计数器 = () => {
        this.自杀计数 += 1
        if (this.destoyed) {
            this.自杀计数 = -1
            if (this.option && this.option.stayAlive) {
                this.重新初始化()
            }
            return
        }
        if (this.自杀计数 >= 5) {
            console.log(`服务${this.path}失联,重新启动`)
            if (this.serverHost && !this.destoyed) {
                this.serverHost.close()
                this.serverHost = undefined
            }
            this.自杀计数 = -1
            clearInterval(this.自杀计数器)
            this.重新初始化()
        }
    }
    开始自杀计数() {
        let that = this
        clearInterval(that.自杀计数器)
        setInterval(
            that.自杀计数器,
            1000
        )
    }
    重新初始化() {
        if (!this.destoyed) {
            return
        }
        let serverHost = createServiceHost()
        this.serverHost = serverHost
        serverHost.webContents.on('did-finish-load', () => {
            if (!serverHost) {
                return
            }
        })
        ipcMain.on('服务启动完成', (event, msg) => {
            try {
                this.emit("服务启动完成",msg)

                console.log(msg)

            } catch (e) {
                console.log(e)
            }
        })
        this.自杀计数 = 0
        this.加载服务界面()
        if (this.是否显示界面) {
            this.显示界面()
        }
        this.button.setColor('success')
        this.destoyed = false
        this.serverHost.webContents.on("close", () => {
            this.destoyed = true
            this.button.remove()
        })
        this.serverHost.webContents.on("destoyed", () => {
            this.destoyed = true
            this.button.remove()
        })
    }
    改变可见性() {
        if (this.destoyed) {
            return
        }
        else {
            if (this.serverHost.isVisible()) {
                this.serverHost.hide()
                this.button.setColor('info')

            } else {
                this.serverHost.show()
                this.button.setColor('success')
            }

        }
    }
    加载服务界面() {
        if (fs.existsSync(this.path+'/index.html')) {
            console.log(this.option)
            try {
                if(this.option&&!this.option.widget){
                this.serverHost.loadURL(this.path+'/index.html')
                }else{
                    console.log("http://"+"127.0.0.1:"+window.location.port+`/widgets/${this.path.split('\\').pop()}/index.html`)
                    let url =new URL("http://"+"127.0.0.1:"+window.location.port+`/widgets/${this.path.split('\\').pop()}/index.html`)
                    this.serverHost.loadURL(url.href)
                }
                this.serverHost.send("id", this.id)
            } catch (e) {
                console.error(e)
            }
        } else {
            throw (`${this.path}下不存在index或者index.html,请检查`)
        }
    }
    加载脚本(filePath) {
        if (fs.existsSync(filePath)) {
            this.serverHost.webContents.send('加载脚本', filePath)
        }
    }
    显示界面() {
        if (!this.serverHost.isVisible()) {
            this.serverHost.show()
        }
    }
    隐藏界面() {
        if (this.serverHost.isVisible()) {
            this.serverHost.hide()
        }
    }
}