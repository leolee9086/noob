//这里是第一次引入requireHacker,纯粹是为了它的副作用,扩展window.require
import requireHacker from "./util/requireHacker.js"
//这里包含了一些基础配置
import { 创建设置文件夹, 创建服务文件夹, 安装基础依赖 } from "./util/firstInstall.js"
import { 升级核心服务 } from "./serviceHandler/util/installer.js"
import { 启动核心服务, 启动配置服务, 启动挂件服务, 启动第三方服务, 监听服务添加 } from "./serviceHandler/util/launcher.js"
import { noob设置文件路径 } from "./util/constants.js"
import clear from "./serviceHandler/util/clear.js"
import 创建事件服务器 from "./messageBridge/server.js"
//刷新后清理掉所有后台正在运行的服务
import 主窗口事件桥 from './messageBridge/mainBridge.js'
clear()
export default class noob {
    constructor() {
        if (window.require) {
            //这里是通过校验是否存在config.json或者devConfig.js来判断是否为第一次安装的
            this.校验是否第一次安装()
            this.校验是否开发模式()
            this.vite服务列表 = []
            this.常规服务列表 = []
            if (this.第一次安装) {
                监听服务添加()
                this.初始化()
            }
            else {
                监听服务添加("viteService", this.vite服务列表)
                this.启动()
            }
                    //如果是开发模式就引入并监听test.js,用来快速测试一些功能
        
        import("/snippets/test.js")

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
       await  this.加载api()

        this.事件服务器 = await 创建事件服务器()
        this.event_bridge = new 主窗口事件桥()
        window.eventBridge = this.event_bridge
        this.event_bridge.on("测试",(data)=>{
            console.log(this,data)
        })
        await 升级核心服务()
        //核心服务主要是compiler，用于伺服各个服务的脚本以及提供websocket连接。
        //sypublisher是一个思源的发布服务。
        //vite用于直接伺服vite项目作为服务使用，因为思源在本地运行，所以编译等开支应该是可以接受的。
        //在服务器运行时，可以放行80和443端口用于发布服务
        this.核心服务组 = await 启动核心服务()
        await 启动配置服务()
        await 启动挂件服务()
        await 启动第三方服务()
        
    }
    async 加载api() {
        await import("./noobApi/index.js")
    }
}
new noob()