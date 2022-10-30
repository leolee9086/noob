import sfcCompiler from './vue1.js'
import tsComplier from './ts.js'
import scssCompiler from './scss.js'
export default class compilers{
    constructor(){
        this.js = new tsComplier()
        this.ts = new tsComplier()
        this.sass = new scssCompiler()
        this.scss = new scssCompiler()
        this.html ={
            parseFile(path,options,baseUrl){
                let filePath = require("path").join(options.base,path)
                if(require("fs-extra").existsSync(filePath)){
                    return require("fs-extra").readFileSync(filePath)
                }else{
                return require("fs-extra").readFileSync(filePath+'/index.html')
                }
            }
        }
    }
    compile=(path,options,baseUrl)=>{
        if(!options){
          throw("必须传入options对象")
        }
        let ex=   path.split(".").pop()
        console.log(ex)
        if(!ex||ex==path){
            ex="html"
        }
        console.log(this[ex])
        return this[ex].parseFile(path,options,baseUrl)
    }
}