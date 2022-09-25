const { shellCmd, npmCmd } = require('./shell');
const proxy = require("express-http-proxy")
const apiAuthor = require('./apiAuthorization')
const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

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
        //用于描述jsonapi
        describeJSONApi: (path, describe) => {
                let 请求校验器
                let 返回值校验器
                naive.doc.api[path] = {
                        一级分组: describe.一级分组,
                        二级分组: describe.二级分组,
                        功能: describe.功能,
                        名称: describe.名称,
                        方法: describe.方法,
                        权限: describe.权限,
                        请求值: describe.请求值,
                        路径: describe.路径,
                        返回值: describe.返回值,
                }
                if (describe.请求值.schema || describe.请求值.模式) {
                        let 模式 = describe.请求值.schema || describe.请求值.模式
                        let 校验器 = ajv.compile(模式)
                        请求校验器 = function (req, res, next) {
                                if (!校验器(req.body)) {
                                        console.error(`接口${path}收到了错误的请求`)
                                        console.error(校验器.errors)
                                        if (describe.请求值.strictCheck) {
                                                res.json(
                                                        {
                                                                msg: 校验器.errors,
                                                                data: null,
                                                                code: 3
                                                        }
                                                )
                                                res.end()
                                        }
                                        if (!describe.请求值.strictCheck) { next() }
                                }
                                else {
                                        next()
                                }
                        }
                } else {
                        console.warn(`接口${path}没有提供请求格式`)
                }
                let auth 
                if(describe.权限){
                        if(describe.权限=='public'){
                                auth =(req,res,next)=>{next()}                                
                        }
                        else if(describe.权限 instanceof String){
                                auth = (req,res,next)=>{
                                        let user_group = req.session.user_group
                                        if(user_group=='admin'){
                                                next()
                                        }
                                        else{
                                                let 权限设置 = naive.apiAuthorization[user_group]
                                                if(!权限设置){
                                                        res.json({
                                                                code:3,
                                                                data:null,
                                                                msg:'抱歉,你无权访问此位置'
                                                        })
                                                }  
                                                else {
                                                        if(权限设置[describe.一级分组]=='all'){
                                                                next()
                                                        }
                                                        else if (权限设置[describe.一级分组]==describe.权限){
                                                                next()
                                                        }
                                                        else if (权限设置[describe.一级分组][describe.二级分组]==describe.权限){
                                                                next()
                                                        }
                                                        else if (权限设置[describe.一级分组][describe.二级分组][describe.path]== describe.权限){
                                                                next()
                                                        }
                                                        else{
                                                                res.json({
                                                                        code:3,
                                                                        data:null,
                                                                        msg:'抱歉,你无权访问此位置'
                                                                })
        
                                                        }
                                                        
                                                }      
                                                
                                        }
                                }
                        }
                        else {
                                console.warn('错误的权限设置')
                                auth = (req,res,next)=>{
                                        res.json({
                                                code:3,
                                                data:null,
                                                msg:'抱歉,你无权访问此位置'
                                        })

                                }
                        }
                }
                if (describe.方法 && describe.方法 instanceof Object) {
                        Object.getOwnPropertyNames(describe.方法).forEach(
                                method => {
                                        !请求校验器 ? naive.expressApp[method](path, auth,describe['方法'][method]) : naive.expressApp[method](path, auth,请求校验器, describe['方法'][method])

                                }
                        )
                }
                

        }
}