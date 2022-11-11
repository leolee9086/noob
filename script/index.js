//这里是第一次引入requireHacker,纯粹是为了它的副作用,扩展window.require
import requireHacker from "./util/requireHacker.js"
//这里包含了一些基础配置
import { 创建设置文件夹, 创建服务文件夹, 安装基础依赖 } from "./util/firstInstall.js"
import { 升级核心服务 } from "./serviceHandler/util/installer.js"
import { 启动核心服务, 启动配置服务,启动挂件服务, 监听服务添加 } from "./serviceHandler/util/launcher.js"
import { noob设置文件路径 } from "./util/constants.js"
import clear from "./serviceHandler/util/clear.js"

//刷新后清理掉所有后台正在运行的服务
clear()
export default class noob {
    constructor() {
        if (window.require) {
            this.校验是否第一次安装()
            this.校验是否开发模式()
            this.vite服务列表 = []
            this.常规服务列表 = []
            if (this.第一次安装) {
                监听服务添加()

                this.初始化()
            }
            else {
                监听服务添加("viteService",this.vite服务列表)
                this.启动()
            }
        }
    }

    校验是否开发模式() {

        this.开发模式 = window.noobDevMode ? true : false
    }
    校验是否第一次安装() {
        const fs = require("fs-extra")
        this.第一次安装 = !fs.existsSync(noob设置文件路径)
    }
    async 初始化() {
        await 创建设置文件夹()
        await 创建服务文件夹()
        await 安装基础依赖()
        await this.启动()
    }
    async 启动() {
        await 升级核心服务()
        this.核心服务组 = await 启动核心服务()
        await 启动配置服务()
        await 启动挂件服务()
    }
    /*   加载api() {
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
               module.__dirname = this.public.status.workspaceDir + '/conf/appearance/themes/noob/script'
           }
           this.selfPath = this.public.status.workspaceDir + '/conf/appearance/themes/noob/script'
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
               this.public.config.backend.filesys.workspaceDir + `/conf/appearance/themes/noob`, option, (type, fileName) => {
                   if (!standalone && watchFiletypes && watchFiletypes.indexOf(获取文件扩展名(fileName)) >= 0) {
                       重新加载界面()
                   }
               }
           )
       }*/
}
new noob()