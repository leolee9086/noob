module.exports = {
  创建服务器: async function (workspaceDir, userId) {
    if (global.publishserver) {
      console.log(global.publishserver);
      await global.publishserver.close();
      global.publishserver.listen(null);
    }
    const 渲染器类 = require("./template");
    const api = require("../public/siYuanApi");
    const nodered = require("node-red");
    const fs = require("fs");
    const cusoptionpath = `${workspaceDir}/conf/appearance/themes/naive/config/publish.json`;
    let cusoption = JSON.parse(fs.readFileSync(cusoptionpath, "utf-8"));
    let realoption = naive.生成默认设置(cusoption, workspaceDir, userId);
    this.渲染器 = null;
    this.realoption = realoption;
    console.log(cusoption);
    console.log(workspaceDir);
    console.log(realoption, 15);
    思源api = new api(realoption);
    渲染器 = new 渲染器类(realoption);
    this.渲染器 = 渲染器;
    const bodyParser = require("body-parser");
    //引入nodered
    const settings = {
      httpAdminRoot: "/red",
      httpNodeRoot: "/red/api",
      functionGloabalContext: {},
      userDir: `${workspaceDir}/data/assets/nodered`,
    };

    const express1 = require("express");
    const app = express1();
    let res4 = await fetch("/appearance/themes/naive/plugins/config.json");
    naive.serverEndPluginConfig = await res4.json();

    //app.use(express1.text());  //body-parser 解析json格式数据
    //  app.use(xmlparser());  //body-parser 解析json格式数据
    app.use(bodyParser.json()); //body-parser 解析json格式数据
    app.use(
      bodyParser.urlencoded({
        //此项必须在 bodyParser.json 下面,为参数编码
        extended: true,
      })
    );
    const port = realoption.发布端口;
    global.publishserver = app.listen(port, () => {
      console.log(`publish app listening on port ${port}`);
    });

    let 空页面 = "";
    console.log(
      realoption.空页面内容.slice(5, realoption.空页面内容.length),
      6
    );
    if (realoption.空页面内容.indexOf("path:") == 0) {
      console.log(realoption.空页面内容, 7);
      try {
        空页面 = await fs.promises.readFile(
          realoption.空页面内容.slice(5, realoption.空页面内容.length),
          "utf-8"
        );
        console.log(空页面, 5);
      } catch (e) {
        console.log(e, 888);
      }
    }
    console.log(app);

    for (let 插件名 in naive.serverEndPluginConfig) {
      try{
      if(naive.serverEndPluginConfig[插件名]){
        await naive.加载插件(插件名, "server");
        let 插件 = naive.plugins[插件名];
        console.log(插件.router)
        if (插件) {
          let method = 插件.method;
          method=='get'?app.get(插件.router, (req, res) => 插件.func(req, res)):null;

        }
      }
      }catch(e){
        console.log(e)
      }
    }
    app.get("/appearance/*", (req, res) => {
      console.log(req);
      this.转发请求(req, res);
    });
    app.get("/stage/*", (req, res) => {
      console.log(req);
      this.转发请求(req, res);
    });

    app.get("/assets/*", (req, res) => {
      if (realoption.暴露附件) {
        this.转发请求(req, res);
      } else {
        res.sendStatus(404);
      }
    });

    app.post("/api/notebook/lsNotebooks", (req, res) => {
      if (realoption.允许搜索 && !realoption.有限分享) {
        this.转发JSON请求(req, res);
      }
    });
    app.post("/api/filetree/listDocsByPath", (req, res) => {
      if (realoption.允许搜索 && !realoption.有限分享) {
        this.转发JSON请求(req, res, true);
        console.log(req.body, 1);
      }
    });
    app.post("/api/search/fullTextSearchBlock", (req, res) => {
      if (realoption.允许搜索 && !realoption.有限分享) {
        console.log(req.body);
        this.转发JSON请求(req, res, true);
      }
    });
    app.post("/api/*", (req, res) => {
      if (realoption.暴露api) {
        console.log(req);
        this.转发JSON请求(req, res);
      } else {
        res.sendStatus(404);
      }
    });

    app.get("/emojis/*", (req, res) => {
      console.log(req);
      this.转发请求(req, res);
    });
    app.get("/widgets/*", (req, res) => {
      console.log(realoption);
      if (realoption.暴露挂件) {
        console.log(req);
        this.转发请求(req, res);
      } else {
        res.sendStatus(404);
      }
    });
    app.get("/block/:blockid", (req, res) => this.返回块内容(req, res));
    app.get("/block/", (req, res) => this.返回块内容(req, res));

    app.get("/", (req, res) => this.返回块内容(req, res));

    app.post("/api/updatecache", async (req, res) => {
      let data = req.postbody.data;
      let id = data.id;
      this.更新缓存(id, content, workspaceDir);
      res.send({ id: data.id });
    });
    nodered.init(global.publishserver, settings);
    app.use(settings.httpAdminRoot, nodered.httpAdmin);
    app.use(settings.httpNodeRoot, nodered.httpNode);
    nodered.start();
    console.log(global.publishserver);
    naive.publishserver=publishserver
    return publishserver;
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
            空页面 || realoption.空页面内容 || "<div>块不存在或未分享</div>"
          )
        );
      }
    } else {
      res.end(
        this.渲染器.渲染模板(
          空页面 || realoption.空页面内容 || `<div>块不存在</div>`
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
    var { connection, host, ...originHeaders } = req.headers;
    // 构造请求报文
    console.log(req.url, req.body);
    resData = {};
    let syres = {};
    apitoken = "";
    let url =
      "http://" +
      this.realoption.思源伺服地址 +
      ":" +
      this.realoption.思源伺服端口 +
      req.url;
    let flag = false;
    syres = await this.请求数据(url, apitoken, req.body);
    if (syres && syres.data) {
      if (this.realoption.有限分享) {
        flag = await this.判定数据权限(req.url, req.body, syres.data);
      } else {
        flag = true;
      }
    }
    console.log(syres);
    if (flag) {
      res.end(JSON.stringify(syres));
    } else {
      res.status(404).end("check your auth");
    }
  },
  async 判定数据权限(请求url, 请求数据, 响应数据) {
    if (this.realoption.暴露api) {
      return true;
    }
    if (
      this.realoption.允许搜索 &&
      请求url == "/api/search/fullTextSearchBlock"
    ) {
      return true;
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
  生成默认设置: function (customoption, workspaceDir, userId) {
    let 思源伺服端口 = 6806;
    let 思源伺服地址 = "127.0.0.1";
    let option = {
      发布地址: 思源伺服地址,
      思源伺服地址: 思源伺服地址,
      思源伺服端口: 思源伺服端口,
      基础样式: `http://${customoption.发布地址 || 思源伺服地址}:${
        customoption.发布端口 || 思源伺服端口
      }/stage/build/export/base.css`,
      发布主题: `http://${customoption.发布地址 || 思源伺服地址}:${
        customoption.发布端口 || 思源伺服端口
      }/appearance/themes/${
        window.siyuan.config.appearance.themeDark
      }/theme.css`,
      发布脚本: `path:${workspaceDir}\\conf\\appearance\\themes\\naive\\config\\naive.js`,
      高亮样式: `http://${customoption.发布地址 || 思源伺服地址}:${
        customoption.发布端口 || 思源伺服端口
      }/stage/protyle/js/highlight.js/styles/github.min.css`,
      空页面内容: `path:${workspaceDir}\\conf\\appearance\\themes\\naive\\config\\naive.html`,
      首页: {
        思源文档id: "20200812220555-lj3enxa",
      },
      有限分享: false,
      即时分享: true,
      使用图床资源: true,
      发布端口: 80,
      思源账号id: userId,
      发布图标: "",
      暴露api: false,
      暴露挂件: false,
      暴露附件: false,
      脚注内容: `path:${workspaceDir}\\conf\\appearance\\themes\\naive\\script\\footer.html`,
      单块分享: true,
      允许搜索: false,
    };
    option.workspace = workspaceDir;
    for (let prop in option) {
      customoption[prop] !== ""
        ? (option[prop] = customoption[prop])
        : (option[prop] = option[prop]);
    }
    if (option.首页 && !option.首页.思源文档id) {
      option.首页.思源文档id = "20200812220555-lj3enxa";
    }
    option.workspace = workspaceDir;
    return JSON.parse(JSON.stringify(option));
  },
};
