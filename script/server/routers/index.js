const express = require("express")
const router = express.Router();
router.use("/", require('./home/index.js'))
router.use('/naiveApi/', require("./naiveApi/index.js"))
router.use("/user/", require("./user/index.js"))
router.use("/unauthorized/", require("./unauthorized/index.js"))
naive.pluginsApiRouter = require("./pluginsApi/index.js")

try {
    router.use("/siyuanApi/", require("./siyuanApi/index.js"))
    router.use("/api/", require("./siyuanApi/index.js"))

    const { createProxyMiddleware } = require('http-proxy-middleware')
    const {
        debugProxyErrorsPlugin, // subscribe to proxy errors to prevent server from crashing
        loggerPlugin, // log proxy events to a logger (ie. console)
        errorResponsePlugin, // return 5xx response on proxy error
        proxyEventsPlugin, // implements the "on:" option
      } = require('http-proxy-middleware');
    const proxy = createProxyMiddleware({
        target: `ws://${naive.publishOption.思源伺服地址}:${naive.publishOption.思源伺服端口}/ws`,
        changeOrigin: false,
        router:function(req){
            console.log(req.url)
            return `ws://${naive.publishOption.思源伺服地址}:${naive.publishOption.思源伺服端口}${req.url}`
        },
        ws: true,
       // plugins: [debugProxyErrorsPlugin, loggerPlugin, errorResponsePlugin, proxyEventsPlugin],
       
       /* upgrade:(req,socket)=>{
            console.log(req,socket)
            socket.on(
                "error",(err)=>{
                    console.log(err)
                }
            )
        },*/
        logLevel : 'debug'
    }
    )
    naive.wsProxy = proxy
    router.use("/ws",proxy)
  /*  naive.publishServer.on("upgrade",(req,socket)=>{
        console.log(req,socket)
        socket.on(
            "error",(err)=>{
                console.error(err)
            }
        )
    })*/


} catch (e) {
    console.error(e)
}
module.exports = router