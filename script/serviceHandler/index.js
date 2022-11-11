//这里需要处理一些边界情况
//1 webcontent已经销毁的时候的处理
import Button from "./UI/button.js"
import MessageBridge from "../messageBridge/index.js"
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
            icon: icon || path.join(appDir, 'stage', 'icon-large.png'),
            show: false,
            webPreferences: {
                preload: 'D:\\newSiyuan\\conf\\appearance\\themes\\noob\\script\\serviceHandler\\UI\\preload.js',
                nativeWindowOpen: true,
                nodeIntegration: true,
                webviewTag: true,
                webSecurity: false,
                contextIsolation: false,
            },
        }
    )
    window.addEventListener('beforeunload', () => {
        try{
        serverHost.close()
        serverHost.webContents.destroy()
        }catch(e){
            console.warn(e)
        }
        serverHost.webContents.send("重新加载", {})

    })
    serverHost.webContents.send("setGlobal", { key: "appDir", value: appDir })

    require("@electron/remote").require("@electron/remote/main").enable(serverHost.webContents)
    return serverHost
}
export default class noobService extends EventEmitter {
    constructor(_path, option) {
        super()
        this.option = option
        if (_path.endsWith('index.html')) {
            _path = path.dirname(_path)
        }
        this.hosts = []
        this.id = _path
        this.path = _path
        this.messageBridge =new MessageBridge(this)
   

        this.messageBridge.handler("msg",(data)=>{
            return data.msg
        })
        //心跳计数
        ipcMain.on(this.id, (event, msg) => {
            this.自杀计数 = 0
        })
        
        //读取图标
        if (fs.existsSync(path.join(_path, "favicon.png"))) {
            this.icon = path.join(_path, "favicon.png")
        } else if (fs.existsSync(path.join(_path, "favicon.ico"))) {
            this.icon = path.join(_path, "favicon.ico")
        } else if (fs.existsSync(path.join(_path, "favicon.svg"))) {
            this.icon = path.join(_path, "favicon.svg")
        } else {
            this.icon = path.join(appDir, 'stage', 'icon-large.png')
        }
        this.button = new Button(this.id, this.icon, this)
        if (option.url) {
            this.url = option.url
        }

        this.初始化()
        this.开始自杀计数()
        let options = {
            persistent: true,
            recursive: true,
        };
        fs.watch(
            this.path, options, (type, fileName) => {
                this.文件被修改 = true
                this.自杀计数 = 10
            }
        )
    }
    绑定事件() {
        let option = this.options
        ipcMain.once('服务启动完成', (event, msg) => {
            try {
                this.emit("服务启动完成", msg)
                console.log(msg)
            } catch (e) {
                console.log(e)
            }
        })
        ipcMain.on("error", (event, msg) => {
            if (msg && msg.服务名&&this.id.indexOf(服务名)) {
                
                this.button.setColor("error")
            }
        })
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
            if (this.文件被修改) {
                console.log(`服务${this.path}源代码改动,重新启动`)
                this.文件被修改 = false
            } else {
                console.log(`服务${this.path}失联,重新启动`)
            }
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
        else {
            this.初始化()
        }
    }
    初始化() {
        let serverHost = createServiceHost(this.icon)
        this.serverHost = serverHost
        serverHost.webContents.on('did-finish-load', () => {
            if (!serverHost) {
                return
            }
        })
        this.自杀计数 = 0
        this.加载服务界面()
        this.加载脚本()
        if (this.是否显示界面) {
            this.显示界面()
        }
        this.button.setColor('success')
        this.destoyed = false
        this.绑定事件()
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
        let indexPath = path.join(this.path, "index.html")
        if (fs.existsSync(indexPath)) {
            try {
                if (this.url) {
                    this.serverHost.loadURL(this.url)
                }
                else if (this.option && !this.option.widget) {
                    this.serverHost.loadURL(indexPath)
                }
                else {
                    console.log("http://" + "127.0.0.1:" + window.location.port + `/widgets/${this.path.split('\\').pop()}/index.html`)
                    let url = new URL("http://" + "127.0.0.1:" + window.location.port + `/widgets/${this.path.split('\\').pop()}/index.html`)
                    this.serverHost.loadURL(url.href)
                }
                this.serverHost.send("id", this.id)
            } catch (e) {
                console.error(e)
            }
        } else {
            this.销毁服务()
            throw (`${this.path}下不存在index或者index.html,请检查`)
        }
    }
    销毁服务() {
        let that = this
        this.button.destroy()
        try{
        this.serverHost.webContents.destroy()
        }catch(e){}
        that = undefined
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
    send(...args) {
        this.serverHost.webContents.send(...args)
    }
}