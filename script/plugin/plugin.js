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
    if(window.require){
      this.require = window.require.bind(this)
    }
   
   
    this.selfPath=naive.workspaceDir + '\\conf\\naiveConf\\plugins\\' + this.name
    if(naive.corePluginsList.indexOf(this.name)>=0){
      this.selfPath=naive.workspaceDir + '\\conf\\appearance\\themes\\naive\\script\\plugin\\corePlugins\\' + this.name

    }
    this.setPluginsProp = this.设置插件接口
    this.批量设置插件接口([
      { 名称: { 中文: "主题对象", en: "naive", alias: "app" }, 接口值: naive },
      { 名称: { 中文: "核心api", en: "kernelApi" }, 接口值: naive.kernelApi },
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
    //if(!(接口值 instanceof Function)){
     // throw `接口必须为函数 @'file:///${naive.pathConstructor.pluginsPath()}/${this.name}'` 
   // }
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
  //#ifApp
  router(){
    let router= naive.pluginsApiRouter()
    naive.expressApp.use(`/${this.name}`,router)
    return router
  }
  describeApi(path,describe){
    let  des=(path,describe) =>{
      naive.serverUtil.describeApi(`/${this.name}${path}`,describe)
      naive.doc.api[`/${this.name}${path}`]['来源插件']=this.name
      if(!naive.doc.plugin[this.name]){
        naive.doc.plugin[this.name]={api:[]}
        naive.doc.plugin[this.name]['api'].push(`/${this.name}${path}`)
      }
      else{
        if(!naive.doc.plugin[this.name]['api']){
          naive.doc.plugin[this.name]['api']=[]
        }
        naive.doc.plugin[this.name]['api'].push(`/${this.name}${path}`)
      }

    }
    if(typeof path =='string'){
      des(path,describe)

    }
    else if( path instanceof Array){
      path.forEach(
        p=>{
          des(p,describe)
        }
    )

    }
  }
  describeCoreApi(path,describe){
    let selfpath = naive.pathConstructor.corePluginsPath()+`/${this.name}`
    let fs = this.require('fs-extra')
    if(fs.existsSync(selfpath)){
      naive.serverUtil.describeApi(path,describe)
      naive.doc.api[`${path}`]['来源插件']=this.name
    }
  }
  //#endif
  initFolder(){
    let pluginFoldr = naive.pathConstructor.initDirp(`${naive.pathConstructor.workspaceDir}/conf/naiveConf/pluginFolders/${this.name}`)
    return pluginFoldr
  }
  initFile(filePath, data){
    let FolderPath = this.initFolder()
    let path = require('path')
    let realPath =  path.join(FolderPath,filePath)
    return naive.pathConstructor.initFilep(realPath,data)
  }
  initDir(dirpath){
    let FolderPath = this.initFolder()
    let path = require('path')
    let realPath =  path.join(FolderPath,dirpath)
    return naive.pathConstructor.initDirp(realPath)
    }
  ///#endif
}
export { 主题插件 as plugin };

