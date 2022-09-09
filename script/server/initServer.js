
const {fs,importParser,MagicString} =  naive.serverUtil
const addDevSurppoert = require("./middleWares/dependenciesParser.js")
const addBaseParser = require('./middleWares/baseParsers.js')
const addStaticPath = require('./middleWares/staticPath.js')
const addNaiveApi = require('./middleWares/naiveApi.js')
const addSiyuanProxy = require('./middleWares/siyuanApi.js')
const api = require("../public/siYuanApi");
const path = require("path");
const formiable = require("express-formidable");
const express1 = require("express");
const app = express1();
const http = require("http");
const https = require("https");
const { jsEncrypt, rsaPublicKey, rsaPrivateKey } = require('./keys/index.js')
const { checkAdmin } = require('./models/index')
const statusMonitor = require("express-status-monitor")();
naive.Handle=function(method,pattern,...args){
  method=="ALL"?method="use":null
  console.log(method,pattern,...args)
  let pipes = [...args]
  console.log(pipes)
  console.log(app[method])
  pipes.forEach(
    middle=>app[method](pattern,(req,res,next)=>middle(req,res,next))
  )
}
function parseImport(code) {
  console.force_log(importParser.parse(code))
  let [imports, exports] = importParser.parse(code)
  let codeMagicString = new MagicString(code)
  imports.forEach(
    导入声明 => {
      if (导入声明.n) {
        codeMagicString.overwrite(导入声明.s, 导入声明.e, 重写导入(导入声明))
      }
    }
  )
  return codeMagicString.toString()
}
function 重写导入(导入声明) {
  console.log(导入声明)
  let name = 导入声明.n
  if (name && !name.startsWith('/') && !name.startsWith('./') && !name.startsWith('../')) {
    console.log(`模块${name}重定向到naive设置文件夹/deps/esm`)

    name = '/deps/' + name
  } else {
    console.log(导入声明)
  }
  return name
}
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
    let cusoption = JSON.parse(
      fs.readFileSync(naive.pathConstructor.cusoptionPath(), "utf-8")
    );
    console.log(naive.workspaceDir);
    let realoption = naive.publishOption;
    this.realoption = realoption;
    naive.设置 = realoption;
    思源api = new api(realoption);
    //启用gzip压缩
    //app.use(express1.json())
    //https://zhuanlan.zhihu.com/p/409813376
    //启用性能监控

    //app.use(statusMonitor);
    addBaseParser(app)
    app.use(function (req, res, next) {
      console.log(req);
      res.setHeader("Access-Control-Allow-Private-Network", true);
      res.setHeader("Access-Control-Allow-Origin", "*");
      next();
    });
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
    //设置接口
    addNaiveApi(app)
    addDevSurppoert(app)
    /*  const vite = await createViteServer({
        root:"d:/test/index.html",
        server:{
          middlewareMode: 'html' 
        }
      })
  
      app.use("/hmr/*",vite.middlewares)*/
    //暴露附件文件夹时允许访问附件路径
    if (realoption.暴露附件) {
      //app.use("/assets", express1.static(`${naive.workspaceDir}/data/assets/`));
      app.use("/assets", (req, res) => this.转发请求(req, res));
    }

    //emojis文件夹默认能够访问
    naive.Handle("ALL","/status",express1.static("D:/test"))

    app.use(
      "/emojis",
      express1.static(`${naive.workspaceDir}/conf/appearance/emojis`)
    );
    //只有暴露挂件选项开启时,能够访问挂件
    if (realoption.暴露挂件) {
      app.use(
        "/widgets",
        express1.static(`${naive.workspaceDir}/data/widgets/`)
      );
    }
    //静态路径伺服块id
    //允许客户端刷新缓存内容
    //为发布端提供插件支持
    console.log(naive.pathConstructor.pluginsURL());
    //plugins文件夹启用ifdef,除了默认的状态之外,还会加上插件里定义的condition,
    app.use("/plugins/*", async function (req, res, next) {
      console.log(req);
      let parsedUrl = req._parsedUrl;
      parsedUrl.pathname = decodeURI(parsedUrl.pathname);
      try {

        if (req.query.condition) {
          let content = await naive.ifdefParser.parse(
            `${naive.pathConstructor.pluginsPath().replace("/plugins", "")}${parsedUrl.pathname
            }`,
            req.query.condition ? JSON.parse(req.query.condition) : {}
          );
          content = parseImport(content)
          res.type("application/x-javascript");
          res.end(content);
        } else {
          if (req.baseUrl.endsWith('.js')) {
            let content = naive.fs.readFileSync(`${naive.pathConstructor.pluginsPath().replace("/plugins", "")}${parsedUrl.pathname
              }`, 'utf-8')
            content = parseImport(content)
            res.type("application/x-javascript");
            console.log(content)
            res.end(content);

          }
          else try {
            let e = fs.existsSync(
              `${naive.pathConstructor.pluginsPath().replace("/plugins", "")}${parsedUrl.pathname
              }`
            );
            if (e) {
              await res.sendFile(
                `${naive.pathConstructor
                  .pluginsPath()
                  .replace("/plugins", "")}${parsedUrl.pathname}`
              );
            } else {
              res.status(404);
              res.end();
            }
          } catch (e) {
            res.end(e.message);
          }
        }
      } catch (e) {
        res.end(e.message);
      }
    });
    app.use("/script/*", async function (req, res, next) {
      console.log(req);
      let parsedUrl = req._parsedUrl;
      console.log(req.query);
      if (req.query.condition) {
        try {
          let content = await naive.ifdefParser.parse(
            `${naive.pathConstructor.naivePath()}/${parsedUrl.pathname}`,
            req.query.condition ? JSON.parse(req.query.condition) : {}
          );
          res.type("application/x-javascript");
          content = parseImport(content)

          res.end(content);
        } catch (e) {
          console.log("解析失败", e);
          res.end("解析失败");
        }
      } else {
        if (req.baseUrl.endsWith('.js')) {
          let content = fs.readFileSync(`${naive.pathConstructor.naivePath()}/${parsedUrl.pathname}`, 'utf-8')
          content = parseImport(content)
          res.type("application/x-javascript");
          res.end(content);
        } else {

          res.sendFile(
            `${naive.pathConstructor.naivePath()}/${parsedUrl.pathname}`
          );
        }
      }
    });
    publishServer.listen(port, () => {
      console.log(`publish app listening on port ${port}`);
    });

    if (naive.sslOpen) {
      const sslPublishServer = https.createServer(sslSetting, app);
      sslPublishServer.listen(sslPort, () => {
        console.log(`sslPublish app listening on port ${443}`);
      });
    }
    addSiyuanProxy(app)

    naive.router = express1.Router();
    naive.expressApp = app;
    naive.express = express1;
    naive.serverEndPluginConfig = JSON.parse(res4);
    naive.publishServer = publishServer;
    naive.eventBus.emit("message", {
      pushMode: 2,
      type: "serverStart",
    });
    return publishServer;
  },
  async 转发请求(req, res) {
    const http = require("http");
    var { connection, host, ...originHeaders } = req.headers;
    // 构造请求报文
    console.log(req.url, req.body);
    var options = {
      method: req.method,
      hostname: this.realoption.思源伺服地址,
      port: this.realoption.思源伺服端口,
      path: req.originalUrl,
      headers: { originHeaders },
    };
    // 通过req的data事件和end事件接收客户端发送的数据
    // 并用Buffer.concat处理一下
    let postbody = [];
    req.on("data", (chunk) => {
      postbody.push(chunk);
    });
    req.on("end", () => {
      console.log("end");
      let postbodyBuffer = Buffer.concat(postbody);
      // 定义变量接收目标服务器返回的数据
      let responsebody = [];
      // 发送请求头
      var request1 = http.request(options, (response2) => {
        response2.on("data", (chunk) => {
          responsebody.push(chunk);
        });
        response2.on("end", () => {
          // 处理目标服务器数据,并将其返回给客户端
          responsebodyBuffer = Buffer.concat(responsebody);
          console.log(response2, 25);
          res.setHeader("Access-Control-Allow-Private-Network", true);
          res.end(responsebodyBuffer);
        });
      });
      // 将接收到的客户端请求数据发送到目标服务器;
      request1.write(postbodyBuffer);
      request1.end();
    });
    // console.log(req.body,2)
  },
  终止服务: async function () {
    console.log(global.publishserver);
    await global.publishserver.close();
    await global.publishserver.listen(null);
    global.publishserver = null;
    console.log("服务终止");
  },
};
