const { createProxyMiddleware } = require('http-proxy-middleware')

export default class wsProxy{
    constructor(app,target,router,path){
        const proxy = createProxyMiddleware({
            target: target,
            changeOrigin: false,
            router: function (req) {
                console.log(req.url)
                return `ws://${naive.publishOption.思源伺服地址}:${naive.publishOption.思源伺服端口}${req.url}`
            },
            ws: true,
            logLevel: 'debug'
        }
        )
        this.proxy=proxy
        this.app =app
        app.use(path,proxy)
    }
}