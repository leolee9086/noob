import {pipe} from "./pipeRender.js/index.js"
//#ifAPP
const fs  = require("fs-extra")
//#endif
export class siyuanPublisher extends naive.plugin {
  constructor() {
    super({ name: "siyuanPublisher" });
    ///#ifAPP
    this.realoption = naive.设置;
    this.模板路径 = naive.pathConstructor.templatePath();
    fs.copySync(
      `${naive.pathConstructor.naivePath()}/script/publish/defaultTemplate`,
      naive.pathConstructor.templatePath()
    );
    let 模板列表 = fs.readdirSync(this.模板路径);
    this.pipe =pipe
    this.初始化后端 =(this.require("./backend/index.js")).bind(this)
    this.expressApp.use("/publish", (req, res) => this.渲染(req, res));
    this.初始化后端()
    ///#endif
  }
  async 渲染(req, res) {
    const path = require("path");
    let 模板路径 = path.join(
      this.initDir(`/templates/`),
      req.url.split("/")[1] + ".js"
    );
    let e = fs.existsSync(模板路径);
    if (e) {
      let use = (await import(模板路径)).use;
      use(req, res);
    } else {
      res.status(404);
      res.end("404");
    }
    this.注册发布用菜单();
  }
  
  async 管线渲染(req, res) {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    let 渲染管线 = this.生成渲染管线();
    let 渲染结果 = new DOMParser().parseFromString("", "text/html");
    for await (let 渲染函数 of 渲染管线) {
      try {
        if (渲染结果.完成) {
          return 渲染结果;
        }
        if(渲染函数 instanceof Function){
        渲染结果 = (await 渲染函数(req, res, 渲染结果)) || "";
        }
        let 文字渲染结果 = "";
        try {
          文字渲染结果 = 渲染结果.querySelector("body").innerHTML;
        } catch (e) {
          文字渲染结果 = 渲染结果;
          let tempdoc = new DOMParser().parseFromString(
            文字渲染结果,
            "text/html"
          );
          渲染结果 = tempdoc;
          console.error(e);
        }
      } catch (e) {
        console.error(e);
        continue;
      }
    }
    if (
      渲染结果.reqHeaders &&
      渲染结果.reqHeaders["user-agent"] &&
      渲染结果.reqHeaders["user-agent"].match(
        /(iphone|ipod|android|ios|ipad|mobile)/i
      )
    ) {
      渲染结果.querySelector("#panelLeft")
        ? 渲染结果.querySelector("#panelLeft").classList.add("fn__none")
        : null;
      渲染结果.querySelector("#panelRight")
        ? 渲染结果.querySelector("#panelRight").classList.add("fn__none")
        : null;
      渲染结果.querySelector(".publishNavi .toolbarLeft")
        ? 渲染结果
            .querySelector(".publishNavi .toolbarLeft")
            .classList.add("fn__none")
        : null;
      渲染结果.querySelector(".publishNavi .toolbarRight")
        ? 渲染结果
            .querySelector(".publishNavi .toolbarRight")
            .classList.add("fn__none")
        : null;
      let fontbase = 36;
      渲染结果.querySelector("#editorFontSize").innerHTML = `
       .protyle-wysiwyg, .protyle-title {font-size:${fontbase}px !important}
.b3-typography code:not(.hljs), .protyle-wysiwyg code:not(.hljs) { font-variant-ligatures: normal }
.li > .protyle-action {height:${fontbase * 2}px;line-height: ${fontbase * 2}px}
.protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h1, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h2, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h3, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h4, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h5, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h6 {
  line-height:${fontbase * 2}px;
}
.protyle-wysiwyg [data-node-id].li > .protyle-action:after {height: ${fontbase}px;width: ${fontbase}px;margin:-${
        fontbase / 2
      }px 0 0 -${fontbase / 2}px}
.protyle-wysiwyg [data-node-id].li > .protyle-action svg {height: ${
        (fontbase * 2) / 3
      }px}
.protyle-wysiwyg [data-node-id] [spellcheck="false"] {min-height:${
        (fontbase * 34) / 21
      }px}
.protyle-wysiwyg .li {min-height:${(fontbase * 42) / 21}px}
.protyle-gutters button svg {height:${(fontbase * 34) / 21}px}
.protyle-wysiwyg img.emoji, .b3-typography img.emoji {width:${
        (fontbase * 26) / 21
      }px}
.protyle-wysiwyg .h1 img.emoji, .b3-typography h1 img.emoji {width:${
        (fontbase * 45) / 21
      }px}
.protyle-wysiwyg .h2 img.emoji, .b3-typography h2 img.emoji {width:${
        (fontbase * 40) / 21
      }px}
.protyle-wysiwyg .h3 img.emoji, .b3-typography h3 img.emoji {width:${
        (fontbase * 36) / 21
      }px}
.protyle-wysiwyg .h4 img.emoji, .b3-typography h4 img.emoji {width:${
        (fontbase * 32) / 21
      }px}
.protyle-wysiwyg .h5 img.emoji, .b3-typography h5 img.emoji {width:${
        (fontbase * 29) / 21
      }px}
.protyle-wysiwyg .h6 img.emoji, .b3-typography h6 img.emoji {width:${
        (fontbase * 26) / 21
      }px}
.b3-typography, .protyle-wysiwyg, .protyle-title, .protyle-title__input{font-family: "文泉驿等宽正黑", "quote", "Helvetica Neue", "Luxi Sans", "DejaVu Sans", "Hiragino Sans GB", "Microsoft Yahei", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", "EmojiSymbols" !important;}
.sb[data-sb-layout="col"]{
  flex-direction:column !important;
  width:100% !important
}
`;

      渲染结果.querySelector(".publishNavi").style.marginTop = "10px";
      渲染结果.querySelector(".publishNavi").style.height = `${
        (fontbase * 3) / 2
      }px`;
    }
    let base = 渲染结果.querySelector("base");
    if (base) {
      base.setAttribute("href", req.protocol + "://" + naive.设置.发布地址);
    } else {
      base = 渲染结果.createElement("base");
      base.setAttribute("href", req.protocol + "://" + naive.设置.发布地址);

      document.head.appendChild(base);
    }

    渲染结果 = `<!DOCTYPE html>
    <html>          
    ${渲染结果.querySelector("html").innerHTML}
    </html>
    `;
    res.end(渲染结果);
  }
  async 渲染函数(req, res, 渲染结果) {
    return 渲染结果;
  }
  生成渲染管线() {
    naive.renders = {};
    let 渲染管线 = [];
    let 主要渲染管线 = [];
    let 次要渲染管线 = [];
    for (let 插件名 in naive.corePlugins) {
      主要渲染管线 = this.加载渲染管线(插件名, naive.corePlugins, 主要渲染管线);
    }
    for (let 插件名 in naive.plugins) {
      次要渲染管线 = this.加载渲染管线(插件名, naive.plugins, 次要渲染管线);
    }
    渲染管线 = 主要渲染管线.concat(次要渲染管线);
    渲染管线 = this.去重(渲染管线, "provider");
    return 渲染管线;
  }
  去重(数组, 属性名) {
    let res = {};
    return 数组.filter((数组项目) => {
      return (
        !(res[数组项目[属性名]] == 数组项目["name"]) &&
        (res[数组项目[属性名]] = 数组项目["name"])
      );
    });
  }
  加载渲染管线(插件名, 插件列表, 渲染管线) {
    if (插件列表[插件名]) {
      let 渲染函数 =
        插件列表[插件名].publishRender || 插件列表[插件名]["渲染函数"];
      if (!渲染函数 && !插件列表[插件名].pipe) {
        return 渲染管线;
      } else if (插件列表[插件名]["dependencies"] && 渲染函数) {
        for (let 依赖插件名 of 插件列表[插件名]["dependencies"]) {
          if (!naive.renders[依赖插件名]) {
            this.加载渲染管线(依赖插件名, 插件列表, 渲染管线);
          }
        }
      }
      if (渲染函数) {
        渲染管线.push(渲染函数.bind(插件列表[插件名]));
        渲染管线[渲染管线.length - 1].provider = 插件名;
      }
      let 插件管线 = 插件列表[插件名].pipe;
      if (插件管线) {
        插件管线.forEach((管线渲染函数, index) => {
          try{
          插件管线[index] = 管线渲染函数.bind(插件列表[插件名]);
          插件管线[index].provider = 插件名;
          }
          catch(e){
            插件管线[index]="error:"+e
            console.error(`插件${插件名}的渲染管线中第${index}个渲染函数存在错误`)
          }
        });
        渲染管线 = 渲染管线.concat(插件管线);
      }
    }
    naive.renders[插件名] = true;
    return 渲染管线;
  }
  async 转发JSON请求(req, res, unAuth) {
    if (!unAuth && !req.session) {
      res.statue(403);
      res.end("请首先登录或提供token");
    }
    if(req.session && req.session.user_group === "admin"&&(!((req.rawHeaders.indexOf("application/json;charset=UTF-8"))>=0))){
      await this.转发请求(req,res)
      return
    }
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
    let resData = {};
    let syres = {};
    let apitoken = "";
    let url =
      "http://" +
      this.realoption.思源伺服地址 +
      ":" +
      this.realoption.思源伺服端口 +
      req.url;
    syres = await this.请求数据(url, apitoken, req.body);
    if (req.session && req.session.user_group !== "admin") {
      if (req.session && !req.session.status) {
        if (syres.data && syres.data.files && syres.data.files[0]) {
          syres.data.files = await this.批处理判定路径权限(syres.data.files);
        
          syres.data.files = syres.data.files.filter((file) => {
            return file;
          });
        }
        if (syres.data && syres.data.blocks && syres.data.blocks[0]) {
          syres.data.blocks = await this.批处理判定路径权限(syres.data.blocks);
          syres.data.blocks = syres.data.blocks.filter((file) => {
            return file;
          });
        }
        if (syres.data && syres.data.backlinks && syres.data.backmentions) {
          syres.data.backlinks = await this.批处理判定id权限(
            syres.data.backlinks
          );
          syres.data.backmentions = await this.批处理判定id权限(
            syres.data.backmentions
          );
        }
        if (syres.data && syres.data.nodes && syres.data.links) {
          syres.data.nodes = await this.批处理判定路径权限(syres.data.nodes);
        
          for (let i = 0, len = syres.data.links.length; i < len; i++) {
            let link = syres.data.links[i];
            let fromid = link.from;
            let toid = link.to;
            let labels = await this.核心api.sql({
              stmt: `select  * from blocks  where id in (select block_id from refs where def_block_id='${fromid}') and id in  (select block_id from refs where def_block_id='${toid}')`,
            });
            if (labels && labels[0]) {
              syres.data.links[i]["label"] = labels[0].content;
            }
          }
        }
      }
      syres = JSON.parse(JSON.stringify(syres));
    }
    res.end(JSON.stringify(syres));
  }
  async 请求数据(url, apitoken, data) {
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
  }

  转发请求(req, res) {
    const http = require("http");
    var { connection, host, ...originHeaders } = req.headers;
    // 构造请求报文
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
          let responsebodyBuffer = Buffer.concat(responsebody);
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
  }
  更新缓存(id, content, workspaceDir) {
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
  }
}
export const dependencies = ["template", "siyuanRouter", "commonMenu"];
export const environments = ["APP",'BROWSER'];
