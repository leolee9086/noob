import { 主题界面 } from "./ui/ui.js";

export  class 主题插件{
    constructor(option){
        this.name =  option.name
        naive.plugins[this.name]=this
        console.log(`加载${this.name}插件`)
        this.app = naive
    }
    注册顶栏按钮(option){
         主题界面.注册顶栏按钮(option)
    }
    注册通用菜单项目(option){
         主题界面.注册通用菜单项目(option)
    }
    注册块标菜单(option){
        let 自定义块标菜单 =this.app.自定义块标菜单
        let {块类型, 菜单文字,菜单图标, 回调函数} =option
        自定义块标菜单[块类型] ? null : (自定义块标菜单[块类型] = {});
        自定义块标菜单[块类型][菜单文字]
          ? null
          : (自定义块标菜单[块类型][菜单文字] = {});
        自定义块标菜单[块类型][菜单文字]["回调函数"] = 回调函数;
        自定义块标菜单[块类型][菜单文字]["菜单文字"] = 菜单文字;
        自定义块标菜单[块类型][菜单文字]["菜单图标"] = 菜单图标;
        自定义块标菜单[块类型][菜单文字]["注册插件"] = this.name;
    }
    停用 (){ 
        naive.停用插件(this)
    }
    APP环境(){
        return naive.isApp
    }   
    注册工具条项目(){
        
    }
    编辑器队列(){
        return naive.编辑器队列
    }
    加载css(option){
        return naive.加载css(option)
    }
    加载js(option){
        return naive.加载js(option)
    }
    
}