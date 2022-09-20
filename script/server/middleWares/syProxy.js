const {createProxyMiddleware }=require('http-proxy-middleware')
let naive=window.naive
const proxy = createProxyMiddleware ({
    target:`http://${naive.publishOption.思源伺服地址}:${naive.publishOption.思源伺服端口}`,
    changeOrigin:true,
    pathRewrite:{'/siyuanPublisher/editor':'/'},
    //ws: true
})
const apiProxy = createProxyMiddleware ({
    target:`http://${naive.publishOption.思源伺服地址}:${naive.publishOption.思源伺服端口}`,
    changeOrigin:true,
   // ws: true
})
module.exports= {
    proxy:proxy,
    apiProxy:apiProxy
}