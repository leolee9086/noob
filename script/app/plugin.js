import { 主题界面 } from "./ui/ui.js";

export  class 主题插件{
    constructor(option){
        this.name =  option.name
        naive.plugins[this.name]=this
        console.log(`加载${this.name}插件`)
    }
    注册顶栏图标(option){
        return naive.注册顶栏图标(option)
    }
    注册通用菜单项目(option){
        return naive.注册通用菜单项目(option)
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