import {
    session,
    json,
    urlencoded,
    compression,
    allowCors,
    json解析器,
    passport
} from './middleWares/index.js'
import Api from "./util/api.js"
import { kernelApiList } from "./util/kernelApi.js"
import { 判定id权限 } from './middlewares/jsonReq.js'
import jsonReq from './middlewares/jsonReq.js'
import 渲染管线 from "./pipeRender/index.js"
import { 生成管线渲染器 } from './util/pipe.js'
import { proxy } from "./middleWares/syProxy.js"
import PathConstructor from './util/pathConstructor.js'
import { genUUID } from "http://127.0.0.1:6809/siyuan/src/util/genID.ts";
import { pathToId } from "./util/pathToNotePath.js"
import 设置 from "./config.js"
import ob渲染管线 from "./obPipeRender/index.js"
import addEsmSurrport from '../../compiler/esm/esmProxy.js'
const pathConstructor = new PathConstructor(workspaceDir)
const path = require("path")
let 管线渲染 = 生成管线渲染器(渲染管线)
let ob管线渲染 = 生成管线渲染器(ob渲染管线)
const { 转发JSON请求 } = jsonReq
const 核心api = new kernelApiList()
const unAuthedPageTemplate = {
    protected: "protected",
    private: "private"
}
const 默认发布设置 = "private"
window.私有块字典 = {}
const express = require('express')
const http = require("http");
let app = express()
//使用session
app.use(session)
//解析json
app.use(json); //body-parser 解析json格式数据
//解析url
app.use(urlencoded);
//压缩gzip
app.use(compression);
//允许跨域请求
app.use(allowCors);
//允许跨域请求
app.use(json解析器);
//向请求写入auth
app.use(passport.authenticate('session'));
const port = "80"
const host = "http://" + '127.0.0.1' + ":" + "80"
const sslPort = "443"
let api = new Api(app)
addEsmSurrport(app, 6810)

app.use("/", (req, res, next) => {
    /// console.log(req.socket.remoteAddress)
    console.log(req.originalUrl)
    if (req.originalUrl === "/") {
        res.redirect(`/block/?id=${设置.首页}`)
    } else {
        next()
    }
})
app.use("/favicon/*", (req, res) => { res.sendFile(设置.网站图标) })
app.use("/fonts/*", express.static(path.join(appDir, "stage", "build", "fonts")))

app.use("/assets", proxy)
app.use("/stage", (req, res, next) => {
    //console.log(req)
    if (req.url.endsWith("base.css")) {
        res.setHeader(
            "content-type", "text/css; charset=utf-8"
        )
        res.end(document.querySelector("[lang='sass']").innerText)
    }
    else {
        next()
    }
})
app.use("/stage",
    express.static(path.join(appDir, "stage"))
)
app.use("/ui", express.static(path.join(workspaceDir, "\\conf\\appearance\\themes\\naive\\script\\coreServicies\\publishServer\\ui")))
app.use("/appearance", express.static(path.join(workspaceDir, "conf", "appearance")))
app.use("/obsidian/themes", express.static(设置.obsidian库地址))
app.use("/obsidian/", async (req, res, next) => {
    let path = decodeURI(req.path)
    req._path = path
    let _path = require("path")
    let fs = require("fs-extra")
    let filePath = _path.join(设置.obsidian库地址, path)
    if (!fs.existsSync(filePath)) {
        filePath = filePath + '.md'
    }
    if (!fs.existsSync(filePath)) {
        filePath = filePath + '/index.md'
    }
    if (fs.existsSync(filePath)) {
        console.log(filePath)
        if (filePath.endsWith(".md")) {
            res.end(await ob管线渲染(req, res))
        } else {
            res.sendFile(filePath)
        }
    }
    else {
        res.status("404")
        res.end("文件不存在")
    }
})
app.use("/mdApi/backLinks", async (req, res) => {
    let list = window.obsidianFileList
    let query = req.query
    console.log(query)
    if (query) {
        let k = query.k
        console.log(k)
        let item = list.filter(
            el => {
                return el.lines 
            }
        )
        console.log(item)
        res.setHeader("Content-Type", "application/json; charset=utf-8"
        )
        res.end(JSON.stringify(item || {}))
    }


}
)

