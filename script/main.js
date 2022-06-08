//判定是否在app内运行
import {生成默认设置} from "./public/configer.js"
import { 事件总线 } from "./public/eventBus.js";
import { kernalApiList } from "./public/kernalApi.js";
import { 加载插件 } from "./plugin/pluginLoader.js";
import { 加载图标 } from "./ui/icon.js";
import { 注册图标 } from "./ui/icon.js";
import { 窗口配置器 } from "./ui/page.js";
import { DOM监听器 } from "../public/DOMwatcher.js";
import { 主题插件 } from "../plugin/plugin.js";
import { 主题界面 } from "./ui/ui.js";
import { 共享数据总线 } from "../public/eventChannel.js";
import { 快捷键监听器 } from "../public/keymap.js";
import { 添加行内样式 } from "./util/font.js";
//插件相关
naive.加载插件=加载插件
naive.plugins = {};
naive.plugin = 主题插件;
naive.插件文件夹url ="/widgets/naivePlugins";
naive.插件文件夹路径 =  `/data/widgets/naivePlugins`
naive.核心插件URL ="/appearance/themes/naive/script/plugin/corePlugins"

naive.util={}
naive.子窗口配置 = {}
naive.当前块元素数组=[]
naive.事件总线 = new 事件总线();
naive.eventBus = naive.事件总线;
naive.isApp=window.require?true:false
naive.加载js({src: `${naive.根目录}/script/app/appIndex.js`, type: "module"})
naive.设置 = 生成默认设置({},naive.workspaceDir,"")
naive.kernalApi=new kernalApiList()
naive.核心api = naive.kernalApi
naive.加载图标= 加载图标
naive.加载图标()
naive.全局快捷键监听器 = new 快捷键监听器(document);
naive.打开服务器设置窗口 = 窗口配置器.打开服务器设置窗口;
naive.打开样式设置窗口 = 窗口配置器.打开样式设置窗口;
naive.编辑器队列 = [];
naive.注册图标 = 注册图标
naive.竖线菜单设置 = [];
naive.自定义块标菜单 = [];
naive.自定义头图菜单 = [];
naive.configURL=" /appearance/themes/naive/config"

let version = await naive.核心api.获取软件版本({})
console.log(version)
console.log(naive.newApi)
console.log(naive)
if(naive.isApp){
  //加载后台服务
  naive.加载js({src: `${naive.根目录}/script/server/severIndex.js`, type: "module"})
}
naive.util.获取json =async function(路径){
  let json= {}
  if(window.require){
     naive.fs = require('fs')
     try{
     json = JSON.parse(naive.fs.readFileSync(路径, "utf-8"));}
     catch(e){
       console.log("获取文件失败",e)
     }
  }
  else{
    let res = await fetch(路径)
    json = await res.json()
  }
}
