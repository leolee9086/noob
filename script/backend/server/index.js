import { session, json, urlencoded, compression, allowCors, json解析器, passport } from './middleWares/index.js'
import naiveApi from './util/api.js';
import apiSet from "./api/index.js"
import compilers from "../fileSys/compilers/index.js"
import addDevSurppoert from './middleWares/dependenciesParser.js'
import { apiProxy, proxy as syProxy } from './middleWares/syProxy.js';
import { wsProxy } from "./api/wsProxy.js"
import apiLoader from "./api/loader.js"
const { parse } = require('url');
const express = requireInstall('express')
const { Server } = requireInstall('ws');
const expressWS = require("express-ws")
const http = requireInstall("http");
const https = requireInstall("https");
export default class naiveServer {
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
  设定用户组权限() {
  }
  加载模块化api(){
    this.api加载器 = new apiLoader()
  }
  开始服务() {
    let { port } = this
    this.publishServer.listen(port, () => {
      console.log(`publish app listening on port ${port}`);
    })
  
  }
  初始化插件api() {
    this.api.注册(
      '/pluginHandler', {
      名称: '插件模块',
      功能: '插件系统所在位置',
      方法: {
        use: express.static("D:\\newSiyuan\\conf\\appearance\\themes\\naive\\script\\pluginHandler\\")
      },
      //权限为public的api固定所有用户都可以访问并获取正确的结果,不过可以在方法中加上别的过滤选项
      权限: 'public',
      请求值: 'todo',
      返回值: 'todo',
      一级分组: 'siyuanPublisher',
      二级分组: 'block'
    })
  }
  初始化基础api() {
    console.log(this.api)
    this.api.route('/', new apiSet())
    this.api.注册('/config/naiveConfig.js', {
      名称: '配置程序',
      功能: '生成配置',
      方法: {
        get: [async (req, res, next) => {
          res.sendFile(`${window.siyuan.config.system.workspaceDir}/conf/naiveConf/config/naiveConfig.js`)
        }
        ]
      },
      //权限为public的api固定所有用户都可以访问并获取正确的结果,不过可以在方法中加上别的过滤选项
      权限: 'public',
      请求值: 'todo',
      返回值: 'todo',
      一级分组: 'siyuanPublisher',
      二级分组: 'block'
    })

    this.api.注册('/naive/script', {
      名称: '主要路径',
      功能: '包含naive自身的程序和方法等,不包括配置文件寄',
      方法: {
        use: express.static(`${window.siyuan.config.system.workspaceDir}/conf/appearance/themes/naive/script`)
      },
      //权限为public的api固定所有用户都可以访问并获取正确的结果,不过可以在方法中加上别的过滤选项
      权限: 'public',
      请求值: 'todo',
      返回值: 'todo',
      一级分组: 'siyuanPublisher',
      二级分组: 'block'
    })
    this.api.注册('/src', {
      名称: '思源前端代码的主要路径',
      功能: `
      文件夹位于naive/scripts/frontend/src文件夹.
      包含思源的前端源代码，你可以通过在hack文件夹创建同样路径结构的文件来对思源的源代码进行hack`,
      方法: {
        use: async (req, res) => {
          res.setHeader(
            'content-type', 'application/javascript; charset=UTF-8'
          )
          const path = require("path")
          let filePath = path.join(`${window.siyuan.config.system.workspaceDir}/conf/appearance/themes/naive/script/frontend/src`, "\\", req.url)
          const fs = require('fs-extra')
          if (fs.existsSync(filePath + "\\index.ts")) {
            filePath = filePath + "\\index.ts"
          }
          let options = {
            defs: {
              APP: false,
              MOBILE: false,
              BROWSER: true
            },
            veborse: true,
            tripleSlash: true,
            fillWithBlanks: false,
            hackPath: `${window.siyuan.config.system.workspaceDir}/conf/appearance/themes/naive/script/frontend/hack`,
            replace: {
              path: "path-browserify"
            }
          }
          if (!filePath.endsWith(".scss")) {
            res.end(
              (await new compilers().ts.parseFile(filePath, options))
            )
          }
          else {
            res.end(
              await new compilers().sass.parseFile(filePath, options)
            )
          }
        }
      },
      //权限为public的api固定所有用户都可以访问并获取正确的结果,不过可以在方法中加上别的过滤选项
      权限: 'public',
      请求值: 'todo',
      返回值: 'todo',
      一级分组: 'siyuanPublisher',
      二级分组: 'block'
    })
    this.api.注册(
      "/client", {
      名称: '客户端',
      功能: 'naive客户端文件，用于热加载',
      方法: {
        use: express.static(`${window.siyuan.config.system.workspaceDir}/conf/appearance/themes/naive/script/frontend/client`)
      },
      //权限为public的api固定所有用户都可以访问并获取正确的结果,不过可以在方法中加上别的过滤选项
      权限: 'public',
      请求值: 'todo',
      返回值: 'todo',
      一级分组: 'siyuanPublisher',
      二级分组: 'block'
    }
    )
    this.api.注册("/editor", {
      名称: "编辑器",
      功能: "魔改之后的思源编辑器页面",
      方法: {
        use: async (req, res) => {
          let filePath = `${window.siyuan.config.system.workspaceDir}/conf/appearance/themes/naive/script/frontend/index.html`
          console.log(filePath)
          res.sendFile(
            filePath)
        }
      },
      //权限为public的api固定所有用户都可以访问并获取正确的结果,不过可以在方法中加上别的过滤选项
      权限: 'public',
      请求值: 'todo',
      返回值: 'todo',
      一级分组: 'siyuanPublisher',
      二级分组: 'block'
    }
    )
    this.app.use('/api', (req, res) => apiProxy(req, res))
   // this.app.use("/ws", wsProxy)
    this.app.use("/appearance", syProxy)
    this.app.use("/stage", syProxy)
    this.app.use("/assets", syProxy)

  }
}
/*const middlewares = require("./middleWares/index.js")
const passport = require('passport')
naive.middlewares = middlewares
const express1 = require("express");
naive.serverUtil.router = express1.Router

const fs = require("fs-extra")
const addDevSurppoert = require("./middleWares/dependenciesParser.js")
const addStaticPath = require('./middleWares/staticPath.js')
const api = require("../public/siYuanApi");
const app = express1();
naive.expressApp = app;
const { checkAdmin, models } = require('./models/index');
naive.dbModels = models
module.exports = {
  创建服务器: async function (naive) {
    if (global.publishserver) {
      console.log(global.publishserver);
      await global.publishserver.close();
      global.publishserver.listen(null);
    }
    //检查是否存在管理员权限
    await checkAdmin()
    //这里需要根据请求的来源判定返回的参数
    let scriptLoader = naive.ifdefParser;
    this.scriptLoader = scriptLoader;
    let realoption = naive.publishOption;
    this.realoption = realoption;
    naive.设置 = realoption;
    思源api = new api(realoption);
    // app.use(middlewares)
    //获取设置
    let res4 = await fs.readFileSync(naive.pathConstructor.cusoptionPath());
    const port = realoption.发布端口;
    const sslPort = "443";
    const publishServer = http.createServer(app);
    //这里使用的地址不能被思源伺服,否则密钥可能泄露
    let sslSetting = {};
    try {
      sslSetting = {
        pfx: fs.readFileSync(`${naive.pathConstructor.sslPath()}/server.pfx`),
        passphrase: fs.readFileSync(
          `${naive.pathConstructor.sslPath()}/server.txt`
        ),
      };
      naive.sslOpen = true;
    } catch (e) {
      console.log(e);
      naive.sslOpen = false;
    }

    naive.publishServer = publishServer
    this.空页面 = "";
    console.log(
      realoption.空页面内容.slice(5, realoption.空页面内容.length),
      6
    );
    if (realoption.空页面内容.indexOf("path:") == 0) {
      console.log(realoption.空页面内容, 7);
      try {
        this.空页面 = await fs.promises.readFile(
          realoption.空页面内容.slice(5, realoption.空页面内容.length),
          "utf-8"
        );
        console.log(this.空页面, 5);
      } catch (e) {
        console.log(e, 888);
      }
    }

    //允许访问外观设置文件夹内容
    //stage文件夹使用副本的方式访问
    addStaticPath(app)
    addDevSurppoert(app)

    //设置接口
    app.use('/', require("./routers/index.js"))
    //暴露附件文件夹时允许访问附件路径
    //emojis文件夹默认能够访问
    //只有暴露挂件选项开启时,能够访问挂件
    //此接口下的挂件可以使用裸模块导入

    //静态路径伺服块id
    //允许客户端刷新缓存内容
    //为发布端提供插件支持
    //plugins文件夹启用ifdef,除了默认的状态之外,还会加上插件里定义的condition,

    publishServer.timeout = 0
    publishServer.listen(port, () => {
      console.log(`publish app listening on port ${port}`);
    });

    if (naive.sslOpen) {
      const sslPublishServer = https.createServer(sslSetting, app);
      sslPublishServer.listen(sslPort, () => {
        console.log(`sslPublish app listening on port ${443}`);
      });
    }
    naive.router = express1.Router();
    naive.expressApp = app;
    naive.express = express1;
    naive.serverEndPluginConfig = JSON.parse(res4);
    naive.publishServer = publishServer;
    naive.eventBus.emit("message", {
      pushMode: 2,
      type: "serverStart",
    });
    naive.checkApidoc = function () {
      for (apiDocName in naive.doc.api) {
        let apiDoc = naive.doc.api[apiDocName]
        apiDoc.路径 = apiDocName
        if (!apiDoc.名称) {
          console.warn(`api文档错误:${apiDoc}的文档缺少接口名称`)
        }
        if (!apiDoc.功能) {
          console.warn(`api文档错误:${apiDoc}的文档缺少接口功能说明`)
        }
        if (!apiDoc.方法) {
          console.warn(`api文档错误:${apiDoc}的文档缺少方法说明`)
        }
        if (!apiDoc.权限) {
          console.warn(`api文档错误:${apiDoc}的文档缺少权限说明`)
        }
        if (!apiDoc.请求值) {
          console.warn(`api文档错误:${apiDoc}的文档缺少请求值说明`)
        }else           if (!apiDoc.请求值.格式) {
          console.warn(`api文档错误:${apiDoc}的文档缺少请求值`)
        }

        if (!apiDoc.返回值) {
          console.warn(`api文档错误:${apiDoc}的文档缺少路径说明`)
        }
        if (!apiDoc.一级分组) {
          console.warn(`api文档错误:${apiDoc}的文档缺少分组说明`)
        }
      };
      let apiList = Object.getOwnPropertyNames(naive.serverUtil.chekEndPoints())
      apiList.forEach(path => {
        if (!naive.doc.api[path]) {
          console.error(`api文档错误:${path}的文档缺失`)
        }
      });
    }
    naive.checkApidoc()
    return publishServer;
  },
  终止服务: async function () {
    console.log(global.publishserver);
    await global.publishserver.close();
    await global.publishserver.listen(null);
    global.publishserver = null;
    console.log("服务终止");
  },
};*/
