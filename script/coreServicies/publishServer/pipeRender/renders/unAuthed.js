import 设置 from "../../config.js"
import 核心api from "../../util/kernelApi.js"
const fs =require("fs-extra")

export async function 判定并生成空页面(req, res, next) {
    if (渲染结果 && req.session) {
        let access = this.判定id权限(
            req.params.blockid || req.query.blockid || req.query.id
            ,
            "",
            true
        );
        console.error(access);
        //未登录状况以默认权限鉴权
        if (req.session.status !== "Authed") {
            //已经设置了access的路径,根据access鉴权
            if (access == "protected") {

                res.end(设置.unAuthedPageTemplate.protected);
                console.log(res);
                
            } else if (access == "private") {

                res.end(设置.unAuthedPageTemplate.private);
                console.log(res);
            } else if (access == "public") {
                next()
            }
            //没有设置或者为其他值的,根据默认设置鉴权
            else {
                if (!设置.默认发布设置 || 设置.默认发布设置 == "private") {
                    console.error('test')
                    res.end(设置.unAuthedPageTemplate.private);

                } else if (设置.默认发布设置 == "protected") {
                    res.end(设置.unAuthedPageTemplate.protected);
                    console.log(res);
                } else if (设置.默认发布设置 == "public" && !access) {
                    next()
                }
                else if (设置.默认发布设置 == "public" && access) {

                    res.end(设置.unAuthedPageTemplate.protected);
                    next()
                }
                else {
                    res.end(设置.unAuthedPageTemplate.protected);
                    next()

                }

            }
        }
        //已经登录的状况,则以userGroup鉴权
        else if ((access + "").startsWith("userGroup:")) {
            let userGroup = access.slice("userGroup:".length, access.length);
            console.error(userGroup);
            let array = userGroup.split(",");
            //如果块的userGroup包含了当前请求会话所在的userGroup,返回块内容
            if (req.session.user_group == 'admin') {
                next();
            }
            if (array.indexOf(req.session.user_group) >= 0) {
                next();
            } else {
                res.end(设置.unAuthedPageTemplate.private);
                next()
            }
        }
        //如果没有设置userGroup直接返回渲染结果,也就是所有登录用户都可以访问
        else {
            next()
        }
    }
    //如果请求路径有问题,直接重定向到login
    else if (!渲染结果 || !req.session) {
        res.redirect("/user/login");
        
    }
}
