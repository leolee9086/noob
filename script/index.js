//这里是第一次引入requireHacker,纯粹是为了它的副作用,扩展window.require
import requireHacker from "./util/requireHacker.js"
import { 获取文件扩展名 } from "./util/file.js"
//开发过程中修改文件后重启
import 重新加载界面 from "./util/reload.js"
//用于执行npm命令等
import { 命令行工具, npm命令行工具 } from "./util/shell.js"
//用于清理窗口
import clear from "./serviceHandler/util/clear.js"
//刷新后清理掉所有后台正在运行的服务
clear()
export default class naive {
    constructor(options) {
        this.frontend = {}
        this.backend = {}
        this.public = {
            config: options,
            status: {
                ifDefOptions: {}
            }
        }
        this.doc = {}
        if (window.require) {
            require.setExternalDeps(this.public.config.backend.filesys.workspaceDir + `/conf/naiveConf/deps/node_modules`)
            require.setExternalDeps(this.public.config.backend.filesys.workspaceDir + `/conf/appearance/themes/naive/script/node_modules`)
            require.setExternalBase(this.public.config.backend.filesys.workspaceDir + `/conf/naiveConf/deps`)
        }
        this.合并设置()
       // this.开始监听文件修改()
        this.加载内部服务()
        this.加载挂件服务()
    }
    加载api() {
        window.SIYUAN_VERSION="2.4.7"
        window.NODE_ENV={}
        this.SSCService.on(
            "服务启动完成",()=>{
                import("http://127.0.0.1:6809/siyuan/src/api.ts").then(
                    module => {
                        window.siyuan.api=new module["default"]()
                    }
                )
    
            }
        )
       
    }
    合并设置() {
        if (window.siyuan) {
            this.public.status.workspaceDir = window.siyuan.config.system.workspaceDir
            this.siyuan = window.siyuan
            module.__dirname = this.public.status.workspaceDir + '/conf/appearance/themes/naive/script'
        }
        this.selfPath = this.public.status.workspaceDir + '/conf/appearance/themes/naive/script'
    }
    加载内部服务() {
        let that = this
        //naive的中间层服务器和文件系统
        import("./serviceHandler/index.js").then(
            module => {
                that.SSCService = new module["default"](
                    this.public.status.workspaceDir + '/conf/appearance/themes/naive/script/coreServicies/compiler/',
                    {
                        show: false,
                        stayAlive: true,
                        widget: false
                    }
                )
                this.加载api()
                that.publishService = new module["default"](
                    this.public.status.workspaceDir + '/conf/appearance/themes/naive/script/coreServicies/publishServer/',
                    {
                        show: false,
                        stayAlive: true,
                    }
                )
                that.viteService = new module["default"](
                    this.public.status.workspaceDir + '/conf/appearance/themes/naive/script/coreServicies/viteServer/',
                    {
                        show: false,
                        stayAlive: false,
                    }
                )
            }
        )
    }
    加载挂件服务() {
        const fs = require("fs")
        const path = require('path')
        fetch("/api/search/searchWidget", { method: "POST", body: JSON.stringify({ k: "" }) }).then(res => {
            return res.json()
        }).then(
            json => {
                console.log(json.data)
                json.data.blocks.forEach(widget => {
                    let widgetPath = path.join(this.public.status.workspaceDir, 'data', "widgets", widget.content, 'index.html')
                    let preloadPath = path.join(this.public.status.workspaceDir, 'data', "widgets", widget.content, 'preload.js')
                    if (fs.existsSync(widgetPath) && fs.existsSync(preloadPath)) {
                        import("./serviceHandler/index.js").then(
                            module => {
                                new module["default"](
                                    widgetPath,
                                    {
                                        show: false,
                                        stayAlive: false,
                                        widget: true,
                                        preload: preloadPath
                                    }
                                )
                            }
                        )
                    }
                });
            }
        )
    }
    开始监听文件修改() {
        let fs = require("fs")
        let standalone = this.standalone
        let watchFiletypes = this.watchFiletypes = this.public.config.backend.filesys.watchFiletypes
        const option = {
            persistent: true,
            recursive: true,
        };
        this.文件监听器 = fs.watch(
            this.public.config.backend.filesys.workspaceDir + `/conf/appearance/themes/naive`, option, (type, fileName) => {
                if (!standalone && watchFiletypes && watchFiletypes.indexOf(获取文件扩展名(fileName)) >= 0) {
                    重新加载界面()
                }
            }
        )
    }
}