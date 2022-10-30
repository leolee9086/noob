import syProxy from './syProxy.js'
export function unzipJSON(msg) {
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
export const bodyParser = require("body-parser")
export const compression = require("compression")()
export const json = bodyParser.json()
export const session = require("express-session")({
    secret: "Auth", // 必选配置
    resave: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
    saveUninitialized: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
    cookie: { secure: false, maxAge: 800000, httpOnly: false }, // 可选，配置cookie的选项，具体可以参考文章的配置内容。
    name: "session-id", // 可选，设置个session的名字
})
export const urlencoded = bodyParser.urlencoded({
    //此项必须在 bodyParser.json 下面,为参数编码
    limit: '1024mb',
    extended: true,
})
export const allowCors = function (req, res, next) {
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
}
export function checkFileAccess(req, res, next) {
    if (req.session) {
        console.error(req.session)
    }
    next()
}
export const auth = require("express-session")
export { syProxy as syProxy}
export const json解析器 = async function (req, res, next) {
    if (req.headers["content-type"] == "text/plain;charset=UTF-8" && JSON.stringify(req.body) == '{}') {
        req.body = await unzipJSON(req)
    }
    next()
}
export const passport= require('passport')
export default   {
    unzipJSON, compression, json, session, urlencoded, allowCors, checkFileAccess, auth, syProxy, json解析器
}

