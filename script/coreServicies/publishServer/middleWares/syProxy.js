
const { createProxyMiddleware } = require('http-proxy-middleware')
let naive = window.naive
const proxy = createProxyMiddleware({
    target: `http://127.0.0.1:6806`,
    changeOrigin: true,
    pathRewrite: { '/siyuanPublisher/editor': '/' },
    //ws: true
})
const jsonApiproxy = async function (req, res) {
    if (req instanceof Function && res instanceof Function) {
        let preFix = req, afterFix = res
        return async function (req1, res1) {
            let syres = {}
            let apitoken = "8r0nhlyzfdd8gk1x"
            let url = "http://" + "127.0.0.1" + ":" + "6806" + req1.originalUrl;
            try {
                let data = req1.body
                let data_1 = await preFix(data, req1, res1)
                data = data_1 || data
                syres = await fetch(url, {
                    body: JSON.stringify(data),
                    method: "POST",
                    headers: {
                        Authorization: "Token " + apitoken,
                    }
                }
                )
                let json = await syres.json()

                let data_2 = await afterFix(json, req1, res1)
                json = data_2 || json
                res1.json(json)
            } catch (e) {
                res1.json({
                    code: 3,
                    data: null,
                    msg: e.message
                })
            }
        }
    }
    let syres = {}
    let apitoken = "8r0nhlyzfdd8gk1x"
    let url = "http://" + "127.0.0.1" + ":" + "6806" + req.originalUrl;
    try {
        let data = req.body
        syres = await fetch(url, {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                Authorization: "Token " + apitoken,
            }
        }
        )
        let json = await syres.json()
        res.json(json)
    } catch (e) {
        res.json({
            code: 3,
            data: null,
            msg: e.message
        })
    }
}


export  {  proxy as proxy}
export  {  jsonApiproxy as apiProxy}
export default  {
    proxy:proxy,
    apiProxy:jsonApiproxy
}
