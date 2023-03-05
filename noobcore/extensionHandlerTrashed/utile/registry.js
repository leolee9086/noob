//使用一个iframe来引入组件代码,避免污染主窗口全局变量
let windowProxy = document.createElement('div')
let fs = require('fs-extra')
//src属性设置为空是为了避免跨域
windowProxy.innerHTML = `<iframe 
src="" 
nodeintegration 
webpreferences="nodeIntegration= 1,contextIsolation=false"
style="display:none"></iframe>`
windowProxy = windowProxy.querySelector("iframe")
document.body.append(windowProxy)
let registry = windowProxy.contentWindow
registry.setID = (id) => {
    windowProxy.setAttribute("id", id)
}
registry.config = {}
//iframe绑定设置路径
registry.bindConfig = (configPath) => {
    let config
    try {
        config = fs.readJSONSync(configPath)
    } catch (e) {
        console.error(e)
    }
    if (config) {
        if (windowProxy.getAttribute("configPath") !== configPath) {
            windowProxy.setAttribute("configPath", configPath)
        }
        registry.config = config
    }
}
registry.setValue = (key, value) => {
    if (registry.config.hasOwnProperty(key)) {
        registry.config[key] = value ? true : false
    }
}
registry.getKey = (key, value) => {
    if (registry.config.hasOwnProperty(key)) {
        return registry.config[value]
    }
}
registry.loadDir = (dirname) => {
    if (windowProxy.getAttribute("configPath")) {
        registry.bindConfig(windowProxy.getAttribute("configPath"))
    } else {
        registry.config = {}
    }
    if (fs.existsSync(dirname)) {
        let fileList = fs.readdirSync(dirname)
        let func = () => {
            registry.dirname = dirname
            registry.registry = {}
            registry.require = require
            registry.__dirname = "D:\\newSiyuan\\data\\urlActions"
            registry.__filename = "D:\\newSiyuan\\data\\urlActions\\ceshi.js"
            registry.siyaunUI = registry.parent
            registry.process = process
            fileList.map(
                (name) => {
                    if (!registry.config.hasOwnProperty(name)) {
                        registry.config[name] = false
                    }

                    if (name.endsWith('.js')) {
                        let scriptEL = registry.document.createElement('script')
                        scriptEL.setAttribute('type', 'module')
                        scriptEL.innerHTML =
                            `
                        await  import("${dirname.replace(/\\/g, "/")}"+'/'+"${name}").then(
                                module=>{
                                    if(!module["default"]){
                                        throw("文件必须有名为default的导出")
                                        return
                                    }
                                    window["${name}"]=module["default"]
                                    window["${name}"].dirname="${dirname.replace(/\\/g, "/")}"
                                    window["${name}"].filename="${dirname.replace(/\\/g, "/")}"+'/'+"${name}"
                                    window.addEventListener("beforeunload", window["${name}"]["beforeDestroied"])
                                    console.log(\`加载${dirname.replace(/\\/g, "/") + '/' + name}成功\`)
                                }
                            ).catch(e=>
                                {
                                    throw(e)
                                }
                         )
                        `
                        registry.document.body.append(scriptEL)
                    }
                }
            )
        }
        //当组件文件夹有变动的时候自动重新加载所有组件
        fs.watch(dirname, () => {
            registry.location.reload()
            windowProxy.remove()
            windowProxy.contentWindow
            windowProxy = document.createElement('div')
            windowProxy.innerHTML = `<webview 
            src="" 
            nodeintegration 
            disablewebsecurity=true
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
}
export default registry