
import { kernelApiList } from "../../public/kernelApi.js"
let 思源核心api = new kernelApiList()
let webContent = require("@electron/remote").getCurrentWebContents()
let { ipcRenderer } = require("electron")
let fs = require('fs')
let actionDir = window.siyuan.config.system.dataDir + '/urlActions', actionList, registry = {}
let windowProxy = document.createElement('div')
windowProxy.innerHTML = `<webview 
src="" 
nodeintegration 
preload="file://D/newSiyuan/conf/appearancer/themes/naive"
webpreferences="nodeIntegration= 1,contextIsolation=false"
style="display:none"></webview>`
windowProxy = windowProxy.querySelector("webview")

document.body.append(windowProxy)

console.log(windowProxy.webpreferences)
console.log(windowProxy.webContents)

windowProxy.contentWindow.siyuan = window.siyuan
registry = windowProxy.contentWindow
ipcRenderer.on("msg", (msg) => console.log(msg))
registry.send = (...args) => webContent.send(...args)
if (fs.existsSync(actionDir)) {
    actionList = fs.readdirSync(window.siyuan.config.system.dataDir + '/urlActions')
    let func = () => {
        // console.log("test")
        registry.actionDir = actionDir
        registry.registry = {}
        registry.require = require
        registry.__dirname = "D:\\newSiyuan\\data\\urlActions"
        registry.__filename="D:\\newSiyuan\\data\\urlActions\\ceshi.js"
        registry.process=process
       // if (registry.document.body.innerHTML) { return }

        actionList.map(
            (name) => {
                if (name.endsWith('.js')) {

                    let scriptEL = registry.document.createElement('script')
                    scriptEL.setAttribute('type', 'module')
                    scriptEL.innerHTML =
                        `
                    console.log(window.parent)
                    await   import("${actionDir.replace(/\\/g, "/")}"+'/'+"${name}").then(
                            module=>{
                                window["${name}"]=module["handler"]
                                window.addEventListener("beforeunload", module["beforeDestroied"])
                                console.log(\`加载动作${actionDir.replace(/\\/g, "/") + '/' + name}成功\`)

                            }
                        ).catch(e=>
                        console.error(\`加载动作${actionDir.replace(/\\/g, "/") + '/' + name}出错\`,e)
                     )
                `
                    registry.document.body.append(scriptEL)
                }
            }
        )
    }
    fs.watch(actionDir, () => {
        registry.location.reload()
        windowProxy.remove()
        windowProxy.contentWindow
        windowProxy = document.createElement('div')
        windowProxy.innerHTML = `<webview 
        src="" 
        nodeintegration 
        disablewebsecurity=true
        preload="file://D/newSiyuan/conf/appearancer/themes/naive"
        webpreferences="nodeIntegration= 1,contextIsolation=true,disablewebsecurity=true"
        style="display:none"></webview>`
        windowProxy = windowProxy.querySelector("webview")
        document.body.append(windowProxy)        
        windowProxy.contentWindow.siyuan = window.siyuan
        registry = windowProxy.contentWindow
        registry.require = window.require
        func()
    })
    func()
}
ipcRenderer.on('siyuan-openurl', (event, msg) => {
    urlScheme.handler(event, msg)
})

const urlScheme = {
    registry: registry,
    handler: async function (event, url) {
        let action = url.replace('siyuan://', "").split('/?')[0]
        let data = urlToJson(url)
        if (action.startsWith('action')) {
            action = action.split('/')[1]
            if (action && registry[action]) {
                registry[action](data)
            }
        }
        else {
            try {
                await 思源核心api[action](data, '', (res) => { console.log(res) })
            } catch (e) {
                console.error(e)
            }
        }
    }
}
function urlToJson(url = window.location.href) {
    let index = url.indexOf('?'),
        params = url.substr(index + 1),
        obj = {}
    if (index != -1) {
        let parr = params.split('&');
        for (let i of parr) {
            let arr = i.split('=');
            if (arr[0]) {
                obj[arr[0]] = decodeURIComponent(arr[1])
            };
        }
    }
    return obj;
}

export default urlScheme
