const session = require("express-session")

function authByParams(req, res, params,next) {
    console.error(req.method)
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
                    if(flag){
                        next()
                    }
                    
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
module.exports = auth