api.describeApi(
    //这表示这些api采用了完全一样的配置
    ['/block/:blockid', '/block/'],
    {
        名称: '首页',
        功能: '渲染首页',
        方法: {
            get: [async (req, res, next) => {
                if (req.session) {
                    let access = await 判定id权限(
                        req.params.blockid || req.query.blockid || req.query.id
                        ,
                        "",
                        true
                    );
                    //未登录状况以默认权限鉴权
                    if (req.socket.remoteAddress == "127.0.0.1" || req.socket.remoteAddress == "::ffff:127.0.0.1") {
                        next()
                    }

                    else if (req.session.status !== "Authed") {
                        //已经设置了access的路径,根据access鉴权
                        if (access == "protected") {
                            res.end(unAuthedPageTemplate.protected);
                        } else if (access == "private") {
                            res.end(unAuthedPageTemplate.private);
                        } else if (access == "public") {
                            next()
                        }
                        //没有设置或者为其他值的,根据默认设置鉴权
                        else {
                            if (!默认发布设置 || 默认发布设置 == "private") {
                                res.end(unAuthedPageTemplate.private);
                            } else if (默认发布设置 == "protected") {
                                res.end(unAuthedPageTemplate.protected);
                            } else if (默认发布设置 == "public" && !access) {
                                next()
                            }
                            else if (默认发布设置 == "public" && access) {
                                res.end(unAuthedPageTemplate.protected);
                            }
                            else {
                                res.end(unAuthedPageTemplate.protected);
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
                            res.end(unAuthedPageTemplate.private);
                            next()
                        }
                    }
                    //如果没有设置userGroup直接返回渲染结果,也就是所有登录用户都可以访问
                    else {
                        next()
                    }
                }
                //如果请求路径有问题,直接重定向到login
                else if (!req.session) {
                    res.redirect("/user/login");
                }
            },
            async (req, res) => {
                let id = req.params.blockid || req.query.blockid || req.query.id || 设置.首页.id || 设置.首页.思源文档id || 设置.首页;
                const fs = require("fs-extra");
                let cachePath = `${workspaceDir}/temp/noobCache/${id}.html`
                let cached
                if (!req.query.clear) {
                    if (fs.existsSync(cachePath)) {
                        let { updated } = await 核心api.getBlockAttrs(
                            { id: id }, ""
                        )

                        let state = fs.statSync(cachePath)
                        if (state) {
                            let cacheTime = require("dayjs")(state.mtime).format("YYYYMMDDHHmmss");
                            if (parseInt(updated) <= parseInt(cacheTime)) {
                                res.sendFile(cachePath)
                                cached = true
                            }
                            else {
                                cached = false
                            }
                        }
                    }
                }
                if (!cached) {
                    let content = await 管线渲染(req, res)
                    if (!fs.existsSync(cachePath)) {
                        pathConstructor.initFilep(
                            cachePath,
                            content,
                            function (err) {
                                if (err) {
                                    throw err;
                                }
                            }
                        );
                    }
                    else {
                        fs.writeFileSync(
                            cachePath, content
                        )
                    }

                }
            }
            ]
        },
        //权限为public的api固定所有用户都可以访问并获取正确的结果,不过可以在方法中加上别的过滤选项
        权限: 'public',
        请求值: 'todo',
        返回值: 'todo',
        一级分组: 'siyuanPublisher',
        二级分组: 'block'
    }
)
api.describeApi(
    '/getPrivateBlock',
    {
        名称: '获取私有块内容',
        功能: '获取发布页面下被token保护的私有块的实际内容',
        方法: {
            post: (req, res) => {
                let data = req.body
                if (data && data.id) {
                    if (私有块字典[data.id]) {
                        if (data.token == 私有块字典[data.id]['token']) {
                            res.end(JSON.stringify(
                                {
                                    msg: 0,
                                    data: {
                                        content: 私有块字典[data.id]['content']
                                    }
                                })
                            )
                        }
                        else {
                            res.end(JSON.stringify(
                                {
                                    msg: 0,
                                    data: {
                                        content: `<div>鉴权码错误</div>`
                                    }
                                }
                            ))
                        }
                    }
                } else {
                    res.end(JSON.stringify(
                        {
                            msg: 0,
                            data: {
                                content: `<div>鉴权码错误</div>`
                            }
                        }
                    ))
                }
            }
        },

        权限: 'public',
        请求值: 'todo',
        返回值: 'todo',
        一级分组: 'siyuanPublisher',
        二级分组: 'editor'
    },
)
api.describeApi(
    '/api/*',
    {
        名称: '发布界面思源api',
        功能: '用于发布页面的思源api转发,会对返回的块内容进行过滤,大部分api无法访问',
        方法: {
            post: 转发JSON请求
        },

        权限: 'public',
        请求值: 'todo',
        返回值: 'todo',
        一级分组: 'siyuanPublisher',
        二级分组: 'publishApi'
    },
)
let publishServer = http.createServer(app);


app.get("/*", async (req, res, next) => {

    let reg = /^\d{14}\-[0-9a-z]{7}$/
    let _path = decodeURI(req.path)
    console.log(_path)
    if (!reg.test(_path)) {
        next()
    }

    else {

        let id = await pathToId(_path)
        let data = await fetch(`http://127.0.0.1/block?id=${id}`)
        res.end(await data.text())
    }
})
async function cacheAll() {
    let stmt = `select * from blocks where type = 'd'`
    await 核心api.sql({ stmt: stmt }, "", (data) => {
        data.forEach(
            doc => {
                fetch(`http://127.0.0.1/block?id=${doc.id}&&clear=true`).then(
                    () => { 核心api.pushMsg({ msg: `${doc.id}发布缓存刷新` }, '') }
                )
            }
        )
    })
}
publishServer.listen(port, () => {
    console.log("发布服务已经启动")
    ipcRenderer.send('服务启动完成', "发布服务已经启动")
    import("http://127.0.0.1/ui/ui.js")
    setTimeout(
        cacheAll, 1000
    )
})
