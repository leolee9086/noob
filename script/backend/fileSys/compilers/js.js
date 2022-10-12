import {ifdefParser} from './util/index.js'
export default  class jscompiler{
    constructor(options){
        let  ifDefOptions= this.options.ifDefOptions
        ifDefOptions = {
          defs: {
            //如果没有require说明运行在浏览器中
            BROWSER: window.require ? false : true,
            APP: window.require ? true : false,
            PUBLISH: !window.siyuan,
            MOBILE: !window.siyuan.mobileEditor ? false : true,
            DEBUG: true,
          },
          //是否输出编译日志
          verbose: this.public.config.log.verbose,
          //是否使用三道斜杠定义
          tripleSlash: true,
          fillWithBlanks: true,
          uncommentPrefixString: "",
        };
    
    }
    compile(input,options){
        //如果输入是一个字符串，则直接对字符串进行编译
        if((typeof input=="string")&&input.constructor==String){
            let ifdefParser = new ifdefParser(ifDefOptions)
            return ifdefParser.parse(input)
        }
    }
    compilePath(path){
        const fs = require("fs-extra")
        if(fs.existsSync(path)){
            let  content = fs.readFileSync(path)
            return compile(content)
        }
    }

}