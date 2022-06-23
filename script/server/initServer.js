
module.exports = {
  创建服务器: async function (workspaceDir, userId) {
    if (global.publishserver) {
      console.log(global.publishserver);
      await global.publishserver.close();
      global.publishserver.listen(null);
    }
    const 渲染器类 = require("./template");
    const api = require("../public/siYuanApi");
    const fs = require("fs");
    const compression = require('compression')
    const bodyParser = require("body-parser");
    const express1 = require("express");
    const app = express1();
    const http =require('http')
    const https =require('https')
    naive.expressApp = app;
    naive.express = express1;
    const cusoptionpath = `${workspaceDir}/${naive.插件文件夹路径}/publish.json`;
    let cusoption = JSON.parse(fs.readFileSync(cusoptionpath, "utf-8"));
    let realoption = naive.生成默认设置(cusoption, workspaceDir, userId,naive.插件文件夹路径);
    naive.设置 = realoption;
    this.渲染器 = null;
    this.realoption = realoption;
    naive.publishoption = realoption;
    console.log(cusoption);
    console.log(workspaceDir);
    console.log(realoption, 15);
    思源api = new api(realoption);
    渲染器 = new 渲染器类(realoption);
    this.渲染器 = 渲染器;
    naive.发布渲染器 = 渲染器;
    //启用gzip压缩
    app.use(compression());
    let res4 = await fs.readFileSync(
      `${workspaceDir}/${naive.插件文件夹路径}/config.json`
    );
    naive.serverEndPluginConfig = JSON.parse(res4);
    app.use(bodyParser.json()); //body-parser 解析json格式数据
    app.use(
      bodyParser.urlencoded({
        //此项必须在 bodyParser.json 下面,为参数编码
        extended: true,
      })
    );
    const port = realoption.发布端口;
    const sslPort ="443"
    const publishServer= http.createServer(app)
    publishServer.listen(port, () => {
      console.log(`publish app listening on port ${port}`);
    });
    //这里不能使用工作空间内的地址
    const sslSetting ={
      pfx:fs.readFileSync(this.realoption.publishSSLpfx),
      passphrase:fs.readFileSync(this.realoption.publishSSLpassphrase)
    }
    const sslPublishServer = https.createServer(sslSetting,app)
    sslPublishServer.listen(sslPort,() => {
      console.log(`sslPublish app listening on port ${443}`,sslPublishServer,sslSetting);
    });

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
    console.log(app);

    //允许访问外观设置文件夹内容
    app.use("/appearance", express1.static(`${workspaceDir}/conf/appearance/`));

    //stage文件夹使用副本的方式访问
    app.use("/stage", express1.static(`${workspaceDir}/conf/appearance/themes/naive/script/publish/stage/`));
    app.use("/static", express1.static(`${workspaceDir}/conf/appearance/themes/naive/script/public/static/`));

    //暴露附件文件夹时允许访问附件路径
    if(realoption.暴露附件){
    app.use("/assets", express1.static(`${workspaceDir}/data/assets/`));
      }
    //允许搜索时,能够访问文档树
    app.post("/api/notebook/lsNotebooks", (req, res) => {
      if (realoption.允许搜索) {
        this.转发JSON请求(req, res);
      }
    });
    //允许搜索时,能够列出所有文档
    app.post("/api/filetree/listDocsByPath", (req, res) => {
      if (realoption.允许搜索) {
        this.转发JSON请求(req, res, true);
        console.log(req.body, 1);
      }
    });
    //允许搜索时,能够搜索所有文档,这里需要加上鉴权
    app.post("/api/search/fullTextSearchBlock", (req, res) => {
      if (realoption.允许搜索 && !realoption.有限分享) {
        console.log(req.body);
        this.转发JSON请求(req, res, true);
      }
    });
    //允许搜索时,能够嵌入所有块,这里需要加入鉴权
    app.post("/api/search/searchEmbedBlock", (req, res) => {
      if (realoption.允许搜索 && !realoption.有限分享) {
        console.log(req.body);
        this.转发JSON请求(req, res, true);
      }
    });
    //暴露api时,能够访问大部分api
    app.post("/api/*", (req, res) => {
      if (realoption.暴露api) {
        console.log(req);
        this.转发JSON请求(req, res);
      } else {
        res.sendStatus(404);
      }
    });
    //emojis文件夹默认能够访问
    app.use("/emojis", express1.static(`${workspaceDir}/conf/appearance/emojis`));
    //只有暴露挂件选项开启时,能够访问挂件
    if (realoption.暴露挂件){
      app.use("/widgets", express1.static(`${workspaceDir}/data/widgets/`));
    }
    //静态路径伺服块id
    app.get("/block/:blockid", (req, res) => this.返回块内容(req, res));
    app.get("/block/", (req, res) => this.返回块内容(req, res));
    app.get("/", (req, res) => this.返回块内容(req, res));
    //允许客户端刷新缓存内容
    app.post("/api/updatecache", async (req, res) => {
      let data = req.postbody.data;
      let id = data.id;
      this.更新缓存(id, content, workspaceDir);
      res.send({ id: data.id });
    });
    //为发布端提供插件支持
    console.log(naive.插件文件夹url)
    app.use(
      "/plugins",
      express1.static(`${workspaceDir}/data/${naive.插件文件夹url}`)
    );
    //stage文件夹使用副本的方式访问
    app.use("/stage", express1.static(`${workspaceDir}/conf/appearance/themes/naive/script/publish/stage/`));
    naive.publishServer = publishServer;

    for (let 插件名 in naive.serverEndPluginConfig) {
      try {
        if (naive.serverEndPluginConfig[插件名]) {
          await naive.加载插件(插件名, "server");
          await naive.加载插件(插件名, "publish");
          let 插件 = naive.plugins[插件名];
          if (插件 && 插件.environment["server"]) {
            let router = 插件.router || `/${插件名}`;

            let methods = 插件.methods;
            methods.forEach((method) => {
              if (method == "use") {
                if (插件.use) {
                  let func = 插件.use.bind(插件);
                  app.use(router, func);
                  console.log("publish use", router, func, "from", 插件名);
                }
              } else if (插件[method]) {
                let func = 插件[method].bind(插件);
                app[method](router, (req, res) => func(req, res));
                console.log("publish use", router, func, "from", 插件名);
              }
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    console.log(app);
    return publishServer;
  },

  解析路径: async function (path, realoption) {
    let pathArray = path.replace(".sy", "").split("/");
    pathArray = pathArray.slice(1, pathArray.length);
    let obj = {};
    for (let i = 0; i < pathArray.length; i++) {
      let element = pathArray[i];
      obj[element] = {};
      let attrs = await 思源api.以sql向思源请求块数据(
        `${realoption.思源伺服地址}:${realoption.思源伺服端口}`,
        "",
        `select * from attributes where root_id = '${element}'`
      );
      attrs.forEach((attr) =>
        attr ? (obj[element][attr.name] = attr.value) : null
      );
    }
    return obj;
  },
  更新缓存: function (id, content, workspaceDir) {
    const fs = require("fs");

    fs.writeFile(
      `${workspaceDir}/conf/appearance/themes/naive/cache/${id}.html`,
      content,
      function (err) {
        if (err) {
          throw err;
        }
        console.log("uncached");
      }
    );
  },
  返回块内容: async function (req, res) {
    let realblockid = "",
      realoption = this.realoption;

    if (req.params && req.params.blockid) {
      realblockid = req.params.blockid;
    } else if (req.query) {
      realblockid =
        req.query.id || req.query.blockid || realoption.首页.思源文档id;
    } else {
      console.log("渲染首页");
      this.渲染器.渲染首页().then((content1) => res.end(content1));
      return;
    }

    let content = "";
    let 块信息数组 = await 思源api.以sql向思源请求块数据(
      `${realoption.思源伺服地址}:${realoption.思源伺服端口}`,

      "",
      `select root_id , path  from blocks where id = '${realblockid}'`
    );
    console.log(块信息数组, "bbb");
    if (块信息数组 && 块信息数组[0]) {
      let realdocid = 块信息数组[0].root_id;
      console.log(realoption.单块分享);
      if (realoption.单块分享) {
        realdocid = realblockid;
      }
      let flag = await this.判定id权限(realdocid);
      console.log(realoption, "kkk");
      if (!realoption.有限分享) {
        flag = true;
      }
      if (flag) {
        if (realoption.即时分享) {
          content = await this.渲染器.渲染块id(realdocid);
          console.log(content, 1);
          res.end(content);
          return;
        }
        try {
          content = await fs.promises.readFile(
            `${workspaceDir}/conf/appearance/themes/naive/cache/${realdocid}.html`,
            "utf-8"
          );
          console.log(content, 2);
        } catch (e) {
          console.log(e);

          content = await this.渲染器.渲染块id(realdocid);
          this.更新缓存(realdocid, content, workspaceDir);
          console.log(content, 3);
        }
        console.log(content, 4);

        res.end(content);
      } else {
        res.end(
          this.渲染器.渲染模板(
            this.空页面 ||
              realoption.空页面内容 ||
              "<div>块不存在或未分享</div>"
          )
        );
      }
    } else {
      res.end(
        this.渲染器.渲染模板(
          this.空页面 || realoption.空页面内容 || `<div>块不存在</div>`
        )
      );
    }
  },
  转发请求: function (req, res) {
    const http = require("http");
    var { connection, host, ...originHeaders } = req.headers;
    // 构造请求报文
    console.log(req.url, req.body);
    var options = {
      method: req.method,
      hostname: this.realoption.思源伺服地址,
      port: this.realoption.思源伺服端口,
      path: req.url,
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
  async 转发JSON请求(req, res) {
    console.log(req.url, req.body);
    if (req.url.indexOf("account") >= 0) {
      res.end("不可访问账户api");
      return;
    }
    if (req.url.indexOf("setting") >= 0) {
      res.end("不可访问设置api");
      return;
    }
    if (req.url.indexOf("setting") >= 0) {
      res.end("不可访问设置api");
      return;
    }
    if (req.url.indexOf("sync") >= 0) {
      res.end("不可访问同步api");
      return;
    }
    if (req.url.indexOf("backup") >= 0) {
      res.end("不可访问备份api");
      return;
    }
    var { connection, host, ...originHeaders } = req.headers;
    // 构造请求报文
    //    console.log(req.url, req.body);
    resData = {};
    let syres = {};
    apitoken = "";
    let url =
      "http://" +
      this.realoption.思源伺服地址 +
      ":" +
      this.realoption.思源伺服端口 +
      req.url;
    syres = await this.请求数据(url, apitoken, req.body);
    res.end(JSON.stringify(syres));
  },
  async 判定数据权限(请求url, 请求数据, 思源响应数据) {
    if (this.realoption.暴露api) {
      return true;
    } else if (
      this.realoption.允许搜索 &&
      请求url == "/api/search/fullTextSearchBlock"
    ) {
      if (this.realoption.有限分享) {
        let data = 思源响应数据;
        if (data && data[0]) {
          for (let i in data) {
            let el = data[i];
            let id = el.id;
            let flag = await this.判定id权限(id);
            if (!flag) {
              el = null;
            }
          }
        }
        return true;
      }
    } else if (
      this.realoption.允许搜索 &&
      请求url == "/api/search/searchEmbedBlock"
    ) {
      if (this.realoption.有限分享) {
        let data = 思源响应数据.blocks;
        if (data && data[0]) {
          for (let i in data) {
            let el = data[i];
            let id = el.id;
            let flag = await this.判定id权限(id);
            if (!flag) {
              el = null;
            }
          }
        }
        return true;
      }
    } else if (
      this.realoption.允许搜索 &&
      请求url == "/api/search/listDocsByPath"
    ) {
      if (this.realoption.有限分享) {
        let data = 思源响应数据.files;
        if (data && data[0]) {
          for (let i in data) {
            let el = data[i];
            let id = el.id;
            let flag = await this.判定id权限(id);
            if (!flag) {
              el = null;
            }
          }
        }
        return true;
      }
    } else return false;
  },
  async 判定id权限(块id) {
    let flag = false;

    let 块信息数组 = await 思源api.以sql向思源请求块数据(
      `${this.realoption.思源伺服地址}:${this.realoption.思源伺服端口}`,

      "",
      `select root_id , path  from blocks where id = '${块id}'`
    );
    if (块信息数组 && 块信息数组[0]) {
      let 路径数据 = await this.解析路径(块信息数组[0].path, this.realoption);
      for (doc in 路径数据) {
        console.log(路径数据[doc], "ddd");
        路径数据[doc]["custom-publish"] ? (flag = true) : null;
      }
    }
    return flag;
  },
  请求数据: async function (url, apitoken, data) {
    let resData = null;
    let str = JSON.stringify(data);
    try {
      await fetch(url, {
        body: str,
        method: "POST",
        headers: {
          //          'Content-Type': 'text/plain;charset=UTF-8',

          Authorization: "Token " + apitoken,
        },
      }).then(function (response) {
        resData = response.json();
      });
      return resData;
    } catch (e) {
      console.log(e);
    }
  },
  终止服务: async function () {
    console.log(global.publishserver);
    await global.publishserver.close();
    await global.publishserver.listen(null);
    global.publishserver = null;
    this.渲染器 = null;
    console.log("服务终止");
  },
};
