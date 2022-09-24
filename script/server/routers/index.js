const express = require("express")
const router = express.Router();
const {auth} = naive.middlewares 
router.use("/", require('./home/index.js'))
router.use('/naiveApi/', require("./naiveApi/index.js"))
router.use("/user/", require("./user/index.js"))
router.use("/unauthorized/", require("./unauthorized/index.js"))
naive.pluginsApiRouter = require("./pluginsApi/index.js")
router.use("/api/", require("./siyuanApi/index.js"))

//这里用于对websocket进行转发
const { createProxyMiddleware } = require('http-proxy-middleware')
const proxy = createProxyMiddleware({
    target: `ws://${naive.publishOption.思源伺服地址}:${naive.publishOption.思源伺服端口}/ws`,
    changeOrigin: false,
    router: function (req) {
        console.log(req.url)
        return `ws://${naive.publishOption.思源伺服地址}:${naive.publishOption.思源伺服端口}${req.url}`
    },
    ws: true,
    logLevel: 'debug'
}
)
naive.wsProxy = proxy
router.use("/ws", proxy)
naive.serverUtil.describeJSONApi('/ws',{
    名称:'思源websocket',
    功能:'用于思源各个界面与核心之间的通信',
    方法:'todo',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'websocket'
})
module.exports = router