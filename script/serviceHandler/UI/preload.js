let { ipcRenderer } = require("electron")
let path =require("path")
let fs = require("fs-extra")
let remote = require(path.join(process.resourcesPath,'/app/node_modules',"@electron/remote"))
let {app} =remote
const appDir = path.dirname(app.getAppPath())
const isDevEnv = process.env.NODE_ENV === 'development'
const appVer = app.getVersion()
const confDir = path.join(app.getPath('home'), '.config', 'siyuan')
const windowStatePath = path.join(confDir, 'windowState.json')
const portJSONPath = path.join(confDir, 'port.json')
const workspaceJSONPath= path.join(confDir, 'workspace.json')
window.workspaceDir = fs.readJSONSync(workspaceJSONPath).pop()
ipcRenderer.on("closeAll",()=>{window.close()})
ipcRenderer.on("重新加载", () => { window.close() })
ipcRenderer.on(
    "设置id",(event,msg)=>{
        window.id=msg
    }
)
ipcRenderer.on("id",(event,id)=>{
    window.id = id
})
ipcRenderer.on("加载脚本", (event, path) => {
    if(!document.head.querySelector(`[path='${path}']`)){
    let script = document.createElement("script")
    script.setAttribute('type', 'module')
    script.setAttribute('src', path)
    script.setAttribute('path', path)
    document.head.append(script)
    }
}
)
ipcRenderer.on("setGlobal",(event,data)=>{
    console.log(data)
    if(data&&data.key){
    window[data.key]=data.value
    }
})
window.waitTime = 1000
//开始发送计时信号,超时之后窗口会被关闭
setInterval(
    ()=>{
        ipcRenderer.send(
            window.id,{type:"tickTok"}
        )
    }
    ,window.waitTime
)

window.ipcRenderer = ipcRenderer
window.remote =remote