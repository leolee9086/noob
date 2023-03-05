import 块标菜单注册表 from "../../noobApi/Menu/blockMenu.js.js"
import 头图按钮注册表 from "./button/backgroundButton.js.js"
import 文档树菜单注册表 from "../../noobApi/Menu/navigationMenu.js.js"
import 面包屑菜单注册表 from "../../noobApi/Menu/breadcrumbMenu.js.js"
import 导出按钮注册表 from "./button/exportButton.js.js"
export class 主题扩展 {
  constructor(name,serviceName){
    if(!name){
      throw "扩展必须提供名称"
    }
    
  }
  注册块标菜单(options){
    块标菜单注册表.注册(options)
  }
  注册头图按钮(options){

  }
  注册文档树菜单(options){

  }
  注册标签组菜单(options){

  }
  注册面包屑菜单(options){

  }
  注册工具栏按钮(options){

  }
  注册斜杠菜单(options){

  }
  注册超链接菜单(options){

  }
  注册块链接菜单(options){

  }
}
export { 主题扩展 as extension };

