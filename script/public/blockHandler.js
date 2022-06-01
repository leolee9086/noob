export class blockHandler{
    constructor() {
        
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
}