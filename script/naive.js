import {生成默认设置} from "./public/configer.js"
import { 事件总线 } from "./public/eventBus.js";
import { kernalApiList } from "./public/kernalApi.js";
import { 加载插件 } from "./plugin/pluginLoader.js";
import { 加载核心插件 } from "./plugin/pluginLoader.js";
import { 加载图标 } from "./ui/icon.js";
import { 注册图标 } from "./ui/icon.js";
import { 窗口配置器 } from "./ui/page.js";
import { DOM监听器 } from "./public/DOMwatcher.js";
import { 主题插件 } from "./plugin/plugin.js";
import { 主题界面 } from "./ui/ui.js";
import { 共享数据总线 } from "./public/eventChannel.js";
import { 快捷键监听器 } from "./public/keymap.js";
import { 添加行内样式 } from "./util/font.js";
import {dom模板} from "./public/domTemplate.js"
export default class naive {
  constructor(themeName) {
    this.themeName = themeName
    if (window.siyuan) {
      this.workspaceDir = window.siyuan.config.system.workspaceDir;
      this.siyuan = window.siyuan;
    }
    this.加载核心插件 = 加载核心插件
    this.根目录 =`/appearance/themes/${this.themeName}`
    this.核心插件文件夹url = `/appearance/themes/${this.themeName}/script/plugin/corePlugins/`
    this.核心插件列表 =  {
        "configPages":["app"]
    }
    this.corePlugins={}
    this.初始化核心插件()
    this.plugin = 主题插件
}
  async 加载模块(路径, 模块名, 相对,base) {
    if (相对){
        if(base){
            路径 = this.bindURL(路径,base)
        }
        else{
            路径 = this.bindURL(路径,`http://${window.location.host}/appearance/themes/${this.themeName}/`)
        }
    }
    if (模块名) {
      await import(路径).then((module) => {
        naive[模块名] = module[模块名];
      });
      console.log("自", 路径, "加载", 模块名);
    }
  }
  bindURL(url,baseURL){
    console.log(baseURL)
    let realURL= new URL(url,baseURL)
    return realURL.href
  }
  初始化核心插件(){
      for (let 插件名 in this.核心插件列表){
         let 插件环境配置 = this.核心插件列表[插件名]
         for (let 环境 in 插件环境配置){
             this.加载核心插件(插件名,插件环境配置[环境])
         }
      }
  }
}
