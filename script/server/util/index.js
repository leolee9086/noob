const { shellCmd, npmCmd } = require('./shell');
const proxy = require("express-http-proxy")
const apiAuthor = require('./apiAuthorization')
const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
function unzipJSON(msg) {
        return new Promise(function (resolve, reject) {
            const _data = []
            msg.on('data', chunk => {
                _data.push(...chunk)
            })
            msg.on('end', () => {
                // 把传递过来的数据转换为一个对象
                try{
                let str = new TextDecoder().decode(new Uint8Array(_data)) 
                resolve( JSON.parse(str))
                }catch(e){
                    reject(e)
                }
            })
        }
        )
}
module.exports = {
        //magicstring用于替换文字等
        MagicString: require('magic-string'),
        //fast-glob用于遍历文件夹
        fg: require('fast-glob'),
        //markdown-it用于解析markdown
        mdIt: require('markdown-it')(),
        //用于解析em模块导入
        importParser: require('es-module-lexer'),
        //fs-extra比自带的fs模块要好用一点
        fs: require("fs-extra"),
        //用于执行命令
        shellCmd: shellCmd,
        npmCmd: npmCmd,
        proxy: proxy,
        apiAuthor: apiAuthor,
        chekEndPoints: () => { return naive.serverUtil.apiAuthor.chekEndPoints(naive.expressApp, {}) },
        describeJSONApi: (path, discribe) => {
                let 请求校验器
                let 返回值校验器
                naive.doc.api[path] = {
                        一级分组: discribe.一级分组,
                        二级分组: discribe.二级分组,
                        功能: discribe.功能,
                        名称: discribe.名称,
                        方法: discribe.方法,
                        权限: discribe.权限,
                        请求值: discribe.请求值,
                        路径: discribe.路径,
                        返回值: discribe.返回值,
                }
                if(discribe.请求值.schema||discribe.请求值.模式){
                        let 模式 =  discribe.请求值.schema||discribe.请求值.模式
                        let  校验器 = ajv.compile(模式)
                        请求校验器  = function(req,res,next){
                                if(!校验器(req.body)){
                                        console.error(`接口${path}收到了错误的请求`)
                                        console.error(校验器.errors)
                                        if(discribe.请求值.strictCheck){
                                                res.json(
                                                        {
                                                                msg:校验器.errors,
                                                                data:null,
                                                                code:3
                                                        }
                                                )
                                                res.end()
                                        }
                                        if(!discribe.请求值.strictCheck){next()}
                                }
                                else{
                                        next()
                                }
                        }
                }else{
                        console.warn(`接口${path}没有提供请求格式`)
                }
                let json解析器 =async function(req,res,next){
                        if (req.headers["content-type"]=="text/plain;charset=UTF-8"){
                                req.body = await unzipJSON(req)
                        }
                        
                        next()
                }
                if(discribe.方法&&discribe.方法 instanceof Object){
                        Object.getOwnPropertyNames(discribe.方法).forEach(
                                method=>{
                                        console.log(discribe['方法'][method],请求校验器)
                                        !请求校验器? naive.expressApp[method](path,json解析器,discribe['方法'][method]):naive.expressApp[method](path,json解析器,请求校验器,discribe['方法'][method])
                                }
                        )
                }
                
        }
}