const { shellCmd, npmCmd } = require('./shell');
const proxy = require("express-http-proxy")
const apiAuthor = require('./apiAuthorization')
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
        discribeApi: (path, discribe) => {
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
                if(discribe.方法&&discribe.方法 instanceof Object){
                        Object.getOwnPropertyNames(discribe.方法).forEach(
                                method=>{
                                        console.log(method)
                                        console.log(discribe['方法'])
                                        if(discribe['方法'][method] instanceof Function){
                                                naive.expressApp[method](path,discribe.方法[method])
                                        }
                                        if(discribe['方法'][method] instanceof Array){
                                                naive.expressApp[method](path,discribe.方法[method])
                                        }
                                }
                        )
                }
        }
}