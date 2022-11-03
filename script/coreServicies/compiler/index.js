import compile from "./compile.js"
const express = require('express')
const fs  = require("fs-extra")
const app = express()
const http = require('http')
const compress = require("compression")()
const complieServer = http.createServer(app)
const path = require('path')
import addDevSurppoert from '../../publishServer/middleWares/dependenciesParser.js'
import { apiProxy, proxy as syProxy } from '../../publishServer/middleWares/syProxy.js';
import { wsProxy } from "../../publishServer/middleWares/wsProxy.js"
import {
    session,
    json,
    urlencoded,
    compression,
    allowCors,
    json解析器,
    passport
} from '../../publishServer/middleWares/index.js'
//启动esmsh服务器
import {esm} from "./esm/index.js"
import addEsmSurrport from "./esm/esmProxy.js"
esm("6810")
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

//addDevSurppoert(app)
addEsmSurrport(app,"6810")
ipcRenderer.on(
    "setPath",(event,dirs)=>{
        dirs.forEach(dirSet => {
            app.use(dirSet,compile(dirs(dirSet)))
        });
    }
)
//compile会在收到请求的时候自动将源代码转换成ems返回.
let options = {
    defs: {
      APP: false,
      MOBILE: false,
      BROWSER: true
    },
    verbose: true,
    tripleSlash: true,
    fillWithBlanks: false,
    uncommentPrefixString:false,
    hackPath: "",
    replace: {
      path: "path-browserify",
      "@simonwep/pickr":"/deps/@simonwep/pickr"
    },
    alias:{
        "@simonwep/pickr":"/deps/@simonwep/pickr"
    },
    base:path.join(workspaceDir,"\\conf\\appearance\\themes\\naive\\script\\siyuanAPP")
}
app.use('/siyuan/',compile(options))
app.use('/stage/',express.static(path.join(appDir,'stage')))
app.use('/appearance/',express.static(path.join(workspaceDir,"\\conf\\appearance")))
app.use('/api', (req, res) => apiProxy(req, res))
app.use('/assets', (req, res) => syProxy(req, res))

app.use('/fonts/', express.static(path.join(workspaceDir,"\\conf\\appearance\\themes\\naive\\script\\siyuanAPP\\src\\assets\\fonts")))
app.use(wsProxy)
complieServer.on('upgrade', wsProxy.upgrade)
complieServer.listen(6809,()=>{
    console.log("SSC服务器已经启动")
    ipcRenderer.send('服务启动完成',"ssc服务已经在6809端口启动")
})