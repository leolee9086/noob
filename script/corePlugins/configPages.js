import { 主题插件 } from "../../script/app/plugin.js";
class configPages extends 主题插件 {
  constructor() {
    super({ name: "configPages" });
    console.log(window)
    let option = {
      提示: "打开服务器设置窗口",
      图标: "iconPublish",
      回调函数:()=> this.打开服务器设置窗口(),
    };
    this.注册顶栏按钮(option);
  }
  打开服务器设置窗口() {
    let option = {
        width: 800,
        height: 600,
        alwaysOnTop: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      };
      
    this.加载窗口(
      "http://192.168.0.9:6806/appearance/themes/naive/pages/serverconfig.html",
      option
    );
  }
  加载窗口(url, windowParams, closeCallback) {
    if (require) {
        const { BrowserWindow } = require("@electron/remote");
        // 新建窗口(Electron 环境)
        let newWin = new BrowserWindow(windowParams);
        newWin.loadURL(url);
        newWin.name = "name";     
    }
  }
}
new configPages()