import NaiveServer from "./server/index.js"
import FileSys from "./fileSys/index.js";
import DBS from "./dataBase/index.js"
import { npmCmd, shellCmd } from "./util/shell.js";
import urlScheme from "./urlScheme/index.js"
const { join } = require("path")
export default class NaiveBackend {
    constructor(naive) {
        this.naive = naive
        let config = naive.public.config
        this.standalone = config.backend.filesys.standalone
        this.watchFiletypes = config.backend.filesys.watchFiletypes
        this.workspaceDir = config.backend.filesys.workspaceDir
        this.初始化文件系统()
        this.创建配置桥()
        this.初始化系统事件监听器()
        this.初始化服务器()
       // this.初始化新窗口()
    }
    async 初始化新窗口() {
        //如果是主窗口,那么就打开一个新窗口
        if (!window.notMain) {
            const { BrowserWindow, screen, app, Menu } = require("@electron/remote");
            const path = require("path");
            const appDir = path.dirname(app.getAppPath())

            const remote = require("@electron/remote");
            let defaultWidth, defaultHeight, workArea
            try {
                defaultWidth = screen.getPrimaryDisplay().size.width * 4 / 5
                defaultHeight = screen.getPrimaryDisplay().workAreaSize.height * 4 / 5
                workArea = screen.getPrimaryDisplay().workArea
            } catch (e) {
                console.error(e)
            }

            // 新建窗口(Electron 环境)new BrowserWindow()
            const windowState = Object.assign({}, {
                isMaximized: true,
                fullscreen: false,
                isDevToolsOpened: false,
                x: 0, y: 0,
                width: defaultWidth,
                height: defaultHeight,
            }, {})

            let x = windowState.x
            let y = windowState.y
            if (workArea) {
                // 窗口大小等同于或大于 workArea 时，缩小会隐藏到左下角
                if (windowState.width >= workArea.width || windowState.height >=
                    workArea.height) {
                    windowState.width = Math.min(defaultWidth, workArea.width)
                    windowState.height = Math.min(defaultHeight, workArea.height)
                }
                if (x > workArea.width) {
                    x = 0
                }
                if (y > workArea.height) {
                    y = 0
                }
            }
            if (windowState.width < 400) {
                windowState.width = 400
            }
            if (windowState.height < 300) {
                windowState.height = 300
            }
            if (x < 0) {
                x = 0
            }
            if (y < 0) {
                y = 0
            }

            let windowParams = {
                show: true,
                backgroundColor: '#FFF', // 桌面端主窗体背景色设置为 `#FFF` Fix https://github.com/siyuan-note/siyuan/issues/4544
                width: windowState.width,
                height: windowState.height,
                x,
                y,
                fullscreenable: true,
                fullscreen: windowState.fullscreen,
                webPreferences: {
                    nodeIntegration: true,
                    nativeWindowOpen: true,
                    webviewTag: true,
                    webSecurity: false,
                    contextIsolation: false,
                    preload: join(this.workspaceDir, '/conf/appearance/themes/naive/script/backend/newWin/index.js')
                },
                frame: 'darwin' === process.platform,
                titleBarStyle: 'hidden',
                icon: path.join(appDir, 'stage', 'icon-large.png'),
            }
            var newWin = new BrowserWindow(windowParams);
            /*const remoteMain = remote.require("@electron/remote/main");
            remoteMain.enable(newWin.webContents);
            /*   newWin.webContents.userAgent = 'SiYuan/' + "2.3.4 "+
                   ' https://b3log.org/siyuan Electron'
   
            /*   // 发起互联网服务请求时绕过安全策略 https://github.com/siyuan-note/siyuan/issues/5516
               newWin.webContents.session.webRequest.onBeforeSendHeaders(
                   (details, cb) => {
                       if(!details.url){
                           return
                       }
                       if (-1 < details.url.indexOf('bili')) {
                           // B 站不移除 Referer https://github.com/siyuan-note/siyuan/issues/94
                           cb({ requestHeaders: details.requestHeaders })
                           return
                       }
                       if(!details.requestHeaders){
                           return
                       }
   
                      /* for (let key in details.requestHeaders) {
                           if ('referer' === key.toLowerCase()) {
                               delete details.requestHeaders[key]
                           }
                       }*/
            /*   cb({ requestHeaders: details.requestHeaders })
           })
 /*      newWin.webContents.session.webRequest.onHeadersReceived((details, cb) => {
           for (let key in details.responseHeaders) {
               if ('x-frame-options' === key.toLowerCase()) {
                   delete details.responseHeaders[key]
               } else if ('content-security-policy' === key.toLowerCase()) {
                   delete details.responseHeaders[key]
               } else if ('access-control-allow-origin' === key.toLowerCase()) {
                   delete details.responseHeaders[key]
               }
           }
           cb({ responseHeaders: details.responseHeaders })
       })*/

            /*   newWin.webContents.on('did-finish-load', () => {
                  
                       if (newWin.isMinimized()) {
                           newWin.restore()
                       }
                       if (!newWin.isVisible()) {
                           newWin.show()
                       }
                       newWin.focus()
                       /*setTimeout(() => { // 等待界面js执行完毕
                           writeLog(siyuanOpenURL)
                           newWin.webContents.send('siyuan-openurl', siyuanOpenURL)
                           siyuanOpenURL = null
                       }, 2000)*/

            /*})*/



            // 新窗口准备好之后就加载
           /* newWin.once('ready-to-show', () => {
                    newWin.show()
                /* if (windowState.isMaximized) {
                     newWin.maximize()
                 } else {
                     newWin.unmaximize()
                 }*/
            //})

            // 加载主界面
            newWin.loadURL('http://127.0.0.1:6806/appearance/themes/naive/script/frontend/index.html'/*?v= +
             
            new Date().getTime()*/)
                newWin.webContents.openDevTools({ mode: 'bottom' })

            // 菜单
            /*   const productName = 'SiYuan'
               const template = [
                   {
                       label: productName,
                       submenu: [
                           {
                               label: `About ${productName}`,
                               role: 'about',
                           },
                           { type: 'separator' },
                           { role: 'services' },
                           { type: 'separator' },
                           {
                               label: `Hide ${productName}`,
                               role: 'hide',
                           },
                           { role: 'hideOthers' },
                           { role: 'unhide' },
                           { type: 'separator' },
                           {
                               label: `Quit ${productName}`,
                               role: 'quit',
                           },
                       ],
                   },
                   {
                       role: 'editMenu',
                       submenu: [
                           { role: 'cut' },
                           { role: 'copy' },
                           { role: 'paste' },
                           { role: 'pasteAndMatchStyle', accelerator: 'CmdOrCtrl+Shift+C' },
                           { role: 'selectAll' },
                       ],
                   },
                   {
                       role: 'viewMenu',
                       submenu: [
                           { role: 'resetZoom' },
                           { role: 'zoomIn', accelerator: 'CommandOrControl+=' },
                           { role: 'zoomOut' },
                       ],
                   },
                   {
                       role: 'windowMenu',
                       submenu: [
                           { role: 'minimize' },
                           { role: 'zoom' },
                           { role: 'togglefullscreen' },
                           { type: 'separator' },
                           { role: 'toggledevtools' },
                           { type: 'separator' },
                           { role: 'front' },
                       ],
                   },
               ]
               const menu = Menu.buildFromTemplate(template)
               Menu.setApplicationMenu(menu)*/
            // 当前页面链接使用浏览器打开
            /*newWin.webContents.on('will-navigate', (event, url) => {
                if (url&&url.startsWith('http://127.0.0.1:6806')) {
                    return
                }
                event.preventDefault()
          //      shell.openExternal(url)
            })*/

            /* newWin.on('close', (event) => {
                 if (newWin && !newWin.isDestroyed()) {
                     newWin.webContents.send('siyuan-save-close', false)
                 }
                 event.preventDefault()
             })*/

        }
    }
    async 初始化系统事件监听器() {
        //const rubickPath  =this.workspaceDir+'/conf/appearance/themes/naive/script/backend/rubickAdapter/index.js'
        //这里会造成刷新后主界面假死，应该让它在另一个渲染进程中运行。
        if (window.notMain) {
            let rubickAdapter = require(join(this.workspaceDir, '/conf/appearance/themes/naive/script/backend/rubickAdapter/index.js'))
            let api = await rubickAdapter.getAPI()
            console.log(rubickAdapter)
            const register = api.setEventChannel({
                device: 'KeyBoard',
                action: 'Press',
            })
            register('myeventchannel', (e) => {
                console.log(e)
                switch (e.info) {
                    case "Alt":
                        window.naive.AltPressed = true
                        break
                    case "Ctrl":
                        window.naive.CtrlPressed = true
                        break

                    case "Num5":
                        if (window.naive.AltPressed) {
                            const localNotebookId = window.localStorage.getItem("local-dailynoteid");
                            if (localNotebookId) {
                                fetch("/api/filetree/createDailyNote", {
                                    method: "post",
                                    body: JSON.stringify({
                                        notebook: localNotebookId
                                    })
                                });
                            }
                        }
                        break
                    case "F5":
                        if (window.naive.CtrlPressed) {
                            window.location.reload()
                        }


                }

            })

            console.log(api.hasEventChannel('myeventchannel'), api.allEventChannels())
            window.rubickAdapter = rubickAdapter
        }
        //shellCmd('node',rubickPath,"")*/
    }
    创建配置桥() {
        let json = {
            server: {
                port: this.naive.public.config.backend.server.port,
                location: this.naive.public.config.backend.server.location
            }
        }
        let fs = requireInstall('fs-extra')
        //创建配置桥文件,方便前端获取后端地址
        fs.writeFileSync(`${this.workspaceDir}/conf/appearance/themes/naive/confBridge.json`, JSON.stringify(json))
    }
    初始化文件系统() {
        this.fileSys = new FileSys(this.naive)
    }
    初始化服务器() {
        try {
            this.server = new NaiveServer(naive)
            this.server.开始服务()
            this.api = this.server.api
        } catch (e) {
            console.error(e)
        }
    }
}