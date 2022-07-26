import { 窗口配置器 } from "../public/ui/page.js";
import { 注册顶栏按钮 } from "../public/ui/menu.js"
import { 注册竖线菜单项目 } from "../public/ui/menu.js"
import { 注册块标菜单 } from "../public/ui/menu.js"

export class 主题插件 {
  constructor(option) {
    this.name = option.name;
    naive.plugins[this.name] = this;
    this.app = naive;
    this.workspaceDir=naive.workspaceDir
    this.blockHandler = naive.blockHandler;
    this.窗口配置器 = 窗口配置器;
    this.kernelApi = naive.kernelApi;
    this.核心api = naive.核心api;
    this.express = naive.express;
    this.expressApp = naive.expressApp;
    this.publishServer = naive.publishServer;
    this.发布渲染器 = naive.发布渲染器;
    this.publishoption = naive.publishoption;
    this.baseURL = `${naive.插件文件夹url}/${this.name}/`;
    this.basePath = `${naive.workspaceDir}\\data\\widgets\\naivePlugins\\${this.name}\\`;
    this.消息广播器 = new BroadcastChannel(this.name);
    this.BroadcastChannel = this.消息广播器;
    this.注册顶栏按钮 =  注册顶栏按钮
    this.注册块标菜单 = 注册块标菜单
    this.注册竖线菜单项目 = 注册竖线菜单项目
    this.注册图标= this.app.注册图标
    this.registIcon = this.注册图标
    //用于与插件设置页面通讯
    if (this.onBroadcastMassage) {
      this.消息广播器.onmessage =(msg)=>this.onBroadcastMassage(msg);
    }
  }
  注册导出按钮(导出按钮设置){
    this.app.自定义导出按钮[导出按钮设置.按钮文字]=导出按钮设置
}
  初始化设置(){

  }
  baserequire(rowpath) {
    if(window.require){
    let path =require('path');
    let filePath = path.join(this.basePath, rowpath);
    try{
      require(filePath)
    }catch(e){
      filePath=path.join(this.basePath, `/node_modules/${rowpath}/`);
    }
    return require(filePath);
    }
  }
  //界面api
  注册图标(option) {
    this.app.注册图标(option);
  }
  注册头图按钮(option) {
    this.app.自定义头图菜单[option.type] = option;
  }
  注册快捷键(快捷键字符串, 回调函数) {
    this.app.全局快捷键监听器.on(快捷键字符串, 回调函数);
  }
  停用() {
    naive.停用插件(this);
  }
  运行环境() {
    return naive.isApp;
  }
  注册工具条项目() {}
  编辑器队列() {
    return naive.编辑器队列;
  }
  加载css(option) {
    return naive.加载css(option);
  }
  加载js(option) {
    return naive.加载js(option);
  }
  加载窗口(url, windowParams, closeCallback) {
    if (require) {
      //  console.log(this.app)
      // let name =windowParams.name?windowParams.name:url
      // naive.子窗口[name] ?()=>{naive.子窗口[name].close()}:null
      const { BrowserWindow } = require("@electron/remote");
      // 新建窗口(Electron 环境)
      url = this.url格式化(url);
      let newWin = new BrowserWindow(windowParams);
      newWin.loadURL(url.href);
      // newWin.name = name;
      newWin.onClose =
        // naive.子窗口[name] = newWin
        newWin.on("closed", () => {
          closeCallback
            ? setTimeout(async () => closeCallback(newWin), 0)
            : null;
          // naive.子窗口[newWin.name] = null
          newWin = null;
          console.log(naive);
        });
    } else {
      window.open(url);
    }
  }
  //来自dark+主题 https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus
  正则() {
    return {
      // 正则表达式
      url: /^siyuan:\/\/blocks\/(\d{14}\-[0-9a-z]{7})\/*(?:(?:\?)(\w+=\w+)(?:(?:\&)(\w+=\w+))*)?$/, // 思源 URL Scheme 正则表达式
      time: /^(\d+)(:[0-5]?[0-9]){0,2}(\.\d*)?$/, // 时间戳正则表达式
      id: /^\d{14}\-[0-9a-z]{7}$/, // 块 ID 正则表达式
      fontsize:
        /(?<=\.b3-typography|protyle-wysiwyg|protyle-title\s*\{\s*font-size\s*:\s*)(\d+)(?=px(?:\s+\!important)?(?:\s*;|\}))/,
      winpath: /^\/\w\:\/.*$/, // Windows 路径正则表达式
      inboxid: /^\d{13}$/, // 收集箱 ID 正则表达式
    };
  }
  //来自dark+主题 https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus
  url格式化(url, ssl = true) {
    switch (
      true // 格式化 URL
    ) {
      case url.startsWith("assets/"):
      case url.startsWith("widgets/"):
      case url.startsWith("emojies/"):
      case url.startsWith("appearance/"):
      case url.startsWith("export/"):
        return new URL(`${window.location.origin}/${url}`);
      case url.startsWith("//"):
        return new URL(`${ssl ? "https" : "http"}:${url}`);
      case url.startsWith("/"):
        return new URL(`${window.location.origin}${url}`);
      case url.startsWith("http://"):
      case url.startsWith("https://"):
        return new URL(url);
      default:
        return new URL(`${ssl ? "https" : "http"}://${url}`);
    }
  }
}
export { 主题插件 as plugin };