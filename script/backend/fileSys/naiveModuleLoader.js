const fs = require("fs-extra")
let 注入根目录 
export default class 模块加载器{
    constructor(根目录){
        this.根目录 = 根目录
    }
    读取文件=(文件路径)=>{
        if(是相对路径(文件路径)){
            文件路径 = path.resolve(this.根目录)
        }

        let  文件内容  = fs.readFileSync(文件路径,'utf-8')
        //编译文件可能出错,抛出这些错误
        try{
            this.编译文件内容(文件路径,文件内容)
        }catch(e){
            throw e
        }
    }
    编译文件内容=(文件路径,文件内容)=>{
        if(this.编译器){
            return  this.编译器(文件路径,文件内容)
        }
        else{
    
            return 文件内容
        }
    }
}