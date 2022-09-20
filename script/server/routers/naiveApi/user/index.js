const { jsEncrypt, rsaPublicKey, rsaPrivateKey } = require("../../../keys/index.js");
const express = require('express');
const router = express.Router();
const {models} = require("../../../models/index.js")
router.post("/regist", async (req, res) => {
    if (req.body) {
        let auth = req.body.auth;
        let string = jsEncrypt.decrypt(auth);
        let json = JSON.parse(string);
        let checkedUser = await models.user.findAll({
            where: {
                name: json.user,
            },
        });
        console.log(checkedUser);
        if (checkedUser && checkedUser[0]) {
            res.json({
                code: 1,
                msg: "存在重复的用户名",
            });
            return;
        }  else {
            if (json.password.length <= 8) {
                res.json({
                    code: 2,
                    msg: "密码长度过短,请使用大于8位的密码",
                });
                return;
            }
            if (json.password.length >= 16) {
                res.json({
                    code: 2,
                    msg: "密码长度过长,请使用不大于16位的密码",
                });
                return;
            }
            let reg1 = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
            let reg2 = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
            if (!reg1.test(json.password) && !reg2.test(json.password)) {
                res.json({
                    code: 2,
                    msg: "密码至少应包含一位特殊字符",
                });
                return;
            }

            if (naive.dbNoUser) {
                if (json.authToken !== window.siyuan.config.accessAuthCode) {
                    res.json(
                        {
                            code: 3,
                            msg: "抱歉,访问鉴权码错误"
                        }
                    )
                    return
                }
                if (json.apiToken !== window.siyuan.config.api.token) {
                    res.json(
                        {
                            code: 3,
                            msg: "抱歉,apiToken错误"
                        }
                    )
                    return
                }

                await models.user.create({
                    id: Lute.NewNodeID(),
                    name: json.user,
                    password: json.password,
                    user_group: "admin",
                });
                req.session.statues = "Authed"
                req.session.user = json.user
                req.session.user_group = 'admin'
                req.session.failed = 0

            }

            await models.user.create({
                id: Lute.NewNodeID(),
                name: json.user,
                password: json.password,
            });
            req.session.statues = "Authed"
            req.session.user = json.user
            req.session.user_group = 'visitor'
            req.session.failed = 0

            res.json({
                code: 0,
                token: jsEncrypt.encrypt(
                    JSON.stringify({
                        name: checkedUser.name,
                        group: "visitor",
                    })
                ),
            });
        }
    }
});
router.post("/login", async (req, res) => {
    console.log(req);
    if (req.session && req.session.failed && req.session.nextAllowedTry) {
        let date = new Date()
        req.session.nextAllowedTry <= date.getMilliseconds()
        res.json({
            code: 1,
            msg: "失败次数过多,请稍候重新登录"
        }
        )
        return
    }
    if (!req.body) {
        res.json({
            code: 1,
            msg: "请求错误,请重新尝试"

        })
    }
    if (req.body) {

        let auth = req.body.auth;
        let string = jsEncrypt.decrypt(auth);
        let json = JSON.parse(string);
        let checkedUser = await models.user.findAll({
            where: {
                name: json.user,
                password: json.password,
            },
        });
        console.log(checkedUser)
        if (checkedUser && checkedUser[0]) {
            req.session.status = "Authed";
            req.session.user = checkedUser[0].name
            req.session.user_group = checkedUser[0].user_group
            req.session.failed = 0
            console.error(req.session)
            res.json({
                code: 0,
                token: jsEncrypt.encrypt(
                    JSON.stringify({
                        name: checkedUser.name,
                        group: checkedUser.user_group,
                    })
                ),
            });
            return
        }
        else {
            req.session.status = "";
            req.session.user = ''
            req.session.user_group = ''
            if (!req.session.failed) {
                req.session.failed = 1
            }
            else {
                req.session.failed += 1
            }
            if (req.session.failed >= 10) {
                let date = new Date()
                date.setMinutes(date.getMinutes() + 10)
                req.session.nextAllowedTry = date.getMilliseconds()
                res.json(
                    {
                        code: 1,
                        msg: "失败次数过多,请在10分钟后尝试重新登录"
                    }
                )
                return
            }
            res.json(
                {
                    code: 1,
                    msg: '登录失败,请重新尝试'
                }
            )

        }
    }
});
module.exports=router