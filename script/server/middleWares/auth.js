const session = require("express-session")

function authByParams(params) {
    return function(req,res,next){
    switch (req.method) {
        case "GET":
            if (req.session) {
                if(req.session&&params instanceof Object){
                    let flag = true
                    Object.getOwnPropertyNames(params).forEach(
                        prop=>{
                            if (params[prop] !== req.session[prop]){
                                flag = false

                                res.redirect("/unauthorized/protected")
                                res.end()
                            }
                        }
                    )
                    console.error(flag)
                    if(flag){
                        next()
                    }
                }
                else{
                    next()
                }
            }
            else{
                res.redirect("/unauthorized/protected")
                res.end()
            }
        default :
        if (req.session) {
            if(req.session&&params instanceof Object){
                let flag = true
                Object.getOwnPropertyNames(params).forEach(
                    prop=>{
                        if (params[prop] !== req.session[prop]){
                            flag =false
                            res.json({
                                msg:"抱歉,你无权访问此地址",
                                data:null,
                                code:3
                            })
                            res.end()
                        }
                    }
                )
                if(flag){
                    next()
                }
            }
            else{
                next()
            }
        }
        else{
            res.json({
                msg:"抱歉,你无权访问此地址",
                data:null,
                code:3
            })
        }

        break
    }
}
}
module.exports = authByParams