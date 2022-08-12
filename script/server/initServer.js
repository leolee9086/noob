module.exports = {
  创建服务器: async function (naive) {
    if (global.publishserver) {
      console.log(global.publishserver);
      await global.publishserver.close();
      global.publishserver.listen(null);
    }
    const session = require('express-session')

    const api = require("../public/siYuanApi");
    const monitor = require('express-status-monitor')
    const fs = require("fs");
    const path = require("path");
    const compression = require("compression");
    const bodyParser = require("body-parser");
    const formiable = require("express-formidable");
    const express1 = require("express");
    const app = express1();
    const http = require("http");
    const https = require("https");
    const url = require("url");
    const sqlite3 = require("sqlite3").verbose();
    const crypto = require("crypto");
    const JSEncrypt = require("JSEncrypt");
    let jsEncrypt = new JSEncrypt();

    const dbname = "naiveDB.db";
    const db = new sqlite3.Database(
      naive.workspaceDir + `\\conf\\naiveConf\\${dbname}`
    );
    db.serialize(() => {
      const sql = `create table if not exists user (id TEXT primary key,user_name TEXT,password TEXT,mail TEXT)`;
      db.run(sql);
    });
    let keyStr;
    console.log(crypto.getCiphers());
    //这里初始化的密钥对必须如此
    const initKeyPair = function () {
      const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 1024,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
          //       cipher: 'aes-256-cbc',
          //         passphrase:'top secret'
        },
      });
      naive.pathConstructor.initFilep(
        naive.workspaceDir + `\\conf\\naiveConf\\privateKey.pem`,
        privateKey
      );
      naive.pathConstructor.initFilep(
        naive.workspaceDir + `\\conf\\naiveConf\\publicKey.pem`,
        publicKey
      );
    };
    initKeyPair();

    let rsaPublicKey = fs
      .readFileSync(naive.workspaceDir + `\\conf\\naiveConf\\publicKey.pem`)
      .toString("ascii");
    let rsaPrivateKey = fs
      .readFileSync(naive.workspaceDir + `\\conf\\naiveConf\\privateKey.pem`)
      .toString("ascii");
    jsEncrypt.setPublicKey(rsaPublicKey);
    let str = jsEncrypt.encrypt("测试");
    jsEncrypt.setPrivateKey(rsaPrivateKey);
    console.log(jsEncrypt.decrypt(str));

    //这里需要根据请求的来源判定返回的参数
    let scriptLoader = naive.ifdefParser;
    this.scriptLoader = scriptLoader;
    let cusoption = JSON.parse(
      fs.readFileSync(naive.pathConstructor.cusoptionPath(), "utf-8")
    );
    console.log(naive.workspaceDir);
    let realoption = naive.publishOption;
    this.realoption = realoption;
    思源api = new api(realoption);
    //启用gzip压缩
    //app.use(express1.json())
    //https://zhuanlan.zhihu.com/p/409813376
    const statusMonitor = require('express-status-monitor')();
    app.use(statusMonitor)

    app.use(session({
      secret: '12345-67890-09876-54321', // 必选配置
      resave: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
      saveUninitialized: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
      cookie: { secure: false, maxAge: 800000, httpOnly: false }, // 可选，配置cookie的选项，具体可以参考文章的配置内容。
      name: 'session-id', // 可选，设置个session的名字
  }))
  
    app.use(bodyParser.json()); //body-parser 解析json格式数据
    app.use(
      bodyParser.urlencoded({
        //此项必须在 bodyParser.json 下面,为参数编码
        extended: false,
      })
    );
    let router = express1.Router();

    app.use(function (req, res, next) {
      console.log(req);
      res.setHeader("Access-Control-Allow-Private-Network", true);
      res.setHeader("Access-Control-Allow-Origin", "*");
      next();
    });
    app.use(compression());
    //获取设置
    let res4 = await fs.readFileSync(naive.pathConstructor.cusoptionPath());
    const port = realoption.发布端口;
    const sslPort = "443";
    const publishServer = http.createServer(app);
    publishServer.listen(port, () => {
      console.log(`publish app listening on port ${port}`);
    });
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
    app.use(
      "/stage",
      express1.static(`${naive.pathConstructor.templatePath()}/stage/`)
    );
    //静态文件引用
    app.use(
      "/static",
      express1.static(
        `${naive.pathConstructor.naivePath()}/script/public/static/`
      )
    );
    //设置接口
    /*app.use(
      "/naiveApi/*",
      formiable({
        encoding: "utf-8",
        uploadDir: naive.pathConstructor.uploadCachePath(),
        multiples: true,
      })
    );*/
    app.post("/naiveApi/getPublishOption", (req, res) => {
      res.setHeader("Access-Control-Allow-Private-Network", true);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.end(JSON.stringify(realoption));
    });
    app.post("/naiveApi/system/stageAuth", (req, res) => {
      console.log(req);
      if (req.body) {
        let auth = req.body.auth;
        // jsEncrypt.setPrivateKey(rsaPrivateKey)
        //  let decipher = crypto.createDecipher("aes-256-cbc", rsaPrivateKey)
        console.log(rsaPrivateKey);
        console.log(auth);
        let string = jsEncrypt.decrypt(auth);
        console.log(string);
        let json = JSON.parse(string)
        console.log(json)
       
          let sql = `select * from user where user_name='${json.user}' and password='${json.password}'`
          db.get(sql,(err,rows)=>{
            if(err){
              res.end(JSON.stringify({code:1,msg:"登录错误"}))
            }
            else{
              console.log(rows)
              req.session.status = "login success"
              res.end(JSON.stringify({code:0,token:jsEncrypt.encrypt(rows.id)}))
            }
          })
        
    
      }
    });
    app.post("/naiveApi/system/rsaPublicKey", (req, res) => {
      let data = {
        msg: 0,
        data: {
          key: rsaPublicKey,
        },
      };
      res.end(JSON.stringify(data));
    });
    app.get("/naiveApi/getPublishOption", (req, res) => {
      res.setHeader("Access-Control-Allow-Private-Network", true);
      res.setHeader("Access-Control-Allow-Origin", "*");

      res.end(JSON.stringify(realoption));
    });

    app.post("/naiveApi/pluginConfig", (req, res) => {
      res.end(JSON.stringify(naive.pluginsConfig));
    });
    app.get("/naiveApi/pluginConfig", (req, res) => {
      res.end(JSON.stringify(naive.pluginsConfig));
    });
    app.post("/naiveApi/corePluginsList", (req, res) => {
      res.json(naive.corePluginsList);
    });
    app.get("/naiveApi/corePluginsList", (req, res) => {
      console.log;
      res.json(naive.corePluginsList);
    });
    app.post("/naiveApi/updatecache", async (req, res) => {
      let data = req.postbody.data;
      let id = data.id;
      this.更新缓存(id, content, naive.workspaceDir);
      res.send({ id: data.id });
    });
    app.post("/naiveApi/pluginConfig", (req, res) => {
      res.end(JSON.stringify(naive.corePlugins));
    });
    app.post("/naiveApi/corePlugins", (req, res) => {
      res.end(JSON.stringify(naive.corePlugins));
    });
    app.post("/naiveApi/file/putFile", (req, res) => {
      console.log(req);
      if (req.fields && req.fields.path) {
        if (req.files) {
          let filePath = path.join(naive.workspaceDir, req.fields.path);
          fs.renameSync(req.files.file.path, filePath);
          console.log(req.files);
          res.json({ data: null, msg: "上传文件成功" });
        }
      }
    });

    //暴露附件文件夹时允许访问附件路径
    if (realoption.暴露附件) {
      //app.use("/assets", express1.static(`${naive.workspaceDir}/data/assets/`));
      app.use("/assets", (req, res) => this.判定位置(req, res));
    }

    //emojis文件夹默认能够访问
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
            `${naive.pathConstructor.pluginsPath().replace("/plugins", "")}${
              parsedUrl.pathname
            }`,
            req.query.condition ? JSON.parse(req.query.condition) : {}
          );
          res.type("application/x-javascript");
          res.end(content);
        } else {
          try {
            let e = fs.existsSync(
              `${naive.pathConstructor.pluginsPath().replace("/plugins", "")}${
                parsedUrl.pathname
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
            res.end(e);
          }
        }
      } catch (e) {
        res.end(e);
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
          res.end(content);
        } catch (e) {
          console.log("解析失败", e);
          res.end("解析失败");
        }
      } else {
        res.sendFile(
          `${naive.pathConstructor.naivePath()}/${parsedUrl.pathname}`
        );
      }
    });
    app.use(
      "/stage",
      express1.static(
        `${naive.workspaceDir}/conf/appearance/themes/naive/script/publish/stage/`
      )
    );
    if (naive.sslOpen) {
      const sslPublishServer = https.createServer(sslSetting, app);
      sslPublishServer.listen(sslPort, () => {
        console.log(`sslPublish app listening on port ${443}`);
      });
    }

    naive.router = express1.Router();
    naive.expressApp = app;
    naive.express = express1;
    naive.设置 = realoption;
    naive.publishoption = realoption;
    naive.serverEndPluginConfig = JSON.parse(res4);
    naive.publishServer = publishServer;
    naive.eventBus.emit("message", {
      pushMode: 2,
      type: "serverStart",
    });
    return publishServer;
  },
  async 判定位置(req, res) {
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
