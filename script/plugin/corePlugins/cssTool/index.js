export class cssTool extends naive.plugin {
    constructor(){
        super({name:'cssTool'})
        this.setPluginsProp({中文:'加载css到DOM'},this.加载css文件到DOM)
        this.setPluginsProp({中文:'加载css'},this.加载css文件到DOM)
        this.setPluginsProp({中文:'加载css内容到DOM'},this.加载css内容到DOM)
    }
    加载css文件到DOM(文件路径){
        let 元素 = document.createElement('link')
        元素.setAttribute('href',文件路径)
        元素.setAttribute('rel','stylesheet')
        document.head.appendChild(元素)
        return 元素
    }
    加载css内容到DOM(css内容){
        let 元素 = document.createElement('style')
        元素.innerHTML=css内容
        document.head.appendChild(元素)
        return 元素
    }
}
