const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.get("/bootProgress", atuh(), apiProxy)
router.post("/bootProgress", atuh(), apiProxy)
router.get("/version", atuh(), apiProxy)
router.post("/version", atuh(), apiProxy)
router.post("/currentTime", atuh(), apiProxy)
router.post("/uiproc", atuh(), apiProxy)
router.post("/loginAuth", atuh(), apiProxy)
router.post("/logoutAuth", atuh(), apiProxy)
router.get("/getCaptcha", atuh(), apiProxy)
// 需要鉴权
router.post("/getEmojiConf", atuh(), apiProxy)
router.post("/setAccessAuthCode", atuh(), apiProxy)
router.post("/setNetworkServe", atuh(), apiProxy)
router.post("/setUploadErrLog", atuh(), apiProxy)
router.post("/setNetworkProxy", atuh(), apiProxy)
router.post("/setWorkspaceDir", atuh(), apiProxy)
router.post("/listWorkspaceDirs", atuh(), apiProxy)
router.post("/setAppearanceMode", atuh(), apiProxy)
router.post("/getSysFonts", atuh(), apiProxy)
router.post("/exit", atuh(), apiProxy)
router.post("/setUILayout", atuh(), apiProxy)
router.post("/getConf", atuh(), apiProxy)
router.post("/checkUpdate", atuh(), apiProxy)
router.post("/exportLog", atuh(), apiProxy)
module.exports=router