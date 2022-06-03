import { blockHandler } from "../public/blockHandler.js"
import { 窗口配置器 } from "./ui/page.js";

export class 主题插件 {
  constructor(option) {
    this.name = option.name;
    naive.plugins[this.name] = this;
    console.log(`加载${this.name}插件`);
    this.app = naive;
    this.blockHandler=new blockHandler()
    this.窗口配置器 = 窗口配置器
  }
  注册顶栏按钮(option) {
    let {提示,图标,回调函数} =option
    let button = document.createElement("div");
    button.innerHTML = `<div class="toolbar__item toolbar__item--action b3-tooltips b3-tooltips__sw" aria-label="${提示}" id="minWindow">
  <svg>
      <use xlink:href="#${图标}"></use>
  </svg>
  </div>`;
    button.setAttribute("class", "fn__flex");
    let toolbar = document.getElementById("toolbar");
    let windowControls = document.getElementById("windowControls");
    setTimeout(() => toolbar.insertBefore(button, windowControls), 0);
    console.log(button);
    button.addEventListener("click", 回调函数.bind(this));
    }

  注册块标菜单(option) {
    let 自定义块标菜单 = this.app.自定义块标菜单;
    let { 块类型, 菜单文字, 菜单图标, 回调函数 } = option;
    自定义块标菜单[块类型] ? null : (自定义块标菜单[块类型] = {});
    自定义块标菜单[块类型][菜单文字]
      ? null
      : (自定义块标菜单[块类型][菜单文字] = {});
    自定义块标菜单[块类型][菜单文字]["回调函数"] = 回调函数;
    自定义块标菜单[块类型][菜单文字]["菜单文字"] = 菜单文字;
    自定义块标菜单[块类型][菜单文字]["菜单图标"] = 菜单图标;
    自定义块标菜单[块类型][菜单文字]["注册插件"] = this;
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
      const { BrowserWindow } = require("@electron/remote");
      // 新建窗口(Electron 环境)
      url= this.url格式化(url)
      let newWin = new BrowserWindow(windowParams);
      console.log(url)

       newWin.loadURL(url.href);
     // newWin.name = "name";
      console.log(url)
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