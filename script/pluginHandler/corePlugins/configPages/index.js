export class configPages extends naive.plugin {
  constructor() {
    super({ name: "configPages", sort: 2 });
    this.窗口设置 = {
      width: 800,
      height: 600,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      },
    };
    let 服务器设置图标 = {
      提示: "打开服务器设置窗口",
      图标: "iconPublish",
      回调函数: () => this.加载窗口(`http://127.0.0.1/configPages/index.vue?type=app`, this.窗口设置),
    };
    this.注册顶栏按钮(服务器设置图标);
    let 服务器设置图标1 = {
      提示: "打开服务器设置窗口",
      图标: "iconPublish",
      回调函数: () => this.加载窗口(`/naivePages/pluginConfig`, this.窗口设置),
    };
    this.注册顶栏按钮(服务器设置图标1);

    let 插件设置图标 = {
      提示: "打开插件设置窗口",
      图标: "iconPlugin",
      回调函数: () => this.加载窗口(`/plugin/corePlugins/configPages/pages/pluginconfig.html`, this.窗口设置),
    };
    this.注册顶栏按钮(插件设置图标);
    ///#ifAPP
    this.初始化配置页面()
    ///#endif
  }

  初始化配置页面() {
    let that= this
    this.describeApi(
      '/', {
      名称: "设置页面",
      功能: "设置页面",
      权限: "public",
      一级分组: "naivePages",
      二级分组: 'base',
      //staticPath模式表示这是一个静态文件访问接口
      mode: "sourcePath",
      dirPath:this.initFolder(),
      //表示不允许通过post接口遍历该文件夹
      allowList: false,
      compilers: {
        css: (filePath, req, res) => {
          res.sendFile(filePath)
        },
        json: (filePath, req, res) => {
          res.sendFile(filePath)
        },
        js: () => {
          res.sendFile(filePath)
        },
      }
    }
    )
  }
}
let dependencies = ['toolbarItem']
export { dependencies }