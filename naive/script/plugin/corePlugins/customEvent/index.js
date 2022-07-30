export class customEvent extends naive.plugin {
    constructor(){
        super({name:"customEvent"})
        this.setPluginsProp("注册自定义事件",this.注册自定义事件)
        this.setPluginsProp("反注册自定义事件",this.反注册自定义事件)

    }
    注册自定义事件(监听选项,事件类型,事件回调){
        let {target,type,option}=监听选项
        let 真实事件回调句柄 =  (event)=>{
            naive.事件总线.emit(事件类型)
            if(事件回调){
            事件回调(event)
            }
        }
        target.addEventListener(type,真实事件回调句柄,option)
        naive.事件列表?null:naive.事件列表={}
        this.反注册自定义事件(事件类型)
        naive.事件列表[事件类型]={
            事件目标:target,
            原始事件类型:type,
            事件回调句柄:真实事件回调句柄
        }
    }
    反注册自定义事件(事件类型){
        if(naive.事件列表&&naive.事件列表[事件类型]){
            let 自定义事件 = naive.事件列表[事件类型]
            自定义事件.事件目标.removeEventListener(自定义事件.原始事件类型,自定义事件.事件回调句柄)
        }
    }
}