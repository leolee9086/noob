const {jsEncrypt,rsaPublicKey,rsaPrivateKey} = require ('../keys/index.js')
const fs = naive.fs
const formiable = require("express-formidable");
let realoption = window.naive.publishOption;
console.log(realoption)
module.exports = function addNaiveApi(app) {
  app.post("/naiveApi/getPublishOption", (req, res) => {
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify(realoption));
  });
  app.post("/naiveApi/system/stageAuth", async (req, res) => {
    console.log(req);
    if (req.body) {
      let auth = req.body.auth;
      // jsEncrypt.setPrivateKey(rsaPrivateKey)
      //  let decipher = crypto.createDecipher("aes-256-cbc", rsaPrivateKey)
      console.log(rsaPrivateKey);
      console.log(auth);
      let string = jsEncrypt.decrypt(auth);
      console.log(string);
      let json = JSON.parse(string);
      console.log(json);
      let checkedUser = await user.findAll({
        where: {
          name: json.user,
          password: json.password,
        },
      });
      console.log(checkedUser);
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
        res.json({
          code: 0,
          token: jsEncrypt.encrypt(
            JSON.stringify({ name: json.user, password: json.password })
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
