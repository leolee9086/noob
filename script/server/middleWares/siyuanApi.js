const {createProxyMiddleware }=require('http-proxy-middleware')
let naive=window.naive
const proxy = createProxyMiddleware ({
    target:`http://${naive.publishOption.思源伺服地址}:${naive.publishOption.思源伺服端口}`,
    changeOrigin:true,
    pathRewrite:{'/editor':'/'},
    ws: true
})
const apiProxy = createProxyMiddleware ({
    target:`http://${naive.publishOption.思源伺服地址}:${naive.publishOption.思源伺服端口}`,
    changeOrigin:true,
    ws: true
})


module.exports= function addSiyuanProxy(app){
    app.use('/editor',(req,res,next)=>{
        if(!req.session){
            res.redirect('/')
        }
        if(req.session&&req.session.user_group=='admin'){
            next()
        }

    })

    app.use('/editor',proxy)
    naive.publishServer.on('upgrade', proxy.upgrade)
    naive.siyuanProxy=proxy
}
