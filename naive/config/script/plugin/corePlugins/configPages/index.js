export class configPages extends naive.plugin {
  constructor() {
    super({ name: "configPages" });
    this. 窗口设置= {
      width: 800,
      height: 600,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    };
    let 服务器设置图标 = {
      提示: "打开服务器设置窗口",
      图标: "iconPublish",
      回调函数:()=>this.加载窗口("/appearance/themes/naive/pages/serverconfig.html",this.窗口设置),
    };
    this.注册顶栏按钮(服务器设置图标);
    let 插件设置图标 = {
      提示: "打开插件设置窗口",
      图标: "iconPlugin",
      回调函数:()=>this.加载窗口("/appearance/themes/naive/pages/pluginconfig.html",this.窗口设置),
    };
    this.注册顶栏按钮(插件设置图标);
  }
}
