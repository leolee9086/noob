const { createProxyMiddleware } = require('http-proxy-middleware')

export default function addEsmSurrport(app, port) {
    const proxy = createProxyMiddleware({
        target: `http://127.0.0.1:${port}/`,
        changeOrigin: true,
       pathRewrite: { '/deps/': '/' },
        //ws: true
    })
    app.use("/deps/", proxy)
}