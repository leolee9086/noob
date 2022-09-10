import model from "./model.js";
import {  事件总线 } from "../public/eventBus.js";

export class 主题插件 {
  constructor(option) {
    if(option.插件名||option.name){
      this.插件名 = option.插件名
      this.name = option.name;
    }
    else{
      throw `插件必须提供名称`
    }
    this.setPluginsProp = this.设置插件接口
    this.批量设置插件接口([
      { 名称: { 中文: "主题对象", en: "naive", alias: "app" }, 接口值: naive },
      { 名称: { 中文: "核心api", en: "kernelApi" }, 接口值: naive.kernelApi },
      { 名称: { 中文: "自身路径", en: "selfPath" }, 接口值: naive.workspaceDir + '\\conf\\naiveConf\\plugins\\' + this.name },
      { 名称: { 中文: "消息信道", en: "ws" }, 接口值: () => new model(this) }
    ])
    this.初始化事件总线()
  }
  初始化事件总线(){
    let _事件总线 =  new 事件总线()
    this.设置插件接口({中文:"事件总线"},_事件总线)
    this.设置插件接口({中文:"监听事件",en:"on"},_事件总线.on)
    this.设置插件接口({中文:"触发事件",en:"emit"},_事件总线.emit)
  }
  设置插件接口(名称对象, 接口值) {
    if(!(接口值 instanceof Function)){
      throw `接口必须为函数 @'file:///${naive.pathConstructor.pluginsPath()}/${this.name}'` 
    }
    if (名称对象['中文']) { naive.plugin.prototype[名称对象['中文']] = 接口值 }
    else { 
      throw `接口必须提供中文名 @'file:///${naive.pathConstructor.pluginsPath()}/${this.name}'` 
    }
    Object.getOwnPropertyNames(名称对象).forEach(
      名称 => {
        名称 !== '中文' ? naive.plugin.prototype[名称对象[名称]] = 接口值 : null
      }
    )
  }
  批量设置插件接口(接口数组) {
    let 设置接口 = this.设置插件接口.bind(this)
    接口数组.forEach(
      接口对象 => 设置接口(接口对象[0]||接口对象.名称, 接口对象[1]||接口对象.接口值)
    )
  }
}
export { 主题插件 as plugin };

