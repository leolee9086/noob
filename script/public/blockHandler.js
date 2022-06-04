export class blockHandler{
    constructor() {
        this.思源api = naive.思源api
    }
    getCurrentBlock(){
        let 当前块元素 =  document.querySelector(".protyle-wysiwyg--select")
        if(当前块元素){
            return this.blockElement2Obj(当前块元素)
        }
    }
    blockElement2Obj(块元素){
        let 块对象 = {}
        块对象.id = 块元素.id
        块对象.attributes = {
            name :块元素.getAttribute('name')
        }
    }
    setBlockAttributes(id,属性对象){
        for(let 属性名 in 属性对象){
        }
    }
}