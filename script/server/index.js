import { session, json, urlencoded, compression, allowCors, json解析器, passport } from './middleWares/index.js'

export default class naiveServer{
    constructor(naive) {
        this.naive = naive
        this.app = express()
        let app = this.app
        //使用session
        app.use(session)
        //解析json
        app.use(json); //body-parser 解析json格式数据
        //解析url
        app.use(urlencoded);
        //压缩gzip
        app.use(compression);
        //允许跨域请求
        app.use(allowCors);
        //允许跨域请求
        app.use(json解析器);
        //向请求写入auth
        app.use(passport.authenticate('session'));
        //增减开发依赖支持
        addDevSurppoert(app)
        this.port = naive.public.config.backend.server.port
        this.host = "http://" + naive.public.config.backend.server.location + ":" + naive.public.config.backend.server.port
        this.sslPort = "443"
        this.publishServer = http.createServer(app);
        this.app = expressWS(app,this.publishServer).app
        this.api = new naiveApi(app)
        this.设定用户组权限()
        this.初始化基础api()
        this.初始化插件api()
        this.加载模块化api()
        app.ws('/clientws', function (ws, req) {
          ws.on('message', function (msg) {
            console.log(ws)
            ws.send(1111);
          });
        }
        )
      }
    
}