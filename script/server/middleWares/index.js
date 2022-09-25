const compression = require("compression");
const bodyParser = require("body-parser");
const session = require("express-session");
const auth = require('./auth.js')
const syProxy = require('./syProxy.js')
function unzipJSON(msg) {
    return new Promise(function (resolve, reject) {
        const _data = []
        msg.on('data', chunk => {
            _data.push(...chunk)
        })
        msg.on('end', () => {
            // 把传递过来的数据转换为一个对象
            try {
                let str = new TextDecoder().decode(new Uint8Array(_data))
                resolve(JSON.parse(str))
            } catch (e) {
                reject(e)
            }
        })
    }
    )
}
const middlewares = {
    compression: compression(),
    json: bodyParser.json(),
    session: session({
        secret: "Auth", // 必选配置
        resave: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
        saveUninitialized: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
        cookie: { secure: false, maxAge: 800000, httpOnly: false }, // 可选，配置cookie的选项，具体可以参考文章的配置内容。
        name: "session-id", // 可选，设置个session的名字
    }),
    urlencoded: bodyParser.urlencoded({
        //此项必须在 bodyParser.json 下面,为参数编码
        limit: '1024mb',
        extended: true,
    }),
    allowCors: function (req, res, next) {
        console.log(req);
        res.setHeader("Access-Control-Allow-Private-Network", true);
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    },
    checkFileAccess: function (req, res, next) {
        console.log(req)
        if (req.session) {
            console.error(req.session)
        }
        next()
    },
    auth: auth,
    syProxy: syProxy,
    json解析器: async function (req, res, next) {
        console.log(req.method, req.url)
        if (req.headers["content-type"] == "text/plain;charset=UTF-8" && JSON.stringify(req.body) == '{}') {
            req.body = await unzipJSON(req)
        }
        next()
    }
}
module.exports = middlewares

