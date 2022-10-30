
import requireHacker from "../../../util/requireHacker.js"
require.setExternalDeps(workspaceDir + `/conf/naiveConf/deps/node_modules`)
require.setExternalDeps(workspaceDir + `/conf/appearance/themes/naive/script/node_modules`)
require.setExternalDeps(workspaceDir + `/conf/naiveConf/deps`)

const vite = require("vite")
const fs = require("fs-extra")
const _path = require("path")
const express = require("express")
console.log(vite)
export default class viteServer {
    viteWidgets = {}
    constructor(path) {
        if (!fs.existsSync(_path.join(path, "vite.config.js"))) {
            console.warn(`${path}下没有vite.config.js`)
            return
        }
        this.createServer(path)
    }
    async createServer(path, port) {
        this.server = await vite.createServer({
            configFile: _path.join(path, "vite.config.js"),
            root: path,
        })
        console.log(this.server)
        try { await this.server.listen(port || "3000") } catch (e) {
            console.error(e)
        }
    }
    async initWidgetsServer() {
        let json = await fetch("http://127.0.0.1:6806/api/search/searchWidget", { method: "POST", body: JSON.stringify({ k: "" }) }).then(res => {
            return res.json()
        })
            console.log(json.data)
            json.data.blocks.forEach(widget => {
                let widgetPath = _path.join(workspaceDir, 'data', "widgets", widget.content, 'index.html')
                let configpath = _path.join(workspaceDir, 'data', "widgets", widget.content, 'vite.config.js')
                if (fs.existsSync(widgetPath) && fs.existsSync(configpath)) {
                    this.viteWidgets[widget.content] = true
                }
            });
            console.log(this.viteWidgets)
        

    }
    async startWidgetServer(widget) {
        console.log(widget)
        if (this.viteWidgets && this.viteWidgets[widget]) {
            console.log(widget)
            await this.createServer(_path.join(workspaceDir, 'data', "widgets", widget))
        }
    }
} 