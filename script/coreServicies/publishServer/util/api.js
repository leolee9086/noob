const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const express = require('express')
const fg = require('fast-glob')
const apiLevel = [
    "admin",
    "write",
    "read"
]
function describeApi(path, describe, app, doc) {
    let 请求校验器
    let 返回值校验器
    if (doc) {
        doc[path] = {
            一级分组: describe.一级分组,
            二级分组: describe.二级分组,
            功能: describe.功能,
            名称: describe.名称,
            方法: describe.方法 ? toString(describe.方法) : null,
            权限: describe.权限,
            请求值: describe.请求值,
            路径: describe.路径,
            返回值: describe.返回值,
        }
    }
    if (describe.请求值 && (describe.请求值.schema || describe.请求值.模式)) {
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
        if (describe.mode && describe.mode.noSchema) {

        } else {
            console.warn(`接口${path}没有提供请求格式`)
        }
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
                    let 权限设置 = app.apiAuthorization[user_group]
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
                                    if (权限设置[describe.一级分组]["权限"] == 'all') {
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
                                            if (权限设置[describe.一级分组][describe.二级分组] == "all") {
                                                next()
                                                return
                                            }

                                            if (typeof 权限设置[describe.一级分组][describe.二级分组] == "string") {
                                                用户组权限等级 = apiLevel.indexOf(权限设置[describe.一级分组][describe.二级分组])
                                            }
                                            else {

                                                用户组权限等级 = apiLevel.indexOf(权限设置[describe.一级分组][describe.二级分组]["权限"])
                                                if (权限设置[describe.一级分组][describe.二级分组]["权限"] == 'all') {
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
                            console.log(path, 接口等级, 用户组权限等级)
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
    if (describe.mode && describe.mode == 'sourcePath') {
        app.use(path, auth, async (req, res) => {
            let extensionName = req.url.substr(req.url.lastIndexOf('\.') + 1).split('?')[0]
            let filePath = describe.dirPath + req.url.split('?')[0]
            let customcompiler
            if (describe.compilers) {
                if (describe.compilers[extensionName]) {
                    customcompiler = describe.compilers[extensionName]
                }
                else if (describe.compilers["_default"]) {
                    customcompiler = describe.compilers["_default"]
                }
            }
            if (!customcompiler) {
                res.sendFile(filePath, req, res)
            }
            else {
                let data
                try {
                    data = await customcompiler(filePath, req, res)
                }
                catch (e) {
                    console.error(e)
                    data = ""
                }
                if (!res.destroyed) {
                    res.end(data)
                }
            }
        })
    }
    if (describe.mode && describe.mode == 'staticPath') {
        app.use(path, auth, express.static(describe['dirPath']))
        app.post(path, auth, (req, res) => {
            if (describe.postUpload) {
                if (req.fields && req.fields.path) {
                    if (req.files) {
                        const path = require('path')
                        let filePath = path.join(describe['dirPath'], req.fields.path);
                        fs.renameSync(req.files.file.path, filePath);
                        console.log(req.files);
                        res.json({ data: null, msg: "上传文件成功" });
                    }
                }

            }
            else if (describe.allowList) {
                let option = describe.option
                if (!option) {
                    option = { stats: true, base: describe['dirPath'] }
                }
                //option.cwd = describe['dirPath']
                let list = fg.sync('*', option)
                res.json({
                    code: 0,
                    data: list
                })
            } else {
                res.json({
                    msg: '抱歉,此位置不允许遍历',
                    code: 3,
                    data: null
                })
            }
        }
        )
        app.put(
            path, auth, (req, res) => {
                if (describe.allowUpload) {
                    if (req.fields && req.fields.path) {
                        if (req.files) {
                            const path = require('path')
                            let filePath = path.join(describe['dirPath'], req.fields.path);
                            fs.renameSync(req.files.file.path, filePath);
                            console.log(req.files);
                            res.json({ data: null, msg: "上传文件成功" });
                        }
                    }

                }
            }
        )
    }
    else if (describe.mode && (describe.mode == 'cmd' || describe.mode == 'shell')) {
        const { shellCmd } = require('../../util/shell')
        let target = describe.target
        let defaultArgs = describe.args
        let path = describe.dirPath
        let timeOut = describe.timeOut
        app.post(path, auth, async (req, res) => {
            let { args } = req.body
            args = defaultArgs + '\s' + args
            if (timeOut) {
                setTimeout(() => {
                    try {
                        res.json({
                            msg: '执行超时',
                            code: 3
                        })
                    } catch (e) {

                    }
                })
            }
            let msg = await shellCmd(target, args, { cwd: path })
            try {
                res.json({
                    code: 0,
                    msg: msg
                })
            } catch (e) {

            }

        }
        )
    }
    else if (describe.方法 && describe.方法 instanceof Object) {
        Object.getOwnPropertyNames(describe.方法).forEach(
            method => {
                !请求校验器 ? app[method](path, auth, describe['方法'][method]) : app[method](path, auth, 请求校验器, describe['方法'][method])

            }
        )

    }
}


export default class Api {
    constructor(app) {
        this.app = app
        this.doc = {}
        app.apiAuthorization = {
            visitor: {
                siyuanApi: { 权限: 'public' }
            }
        }
    }
    subRouters=[]
    describeApi(path, describe) {
        if (typeof path == 'string') {
            describeApi(path, describe, this.app, this.doc)
        }
        else if (path instanceof Array) {
            path.forEach(
                p => {
                    describeApi(p, describe, this.app, this.doc)
                }
            )
        }
        else {
            console.error(`path属性应当为字符串,收到了${path}`)
        }
    }
}