import {
    session,
    json,
    urlencoded,
    compression,
    allowCors,
    json解析器,
    passport
} from './middleWares/index.js'
import UI from "./ui.js"
const express = require('express')
const http = require("http");
let app = express()
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
const port = "80"
const host = "http://" + '127.0.0.1' + ":" + "80"
const sslPort = "443"
const publishServer = http.createServer(app);
app.use('/',(req,res,next)=>{
    res.end("test")
})
publishServer.listen(port, () => { 
    console.log("发布服务已经启动") 
    ipcRenderer.send('服务启动完成', "发布服务已经启动")
})


