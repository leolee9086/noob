//路径生成器
//条件加载器
import ifdefParser from "./public/util/ifdef/index.js";
import { initNaive } from "./initNaive.js";
//创建naive对象
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


