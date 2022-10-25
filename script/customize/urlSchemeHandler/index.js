
import { kernelApiList } from "../../public/kernelApi.js"
import registry from  "../utile/registry.js"
let path =require("path")
let 思源核心api = new kernelApiList()
let webContent = require("@electron/remote").getCurrentWebContents()
let { ipcRenderer } = require("electron")
let fs = require('fs')
let actionDir = window.siyuan.config.system.dataDir + '/urlActions'
registry.setID("urlSchemeRegistry")
registry.bindConfig('D:\\newSiyuan\\conf\\naiveConf\\config\\urlScheme.json')

registry.loadDir(actionDir)
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
            if (action && registry[action] && registry[action]['handeler']) {
                registry[action]['handeler'](data)
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
