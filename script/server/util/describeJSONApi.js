const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const apiLevel = [
    "admin",
    "write",
    "read"
]
naive.apiAuthorization = {
    visitor: {
        siyuanApi: { 权限: 'public' }
    }
}
function  toString(方法对象){
    let object = {}
    if(typeof 方法对象 =='string' ){
        return 方法对象
    }
    else {
       Object.getOwnPropertyNames(方法对象).forEach(
        name=>{
            object[name] = []
            if(方法对象[name] instanceof Function){
                object[name].push(方法对象[name].toString())
            }
            else if(方法对象[name] instanceof Array){
                方法对象[name].forEach(
                    函数=>{
                        object[name].push(函数.toString())
                    }
                )
            }
        }
       )
    }
    return object
}
module.exports = function (path, describe) {
    let 请求校验器
    let 返回值校验器
    naive.doc.api[path] = {
        一级分组: describe.一级分组,
        二级分组: describe.二级分组,
        功能: describe.功能,
        名称: describe.名称,
        方法:toString( describe.方法),
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
    if (describe.权限) {
        console.log(describe.权限)
        if (describe.权限 == 'public') {
            auth = (req, res, next) => { next() }
        }
        else if (typeof describe.权限 == "string") {
            console.log(describe.权限)

            auth = (req, res, next) => {
                console.log(describe.权限)

                let user_group = req.session.user_group || 'visitor'
                console.log(user_group)
                if (user_group == 'admin') {
                    next()
                    return

                }
                else {
                    let 权限设置 = naive.apiAuthorization[user_group]
                    console.log(权限设置)

                    if (!权限设置) {
                        res.json({
                            code: 3,
                            data: null,
                            msg: '抱歉,你无权访问此位置'
                        })
                        res.end()
                    }
                    else {
                        if (权限设置[describe.一级分组] == 'all') {
                            console.log(权限设置[describe.一级分组])
                            next()
                            return
                        }
                        else {

                            let 接口等级 = apiLevel.indexOf(describe.权限)
                            let 用户组权限等级 = apiLevel.length + 1
                            if (权限设置[describe.一级分组]) {
                                if (typeof 权限设置[describe.一级分组] == "string") {
                                    用户组权限等级 = apiLevel.indexOf(权限设置[describe.一级分组])
                                }
                                else {
                                    用户组权限等级 = apiLevel.indexOf(权限设置[describe.一级分组]["权限"])
                                    if(权限设置[describe.一级分组]["权限"]=='all'){
                                        用户组权限等级 = 0
                                    }
                                    if (用户组权限等级 < 0) {
                                        console.warn(`用户组${user_group}在${describe.一级分组}上的权限${权限设置[describe.一级分组]["权限"]}不存在,请检查权限设置`)
                                        res.json({
                                            code: 3,
                                            data: null,
                                            msg: '抱歉,你无权访问此位置'
                                        })
                                        res.end()

                                    }
                                    else {
                                        if (权限设置[describe.一级分组][describe.二级分组]) {
                                            if ( 权限设置[describe.一级分组][describe.二级分组] == "all") {
                                                next()
                                                return
                                            }
            
                                            if (typeof 权限设置[describe.一级分组][describe.二级分组] == "string") {
                                                用户组权限等级 = apiLevel.indexOf(权限设置[describe.一级分组][describe.二级分组])
                                            }
                                            else {

                                                用户组权限等级 = apiLevel.indexOf(权限设置[describe.一级分组][describe.二级分组]["权限"])
                                                if(权限设置[describe.一级分组][describe.二级分组]["权限"]=='all'){
                                                    用户组权限等级 = 0
                                                }
                                                if (用户组权限等级 < 0) {
                                                    console.warn(`用户组${user_group}在${describe.一级分组}下的${describe.二级分组}的权限${权限设置[describe.一级分组][describe.二级分组]["权限"]}不存在,请检查权限设置`)
                                                    res.json({
                                                        code: 3,
                                                        data: null,
                                                        msg: '抱歉,你无权访问此位置'
                                                    })
                                                    res.end()

                                                }
                                                if (权限设置[describe.一级分组][describe.二级分组][path] || 权限设置[describe.一级分组][describe.二级分组][describe.名称]) {
                                                    用户组权限等级 = apiLevel.indexOf(权限设置[describe.一级分组][describe.二级分组][path] || 权限设置[describe.一级分组][describe.二级分组][describe.名称])
                                                    if (用户组权限等级 < 0) {
                                                        console.warn(`用户组${user_group}在${describe.一级分组}-->${describe.二级分组}-->${path}的权限不存在,请检查权限设置`)
                                                        res.json({
                                                            code: 3,
                                                            data: null,
                                                            msg: '抱歉,你无权访问此位置'
                                                        })
                                                        res.end()

                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                用户组权限等级 = apiLevel.length + 1
                            }
                            if (接口等级 < 0) {
                                接口等级 = 0
                            }
                            console.log(path,接口等级,用户组权限等级)
                            if (接口等级 < 用户组权限等级) {
                                res.json({
                                    code: 3,
                                    data: null,
                                    msg: '抱歉,你无权访问此位置'
                                })
                                res.end()

                            }
                            else {
                                next()
                                return
                            }
                        }

                    }

                }
            }
        }
        else {
            console.warn(`api错误:${path}未设置请求权限,请校验`)
            auth = (req, res, next) => {
                res.json({
                    code: 3,
                    data: null,
                    msg: '抱歉,你无权访问此位置'
                })
                res.end()
            }

        }
    }
    if (describe.方法 && describe.方法 instanceof Object) {
        Object.getOwnPropertyNames(describe.方法).forEach(
            method => {
                !请求校验器 ? naive.expressApp[method](path, auth, describe['方法'][method]) : naive.expressApp[method](path, auth, 请求校验器, describe['方法'][method])

            }
        )
    }
}
