const { jsEncrypt, rsaPublicKey, rsaPrivateKey } = require("../keys/index.js");
const { models, checkAdmin, sequelize } = require("../models/index");
const fs = naive.serverUtil.fs;
const formiable = require("express-formidable");
const path = require("path");
let realoption = window.naive.publishOption;
module.exports = function addNaiveApi(app) {
  app.use("/plugin/config",(req,res)=>{
    let {name} = req.query
    let url
    if(name&&name+''!=="undefined"){
      console.log(1)
      url = `${naive.pathConstructor.pluginsURL()}/${name}/index.vue`
    }
    else{
      console.log(2)
      url = `${naive.pathConstructor.pluginsURL()}/pluginConfig/index.vue`

    }
    let html = `<html>
    <body>
      <div id="app"></div>
      <script src="https://unpkg.com/vue@next"></script>
      <script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js"></script>
      <script>
    
        const options = {
          moduleCache: {
            vue: Vue
          },
          async getFile(url) {
            
            const res = await fetch(url);
            if ( !res.ok )
              throw Object.assign(new Error(res.statusText + ' ' + url), { res });
            return {
              getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
            }
          },
          addStyle(textContent) {
    
            const style = Object.assign(document.createElement('style'), { textContent });
            const ref = document.head.getElementsByTagName('style')[0] || null;
            document.head.insertBefore(style, ref);
          },
        }
    
        const { loadModule } = window['vue3-sfc-loader'];
    
        const app = Vue.createApp({
          components: {
            'configer': Vue.defineAsyncComponent( () => loadModule('${url}', options) )
          },
          template: '<configer></configer>'
        });
    
        app.mount('#app');
    
      </script>
    </body>
    </html>
    `
    res.end(html)
  })
  app.use("/naiveApi/getPluginStatus", (req, res) => {
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(naive.publishOption.提供插件服务){
      res.json(
        {msg:0,
          data:JSON.parse(naive.pluginStatus)
        }
        )
    }
    else{
      res.json({
        msg:1,
        data:null,
        error:"抱歉,站点拥有者未开放插件分享服务"
      })
    }
  });
  app.use("/naiveApi/getPlugin",async(req,res)=>{
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body&&naive.publishOption.提供插件服务){
      let {name} = req.body
      await naive.compressing.zip.compressDir(naive.pathConstructor.pluginsPath()+`\\${name}`,naive.pathConstructor.downloadCachePath()+`\\${name}.zip`)
      res.sendFile(naive.pathConstructor.downloadCachePath()+`\\${name}.zip`)
    }
    else{
      res.json({
        msg:1,
        data:null,
        error:"抱歉,站点拥有者未开放插件分享服务"
      })
    }
  })
  app.post("/naiveApi/getPublishOption", (req, res) => {
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify(realoption));
  });
  app.post("/naiveApi/system/userRegist", async (req, res) => {
    if (req.body) {
      let auth = req.body.auth;
      let string = jsEncrypt.decrypt(auth);
      let json = JSON.parse(string);
      let checkedUser = await models.user.findAll({
        where: {
          name: json.user,
        },
      });
      console.log(checkedUser);
      if (checkedUser && checkedUser[0]) {
        res.json({
          code: 1,
          msg: "存在重复的用户名",
        });
        return;
      } else if (json.password !== json.ensurePassword) {
        res.json({
          code: 2,
          msg: "两次输入密码不一致",
        });
        return;
      } else {
        if (json.password.length <= 8) {
          res.json({
            code: 2,
            msg: "密码长度过短,请使用大于8位的密码",
          });
          return;
        }
        if (json.password.length >= 16) {
          res.json({
            code: 2,
            msg: "密码长度过长,请使用不大于16位的密码",
          });
          return;
        }
        let reg1 = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        let reg2 = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if (!reg1.test(json.password) && !reg2.test(json.password)) {
            res.json({
                code: 2,
                msg: "密码至少应包含一位特殊字符",
              });
              return;
        }
        
        if (naive.dbNoUser) {
          if(json.authToken!==window.siyuan.config.accessAuthCode){
            res.json(
              {
                code:3,
                msg:"抱歉,访问鉴权码错误"
              }
            )
            return
          }

          await models.user.create({
            id: Lute.NewNodeID(),
            name: json.user,
            password: json.password,
            user_group: "admin",
          });
          req.session.statues="Authed"
          req.session.user=json.user
          req.session.user_group='admin'
          req.session.failed=0
  
        }
  
        await models.user.create({
          id: Lute.NewNodeID(),
          name: json.user,
          password: json.password,
        });
        req.session.statues="Authed"
        req.session.user=json.user
        req.session.user_group='visitor'
        req.session.failed=0

        res.json({
          code: 3,
          token: jsEncrypt.encrypt(
            JSON.stringify({
              name: checkedUser.name,
              group: "visitor",
            })
          ),
        });
      }
    }
  });
  app.post("/naiveApi/system/stageAuth", async (req, res) => {
    console.log(req);
    if(req.session&&req.session.failed&&req.session.nextAllowedTry){
        let date= new Date()
        req.session.nextAllowedTry<=date.getMilliseconds()
        res.json({
            code:1,
            msg:"失败次数过多,请稍候重新登录"
        }
        )
        return
    }
    if(!req.body){
        res.json({
            code:1,
            msg:"请求错误,请重新尝试"

        })
    }
    if (req.body) {
        
      let auth = req.body.auth;
      let string = jsEncrypt.decrypt(auth);
      let json = JSON.parse(string);
      let checkedUser = await models.user.findAll({
        where: {
          name: json.user,
          password: json.password,
        },
      });
      if (checkedUser && checkedUser[0]) {
        req.session.status = "Authed";
        req.session.user=checkedUser[0].name
        req.session.user_group=checkedUser[0].user_group
        req.session.failed=0
        console.error(req.session)
        res.json({
          code: 0,
          token: jsEncrypt.encrypt(
            JSON.stringify({
              name: checkedUser.name,
              group: checkedUser.user_group,
            })
          ),
        });
        return
      }
      else{
        req.session.status = "";
        req.session.user=''
        req.session.user_group=''
        if(!req.session.failed){
            req.session.failed=1
        }
        else{
            req.session.failed+=1
        }
        if(req.session.failed>=10){
            let date= new Date()
            date.setMinutes(date.getMinutes()+10)
            req.session.nextAllowedTry=date.getMilliseconds()
            res.json(
                {
                    code:1,
                    msg:"失败次数过多,请在10分钟后尝试重新登录"
                }
            )
            return
        }
        res.json(
            {
                code:1,
                msg:'登录失败,请重新尝试'
            }
        )

      }
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
  app.use(
    "/naiveApi/file/*",
    formiable({
      encoding: "utf-8",
      uploadDir: naive.pathConstructor.uploadCachePath(),
      multiples: true,
    })
  );
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
};
