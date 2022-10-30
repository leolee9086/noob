const { createProxyMiddleware } = require('http-proxy-middleware')
        const proxy = createProxyMiddleware({
            //taget:"ws://127.0.0.1:6806/ws",
            changeOrigin: false,
            router: function (req) {
                console.log(req.url)
                return `ws://127.0.0.1:6806${req.url}`
            },
            ws: true,
            logLevel: 'debug'
        }
        )
export default proxy
export {proxy as wsProxy}