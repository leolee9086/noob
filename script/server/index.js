
module.exports = {
  创建服务器:async function (workspaceDir,userId) {
    if(global.publishserver){
      console.log(global.publishserver)
      await global.publishserver.close()
      global.publishserver.listen(null)
    }
    let path = require("path");
    const 渲染器类 = require("./template");
    this.渲染器= null
    const fs = require("fs");
    const cusoptionpath = `${workspaceDir}/conf/appearance/themes/naive/config/publish.json`;
    let cusoption = JSON.parse(fs.readFileSync(cusoptionpath, "utf-8"));
    console.log(cusoption);
    let realoption = this.生成默认设置(cusoption,workspaceDir,userId)

    console.log(cusoption);
    console.log(workspaceDir)
  
    console.log(realoption,15)
  
    渲染器 = new 渲染器类(realoption);
    this.渲染器= 渲染器

    const express1 = require("express");
  
    const app =  express1();
    //var bodyParser = require('body-parser')

    //app.use(bodyParser.urlencoded({ extended: false }))
    //app.use(express1.json());

   //app.use(bodyParser.json())
    const port = realoption.发布端口;
    let 空页面 =''
    console.log(realoption.空页面内容.slice(5,realoption.空页面内容.length),6)
    if(realoption.空页面内容.indexOf('path:')==0){
      console.log(realoption.空页面内容,7)
    try{
      空页面= await fs.promises.readFile(realoption.空页面内容.slice(5,realoption.空页面内容.length),
      "utf-8")
      console.log(空页面,5)
    }catch(e){console.log(e,888)}
    }
    
    app.get("/appearance/*",  (req, res) => {
      console.log(req)
      this.转发请求(req,res)
    });
    app.get("/stage/*",  (req, res) => {
      console.log(req)
      this.转发请求(req,res)
    });
   
      app.get('/assets/*',(req, res)=>{
        if(realoption.暴露附件){
        this.转发请求(req,res) }
        else{res.sendStatus(404)}
      })
   
      app.post("/api/notebook/lsNotebooks",  (req, res) => {
        if(realoption.允许搜索&&!realoption.有限分享){
        console.log(req)
        this.转发请求(req,res,true)}
      });
      app.post("/api/filetree/listDocsByPath",  (req, res) => {
        if(realoption.允许搜索&&!realoption.有限分享){
          console.log(req)
          this.转发请求(req,res,true)}      });
      app.post("/api/search/fullTextSearchBlock",  (req, res) => {
        if(realoption.允许搜索&&!realoption.有限分享){
          console.log(req)
          this.转发请求(req,res,true)}
      });
      app.post("/api/*",  (req, res) => {
        if(realoption.暴露api){
        console.log(req)
        this.转发请求(req,res)}
        else{res.sendStatus(404)}
      });
    
  
      app.get("/emojis/*",  (req, res) => {
        console.log(req)
        this.转发请求(req,res)}
      );
      app.get("/widgets/*",  (req, res) => {
        console.log(realoption)
        if(realoption.暴露挂件){
        console.log(req)
        this.转发请求(req,res)}
        else{res.sendStatus(404)}
      });
    
    app.get("/", async (req, res) => {
      let query = req.query;
      console.log(query,99);
      if (query.id || query.blockid) {
        let content = "";
        let realblcokid = query.id || query.blockid || realoption.首页.思源文档id;
        let 块信息数组 = await 以sql向思源请求块数据(
          `${realoption.思源伺服地址}:${realoption.思源伺服端口}`,

          "",
          `select root_id , path  from blocks where id = '${realblcokid}'`
        );
        console.log(块信息数组,'bbb');
        if (块信息数组 && 块信息数组[0]) {
          let realdocid = 块信息数组[0].root_id;
          console.log(realoption.单块分享)
          if(realoption.单块分享){realdocid=realblcokid}
          let 路径数据 = await this.解析路径(块信息数组[0].path,realoption);
          let flag = false;
          for (doc in 路径数据) {
            console.log(路径数据[doc],"ddd")
            路径数据[doc]["custom-publish"] ? (flag = true) : null;
          }
        //  console.log(路径数据,'ccc');
          console.log(realoption,'kkk')
          if(!realoption.有限分享){flag=true}
          if (flag) {
            if(realoption.即时分享){             
               content = await this.渲染器.渲染块id(realdocid);
               console.log(content,1)
               res.end(content);
              return
            }
            try {
              content = await fs.promises.readFile(
                `${workspaceDir}/conf/appearance/themes/naive/cache/${realdocid}.html`,
                "utf-8"
              );
              console.log(content,2)

            } catch (e) {
              console.log(e)

              content = await this.渲染器.渲染块id(realdocid);
              this.更新缓存(realdocid, content, workspaceDir);
              console.log(content,3)

            }
            console.log(content,4)

            res.end(content);
          } else {
            res.end(this.渲染器.渲染模板(空页面||realoption.空页面内容||"<div>块不存在或未分享</div>"));
          }
        } else {
          res.end(this.渲染器.渲染模板(空页面||realoption.空页面内容||`<div>块不存在</div>`));
        }
      } else {
        console.log("渲染首页")
        this.渲染器.渲染首页().then((content1) => res.end(content1));
      }
    });

   
    app.post("/api/updatecache", async (req, res) => {
      let data = req.postbody.data;
      let id = data.id;
      this.更新缓存(id, content, workspaceDir);
      res.send({ id: data.id });
    });

    global.publishserver=app.listen(port, () => {
   
      console.log(`custom app listening on port ${port}`);
    });
    console.log(global.publishserver)
    return publishserver
  },
  解析路径: async function (path,realoption) {
    let pathArray = path.replace(".sy", "").split("/");
    pathArray = pathArray.slice(1, pathArray.length);
    let obj = {};
     for  (let i=0;i<pathArray.length;i++){
      let element=pathArray[i]
      obj[element] = {};
      let attrs = await 以sql向思源请求块数据(
        `${realoption.思源伺服地址}:${realoption.思源伺服端口}`,
        "",
        `select * from attributes where root_id = '${element}'`
      );
      console.log(attrs, "aaa");
      attrs.forEach((attr) =>
        attr ? (obj[element][attr.name] = attr.value) : null
      );
    };
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
  转发请求:async function (req, res,flag) {
    const http = require("http");
    var { connection, host, ...originHeaders } = req.headers;
    // 构造请求报文
    console.log(req.url)
    var options = {
      method: req.method,
      hostname: "127.0.0.1",
      port: "6806",
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
          res.setHeader("Access-Control-Allow-Private-Network",true);
          res.end(responsebodyBuffer);
        });
      });
      // 将接收到的客户端请求数据发送到目标服务器;
      request1.write(postbodyBuffer);
      request1.end();
    });
  },
  终止服务:async function(){
    console.log(global.publishserver)
    console.log("这里的报错是特性,不要改动")

    await global.publishserver.close()
    await global.publishserver.listen(null)
    global.publishserver=null
    this.渲染器=null
    console.log("服务终止")

  },
  生成默认设置 : function(customoption,workspaceDir,userId){
    let 思源伺服端口 = 6806;
    let 思源伺服地址 = "127.0.0.1";
    let option = {
      发布地址: 思源伺服地址,
      思源伺服地址: 思源伺服地址,
      思源伺服端口: 思源伺服端口,
      基础样式: `http://${customoption.发布地址||思源伺服地址}:${customoption.发布端口||思源伺服端口}/stage/build/export/base.css`,
      发布主题: `http://${customoption.发布地址||思源伺服地址}:${customoption.发布端口||思源伺服端口}/appearance/themes/${window.siyuan.config.appearance.themeDark}/theme.css`,
      发布脚本: `path:${workspaceDir}\\conf\\appearance\\themes\\naive\\script\\naive.js`,
      高亮样式: `http://${customoption.发布地址||思源伺服地址}:${customoption.发布端口||思源伺服端口}/stage/protyle/js/highlight.js/styles/github.min.css`,
      空页面内容: `path:${workspaceDir}\\conf\\appearance\\themes\\naive\\script\\naive.html`,
      首页: {
        思源文档id: "20200812220555-lj3enxa",
      },
      有限分享: false,
      即时分享: true,
      使用图床资源: true,
      发布端口: 80,
      思源账号id: userId,
      发布图标: "",
      暴露api:false,
      暴露挂件:false,
      暴露附件:false,
      脚注内容:`path:${workspaceDir}\\conf\\appearance\\themes\\naive\\script\\footer.html`,
      单块分享:true,
      允许搜索:false,
    };
    option.workspace=workspaceDir
    for (let prop in option) {
      customoption[prop] !== ""
        ? (option[prop] = customoption[prop])
        : (option[prop] = option[prop]);
    }
    if(option.首页&&!option.首页.思源文档id){
      option.首页.思源文档id='20200812220555-lj3enxa'
    }
    option.workspace=workspaceDir
    return JSON.parse(JSON.stringify(option))
    }
};
