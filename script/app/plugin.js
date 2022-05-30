export class 主题插件{
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
}