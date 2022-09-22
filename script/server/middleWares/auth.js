const session = require("express-session")

function authByParams(params) {
    let ret = function (req, res, next) {
        switch (req.method) {
            case "GET":
                if (req.session) {
                    if (req.session && params instanceof Object) {
                        let flag = true
                        Object.getOwnPropertyNames(params).forEach(
                            prop => {
                                if (params[prop].split instanceof Function) {
                                    let array = params[prop].split(',')
                                    if (array.indexOf(req.session[prop] < 0)) {
                                        flag = false
                                        res.redirect("/unauthorized/protected")
                                        res.end()
                                    }
                                }
                            }
                        )
                        console.error(flag)
                        if (flag) {
                            next()
                        }
                    }

                    else {
                        next()
                    }
                }

                else {
                    res.redirect("/unauthorized/protected")
                    res.end()
                }
            default:
                if (req.session) {
                    if (req.session && params instanceof Object) {
                        let flag = true
                        Object.getOwnPropertyNames(params).forEach(
                            prop => {
                                let array = params[prop].split(',')
                                if (array.indexOf(req.session[prop] < 0)) {
                                    flag = false
                                    res.json({
                                        msg: "抱歉,你无权访问此地址",
                                        data: null,
                                        code: 3
                                    })
                                    res.end()
                                }
                            }
                        )
                        if (flag) {
                            next()
                        }
                    }
                    else {
                        next()
                    }
                }
                else {
                    res.json({
                        msg: "抱歉,你无权访问此地址",
                        data: null,
                        code: 3
                    })
                }

                break
        }
    }
    return ret
}


authByParams.apiAuth = function apiAuth(req, res, next) {
    let apiName = req.route.path.replace('/', '')
    if (naive.syAuthConfig && naive.syAuthConfig.api && naive.syAuthConfig.api[apiName]) {
        let params = naive.syAuthConfig.api[apiName]
        if (params.access) {
            params = params.access
        }
        if (params instanceof Object) {
            let func = authByParams(params)
            func(req, res, next)
        }
    }
    else {
        next()
    }
}
module.exports = authByParams