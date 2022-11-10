import model from "./model.js";
import { 事件总线 } from "../public/eventBus.js";
export class 主题扩展 {
  constructor(option) {
    if (option.插件名 || option.name) {
      this.插件名 = option.插件名
      this.name = option.name;
    }
    else {
      throw `插件必须提供名称`
    }
    if (window.require) {
      this.require = window.require.bind(this)
    }
    this.selfPath = noob.workspaceDir + '\\conf\\noobConf\\plugins\\' + this.name
    if (noob.corePluginsList.indexOf(this.name) >= 0) {
      this.selfPath = noob.workspaceDir + '\\conf\\appearance\\themes\\noob\\script\\plugin\\corePlugins\\' + this.name

    }
    this.setPluginsProp = this.设置插件接口
    this.初始化事件总线()
  }
  
  初始化事件总线() {
    let _事件总线 = new 事件总线()
    this.设置插件接口({ 中文: "事件总线" }, _事件总线)
    this.设置插件接口({ 中文: "监听事件", en: "on" }, _事件总线.on)
    this.设置插件接口({ 中文: "触发事件", en: "emit" }, _事件总线.emit)
  }
  设置插件接口(名称对象, 接口值) {
    //if(!(接口值 instanceof Function)){
    // throw `接口必须为函数 @'file:///${noob.pathConstructor.pluginsPath()}/${this.name}'` 
    // }
    if (名称对象['中文']) { noob.plugin.prototype[名称对象['中文']] = 接口值 }
    else {
      throw `接口必须提供中文名 @'file:///${noob.pathConstructor.pluginsPath()}/${this.name}'`
    }
    Object.getOwnPropertyNames(名称对象).forEach(
      名称 => {
        名称 !== '中文' ? noob.plugin.prototype[名称对象[名称]] = 接口值 : null
      }
    )
  }
}
export { 主题扩展 as plugin };

