const compression = require("compression");
const bodyParser = require("body-parser");
const session = require("express-session");
const auth = require('./auth.js')
 const  middlewares = {
    compression:compression(),
    json:bodyParser.json(),
    session:session({
        secret: "Auth", // 必选配置
        resave: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
        saveUninitialized: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
        cookie: { secure: false, maxAge: 800000, httpOnly: false }, // 可选，配置cookie的选项，具体可以参考文章的配置内容。
        name: "session-id", // 可选，设置个session的名字
    }),
    urlencoded:bodyParser.urlencoded({
        //此项必须在 bodyParser.json 下面,为参数编码
        extended: false,
    }),
    allowCors:function (req, res, next) {
        console.log(req);
        res.setHeader("Access-Control-Allow-Private-Network", true);
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    },
    checkFileAccess:function(req,res,next){
        console.log(req)
        if(req.session){
            console.error(req.session)
        }
        next()
    },
    auth:auth
}
module.exports=middlewares 

