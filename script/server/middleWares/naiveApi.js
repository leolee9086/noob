const { jsEncrypt, rsaPublicKey, rsaPrivateKey } = require("../keys/index.js");
const { models, checkAdmin, sequelize } = require("../models/index");

const fs = naive.fs;
const formiable = require("express-formidable");
const path = require("path");
let realoption = window.naive.publishOption;
console.log(realoption);
module.exports = function addNaiveApi(app) {
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
        await models.user.create({
          id: Lute.NewNodeID(),
          name: json.user,
          password: json.password,
        });
        req.session.statues="Authed"
        req.session.user=json.user
        req.session.user_group='visitor'

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
  app.get("/user/regist", async (req, res) => {
    let unAuthedPageTemplate = fs.readFileSync(
      naive.pathConstructor.templatePath() + "/login.html",
      "utf8"
    );
    res.end(unAuthedPageTemplate);
    console.log(res);
  });

  app.post("/naiveApi/system/stageAuth", async (req, res) => {
    console.log(req);
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
      if (naive.dbNoUser) {
        await user.create({
          id: Lute.NewNodeID(),
          name: json.user,
          password: json.password,
          user_group: "admin",
        });
      }
      if (checkedUser && checkedUser[0]) {
        req.session.status = "Authed";
        req.session.user=checkedUser.name
        req.session.user_group=checkedUser.user_group

        res.json({
          code: 0,
          token: jsEncrypt.encrypt(
            JSON.stringify({
              name: checkedUser.name,
              group: checkedUser.user_group,
            })
          ),
        });
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
