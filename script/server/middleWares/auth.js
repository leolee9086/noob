const session = require("express-session")
const { DATE } = require("sequelize")

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
naive.syAuthConfig = {
    api: {
        insertBlock: {
            access: { user_group: 'admin' },
            preFix: function (data, rawReq, rawRes) {
                console.log(syReq)
            },
            afterFix: async function (data, rawReq, rawRes) {
                console.log(data)
            }
        },
        transactions: {
            access: { user_group: 'admin' },
            preFix:async function (data, rawReq, rawRes) {
                console.log(data)
                if(data.transactions){
                    data.transactions.forEach(
                        transaction=>{
                            transaction.doOperations.forEach(
                                Operation=>{
                                    Operation.data=Operation.data.replace(/\&lt\;span\&gt\;/g,'<span>')
                                    Operation.data=Operation.data.replace(/\&lt\;\/span&gt\;/g,'</span>')

                                    naive.核心api.setBlockAttrs({
                                        id:Operation.id,
                                        attrs:{
                                            'custom-lastedit-ip':rawReq.socket.remoteAddress,
                                            'custom-lastedit-user':rawReq.session.user||'visitor',
                                            'custom-lastedit-describe':`来自${rawReq.socket.remoteAddress}的${rawReq.session.user||'visitor'} 编辑于${new Date().toString()} `,                                            
                                        }
                                    },'')
                                }
                            )
                        }
                    )
                }
                return data
            },
            afterFix: async function (data, rawReq, rawRes) {
                console.log(data)
                return data
            }
        },
        prependBlock: { user_group: 'admin' },
        appendBlock: { user_group: 'admin' },
        updateBlock: { user_group: 'admin' },
        deleteBlock: { user_group: 'admin' },
        setBlockReminder: { user_group: 'admin' },
        setBlockAttrs: {             
            access: { user_group: 'admin' },
        preFix: function (syReq, rawReq, rawRes) {
            console.log(syReq)
        },
        afterFix: async function (syRes, rawReq, rawRes) {
            console.log(syRes)
            let str= await unzip(syRes)
            console.log(str)
            rawRes.end(JSON.stringify(str))
        }
},
        upload: { user_group: 'admin' }
    }
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