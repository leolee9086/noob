const session = require("express-session");
const bodyParser = require("body-parser");
module.exports = function addParser(app){
        app.use(
            session({
                secret: "12345-67890-09876-54321", // 必选配置
                resave: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
                saveUninitialized: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
                cookie: { secure: false, maxAge: 800000, httpOnly: false }, // 可选，配置cookie的选项，具体可以参考文章的配置内容。
                name: "session-id", // 可选，设置个session的名字
              })
        
        )
        app.use(bodyParser.json()); //body-parser 解析json格式数据
        app.use(
          bodyParser.urlencoded({
            //此项必须在 bodyParser.json 下面,为参数编码
            extended: false,
          })
        );
    
    }
