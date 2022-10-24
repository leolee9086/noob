//路径生成器
//条件加载器
//这里是第一次引入requireHacker,纯粹是为了它的副作用,覆盖掉window.require
import requireHacker from "./backend/util/requireHacker.js"
import naiveLogger from "./logger/index.js"
import { shellCmd, npmCmd } from "./backend/util/shell.js"
import reload from "./util/reload.js"
const module = {}
//import { initNaive } from "./initNaive.js";
//创建naive对象
export default class naive {
  constructor(options) {
    this.frontend = {}
    this.backend = {
    }
    this.public = {
      config: options,
      status: {
        ifDefOptions: {}
      }
    }
    this.doc = {}
    console.log(this)
    global.naive = this
    //在这里之后,require就可以加载到外部模块了
    if (window.require) {
      require.setExternalDeps(this.public.config.backend.filesys.workspaceDir + `/conf/naiveConf/deps/node_modules`)
      require.setExternalDeps(this.public.config.backend.filesys.workspaceDir + `/conf/appearance/themes/naive/script/node_modules`)
      require.setExternalBase(this.public.config.backend.filesys.workspaceDir + `/conf/naiveConf/deps`)
    }
    this.public.deps = {
      "dependencies": {
        "@vue/compiler-sfc": "^3.2.40",
        "ajv": "^8.11.0",
        "body-parser": "^1.20.1",
        "compression": "^1.7.4",
        "esbuild": "^0.15.10",
        "express": "^4.18.2",
        "express-session": "^1.17.3",
        "express-ws": "^5.0.2",
        "fast-glob": "^3.2.12",
        "fs-extra": "^10.1.0",
        "http-proxy-middleware": "^2.0.6",
        "log4js": "^6.7.0",
        "passport": "^0.6.0",

      }
    }
    this.合并设置()
    this.初始化()
  }
  合并设置() {
    let options = this.public.config
    if (window.siyuan) {
      this.log('在思源中运行,使用思源的工作空间')
      this.public.status.workspaceDir = window.siyuan.config.system.workspaceDir
      this.siyuan = window.siyuan
      module.__dirname = this.public.status.workspaceDir + '/conf/appearance/themes/naive/script'

    }
    this.selfPath = this.public.status.workspaceDir + '/conf/appearance/themes/naive/script'
  }


  async 初始化() {
    if (require) {
      await this.初始化命令行工具()
      await this.安装依赖()
      await this.初始化日志()
      await this.初始化后端()
    }
   // console.log(this)
    //await this.初始化前端()
   // await this.加载插件()

  }
  初始化命令行工具() {
    this.shellCmd = shellCmd
    this.npmCmd = npmCmd
  }
  安装依赖(){
    let fs = require("fs")
    //这里将会安装依赖列表
    if(!fs.existsSync(this.public.config.backend.filesys.workspaceDir + `/conf/naiveConf/deps/package.json`)){
      fs.writeFileSync(
        this.public.config.backend.filesys.workspaceDir + `/conf/naiveConf/deps/package.json`,JSON.stringify(this.public.deps)
      )
      npmCmd(`i`,this.public.config.backend.filesys.workspaceDir + `/conf/naiveConf/deps/`).then(
        w=>{
      //   reload()
        }
      )
    }
  }
  async 加载插件() {
    //从加载插件开始，由naive的后端服务器接管请求
    import(`${this.backend.server.host}/pluginHandler/index.js`)
  }
  初始化日志() {
    this.logger = new naiveLogger(this)
  }
  
  async 初始化后端() {
    let that = this
    console.log(this.selfPath + '/backend/index.js')
    await import(this.selfPath + '/backend/index.js').then(
      module => {
        let naiveBackend = module.default
        that.backend = new naiveBackend(this)
      }
    ).catch(e => {
      console.error(e)
    })
  }
  async 初始化前端() {
    let that = this

    await import(this.selfPath + '/frontend/index.js').then(
      module => {
        let naiveFrontend = module.default
        that.frontend = new naiveFrontend(this)
      }
    ).catch(e => {
      console.error(e)
    })

  }
  log(...args) {
    if (require) {
      console.log(...args)
    }
  }
}

/*
window.naive = {
  frontend:{},
  backend:{},
  public:{
    status:{}
  },
  doc:{},
};
let naive = window.naive;
//初始化naive对象
//条件加载器
//这里应该放到别的部分去
let {ifDefOptions} = naive.public.status
ifDefOptions = {
  defs: {
    BROWSER: window.require ? false : true,
    APP: window.require ? true : false,
    PUBLISH: !window.siyuan,
    MOBILE: !window.siyuan.mobileEditor ? false : true,
    DEBUG: true,
  },
  verbose: true,
  tripleSlash: true,
  fillWithBlanks: true,
  uncommentPrefixString: "",
};
//判定环境
ifDefOptions.defs.BROWSER = window.require ? false : true,
ifDefOptions.defs.APP = window.require ? true : false,
ifDefOptions.defs.PUBLISH = !window.siyuan,
ifDefOptions.defs.MOBILE = !window.siyuan.mobileEditor ? false : true,
ifDefOptions.defs.DEBUG = true,
  naive.backend.ifdefParser = new ifdefParser(naive.ifDefOptions);
//从siyuan对象获取工作空间路径
naive.public.status.workspaceDir = window.siyuan.config.system.workspaceDir;
//从siyuan对象获取主题名称
naive.public.status.themeName = !window.siyuan.config.appearance.mode
  ? window.siyuan.config.appearance.themeLight
  : window.siyuan.config.appearance.themeDark;
//路径生成器，主要用于生成各种路径变量
//获取用户信息
if(window.siyuan){
naive.public.status.user = {}
if (window.siyuan.user) {
  naive.public.status.user = window.siyuan.user;
}
//获取websocket
naive.frontend.siyuanWs = window.siyuan.ws;
}


//await initNaive();

*/
