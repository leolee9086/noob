import { blockHandler } from "../public/blockHandler.js"
import { 窗口配置器 } from "../ui/page.js";
export class 主题插件 {
  constructor(option) {
    this.name = option.name;
    naive.plugins[this.name] = this;
    console.log(`${this.name}插件启用`);
    this.app = naive;
    this.blockHandler=new blockHandler()
    this.窗口配置器 = 窗口配置器
    this.kernalApi = naive.kernalApi
    this.核心api = naive.核心api
    this.express = naive.express
    this.publishSever= naive.publishSever
    this.发布渲染器 =naive.发布渲染器
    this.publishoption=naive.publishoption
    this.baseURL= `${naive.插件文件夹url}/${this.name}/`
    this.basePath=`${naive.workspaceDir}\\conf\\appearance\\themes\\naive\\plugins\\${this.name}\\`
    this.消息广播器 = new BroadcastChannel(this.name)
    this.BroadcastChannel = this.消息广播器
    console.log(this.BroadcastChannel)
    if(this.onBroadcastMassage){
     this.消息广播器.onmessage= this.onBroadcastMassage
    }
  }
  onBroadcastMassage(evt){
  }
  注册顶栏按钮(option) {
    let {提示,图标,回调函数} =option
    let button = document.createElement("div");
    button.innerHTML = naive.dom模板.顶栏按钮(提示,图标)
    button.setAttribute("class", "fn__flex");
    let toolbar = document.getElementById("toolbar");
    let windowControls = document.getElementById("windowControls");
    setTimeout(() => toolbar.insertBefore(button, windowControls), 0);
    console.log(button);
    button.addEventListener("click", 回调函数.bind(this));
    }
    注册竖线菜单项目(数据值, 菜单图标, 菜单文字, 回调函数, 唤起词列表) {
      naive.竖线菜单设置.菜单项目列表.push({
        数据值: 数据值,
        菜单图标: 菜单图标,
        菜单文字: 菜单文字,
        回调函数: 回调函数,
        唤起词列表: 唤起词列表,
        注册插件:this

      });
      唤起词列表.forEach((唤起词) => {
        let 唤起词最大长度 = Math.max(
          唤起词.length,
          naive.竖线菜单设置.唤起词最大长度
        );
        // console.log(唤起词最大长度)
        naive.竖线菜单设置["唤起词最大长度"] = 唤起词最大长度;
      });
    }
  注册块标菜单(option) {
    let 自定义块标菜单 = this.app.自定义块标菜单;
    let { 块类型, 菜单文字, 菜单图标, 回调函数,显示判断函数 } = option;
    自定义块标菜单[块类型] ? null : (自定义块标菜单[块类型] = {});
    自定义块标菜单[块类型][菜单文字]
      ? null
      : (自定义块标菜单[块类型][菜单文字] = {});
    自定义块标菜单[块类型][菜单文字]["回调函数"] = 回调函数;
    自定义块标菜单[块类型][菜单文字]["菜单文字"] = 菜单文字;
    自定义块标菜单[块类型][菜单文字]["菜单图标"] = 菜单图标;
    自定义块标菜单[块类型][菜单文字]["注册插件"] = this;
    自定义块标菜单[块类型][菜单文字]["显示判断函数"] = 显示判断函数;

  }
  注册图标(option){
    this.app.注册图标(option)
  }
  注册头图按钮(option){
    this.app.自定义头图菜单[option.type]=option
  }
  注册快捷键(快捷键字符串,回调函数){
    this.app.全局快捷键监听器.on(快捷键字符串,回调函数)
  }
  停用(){
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
  加载窗口(url, windowParams,closeCallback) {
    if (require) {
    //  console.log(this.app)
     // let name =windowParams.name?windowParams.name:url
     // naive.子窗口[name] ?()=>{naive.子窗口[name].close()}:null
      const { BrowserWindow } = require("@electron/remote");
      // 新建窗口(Electron 环境)
      url= this.url格式化(url)
      let newWin = new BrowserWindow(windowParams);
      newWin.loadURL(url.href);
     // newWin.name = name;
      newWin.onClose = 
     // naive.子窗口[name] = newWin
      newWin.on('closed', () => {
        closeCallback?setTimeout(async () => closeCallback(newWin), 0):null
       // naive.子窗口[newWin.name] = null
        newWin = null;
        console.log(naive)
      })

    }
    else{
        window.open(url)
    }
  }
  //来自dark+主题 https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus
  正则(){
      return{
             // 正则表达式
             url: /^siyuan:\/\/blocks\/(\d{14}\-[0-9a-z]{7})\/*(?:(?:\?)(\w+=\w+)(?:(?:\&)(\w+=\w+))*)?$/, // 思源 URL Scheme 正则表达式
             time: /^(\d+)(:[0-5]?[0-9]){0,2}(\.\d*)?$/, // 时间戳正则表达式
             id: /^\d{14}\-[0-9a-z]{7}$/, // 块 ID 正则表达式
             fontsize: /(?<=\.b3-typography|protyle-wysiwyg|protyle-title\s*\{\s*font-size\s*:\s*)(\d+)(?=px(?:\s+\!important)?(?:\s*;|\}))/,
             winpath: /^\/\w\:\/.*$/, // Windows 路径正则表达式
             inboxid: /^\d{13}$/, // 收集箱 ID 正则表达式
      }
  }
  //来自dark+主题 https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus
  url格式化 (url, ssl = true) {
    switch (true) { // 格式化 URL
        case url.startsWith('assets/'):
        case url.startsWith('widgets/'):
        case url.startsWith('emojies/'):
        case url.startsWith('appearance/'):
        case url.startsWith('export/'):
            return new URL(`${window.location.origin}/${url}`);
        case url.startsWith('//'):
            return new URL(`${ssl ? 'https' : 'http'}:${url}`);
        case url.startsWith('/'):
            return new URL(`${window.location.origin}${url}`);
        case url.startsWith('http://'):
        case url.startsWith('https://'):
            return new URL(url);
        default:
            return new URL(`${ssl ? 'https' : 'http'}://${url}`);
    }
  }
}
export {主题插件 as plugin} 