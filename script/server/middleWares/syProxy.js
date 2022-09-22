const { createProxyMiddleware } = require('http-proxy-middleware')
const apiFix = require('./apiFix/index.js')
let naive = window.naive
const proxy = createProxyMiddleware({
    target: `http://${naive.publishOption.思源伺服地址}:${naive.publishOption.思源伺服端口}`,
    changeOrigin: true,
    pathRewrite: { '/siyuanPublisher/editor': '/' },
    //ws: true
})
function unzip(msg) {
    return new Promise(function (resolve, reject) {
        const _data = []
        msg.on('data', chunk => {
            _data.push(...chunk)
        })
        msg.on('end', () => {
            // 把传递过来的数据转换为一个对象
            try{
            let str = new TextDecoder().decode(new Uint8Array(_data)) 
            resolve( JSON.parse(str))
            }catch(e){
                reject(e)
            }
        })
    }
    )
}
function unzipJSON(syRes) {
    return new Promise(function (resolve, reject) {
        const _data = []

        syRes.on('data', chunk => {
            _data.push(...chunk)
        })

        syRes.on('end', () => {
            // 把传递过来的数据转换为一个对象
            const zlib = require('zlib')
            zlib.unzip(Buffer.from(_data), (err, buffer) => {
                console.log(JSON.parse(buffer.toString('utf8')))
                resolve(JSON.parse(buffer.toString('utf8')))
            })

        })
    }
    )
}

const jsonApiproxy =async function(req,res){
    let syres = {}
    let apitoken = ""
    let url ="http://" +naive.publishOption.思源伺服地址 +":" +naive.publishOption.思源伺服端口 +req.originalUrl;
    try{
    let data = req.body   
    if (req.headers["content-type"]=="text/plain;charset=UTF-8"){
        data=await unzip(req)
    }
    let apiName = req.originalUrl.split('/').slice (-1)[0] 
    console.log(apiName)
    if (apiFix[apiName]) {

        if (apiFix[apiName]["preFix"]) {

            let preFix = naive.syAuthConfig.api[apiName]["preFix"]
            let  data_1 =  await preFix(data, req, res)
            data =data_1||data 
        }
    }
    syres = await fetch(url,{
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          Authorization: "Token " + apitoken,
        }}
    )
    let json = await syres.json()

    if (apiFix[apiName]) {
        if (apiFix[apiName]["afterFix"]) {
            let afterFix = naive.syAuthConfig.api[apiName]["afterFix"]
            let data_1= await afterFix(data, req, res)
            json =data_1||json
        }
    }
    res.json(json)
    }catch(e){
        res.json({
            code:3,
            data:null,
            msg:e.message
        })
    }
}
const apiProxy = createProxyMiddleware({
    target: `http://${naive.publishOption.思源伺服地址}:${naive.publishOption.思源伺服端口}`,
    changeOrigin: true,
    onProxyReq:async (proxyReq, req, res) => {
        console.log(req)
        let apiName = req.route.path.replace('/', '')
        if (naive.syAuthConfig && naive.syAuthConfig.api && naive.syAuthConfig.api[apiName]) {
            if (naive.syAuthConfig.api[apiName]["preFix"]) {
                let preFix = naive.syAuthConfig.api[apiName]["preFix"]
                await preFix(proxyReq, req, res)
            }
        }
    },

    onProxyRes:async (proxyRes, req, res) => {
        let apiName = req.url.split('/').slice (-1)[0] 
        if (naive.syAuthConfig && naive.syAuthConfig.api && naive.syAuthConfig.api[apiName]) {
            if (naive.syAuthConfig.api[apiName]["afterFix"]) {
                let afterFix = naive.syAuthConfig.api[apiName]["afterFix"]
                await afterFix(proxyRes, req, res)
            }
        }
    },
    onError: (err, req, res) => {
        console.error(err)
        res.json(
            {
                code: 3,
                msg: "接口请求错误",
                data: null
            }
        )
    },
})
module.exports = {
    proxy: proxy,
    apiProxy: jsonApiproxy
}