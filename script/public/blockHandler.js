import { kernelApiList }     from "./kernelApi.js"
export class blockHandler{
    constructor(id,kernalApi) {
        if(kernalApi){
        this.思源api = kernalApi
        }
        else{this.思源api = new kernelApiList()}
        this.默认属性列表 = [
            'name','memo','alias','bookmark','style','data-assets',
        ]
        this.id = id
    }
    getCurrentBlocks(){
        let 当前块元素数组 =  document.querySelectorAll(".protyle-wysiwyg--select")
        return 当前块元素数组
    }
    块元素转块对象(块元素){
        let 块对象 = {}
        块对象.id = 块元素.id
        块对象.attributes = {
            name :块元素.getAttribute('name')
        }
    }
    async 设置块属性(id,属性对象){
        let 拷贝属性对象 = {}
        for(let 属性名 in 属性对象){
            if(this.默认属性列表.includes(属性名)){
                拷贝属性对象[属性名] = 属性对象[属性名]
            }
            else if (属性名.startsWith('custom-')){
                拷贝属性对象[属性名]= 属性对象[属性名]
            }
        }
        await this.思源api.设置块属性(id,拷贝属性对象)
    }
}