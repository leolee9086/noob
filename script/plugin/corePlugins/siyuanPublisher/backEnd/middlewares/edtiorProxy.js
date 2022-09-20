const {createProxyMiddleware }=require('http-proxy-middleware')
let naive=window.naive
const proxy = createProxyMiddleware ({
    target:`http://${naive.publishOption.思源伺服地址}:${naive.publishOption.思源伺服端口}`,
    changeOrigin:true,
    router: function (req) {
        return `http://${naive.publishOption.思源伺服地址}:${naive.publishOption.思源伺服端口}${req.url.replace('/siyuanPublisher/editor','')}`
    },
})
module.exports=proxy