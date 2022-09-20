const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.get("/bootProgress", auth(), apiProxy)
router.post("/bootProgress", auth(), apiProxy)
router.get("/version", auth(), apiProxy)
router.post("/version", auth(), apiProxy)
router.post("/currentTime", auth(), apiProxy)
router.post("/uiproc", auth(), apiProxy)
router.post("/loginAuth", auth(), apiProxy)
router.post("/logoutAuth", auth(), apiProxy)
router.get("/getCaptcha", auth(), apiProxy)
// 需要鉴权
router.post("/getEmojiConf", auth(), apiProxy)
router.post("/setAccessAuthCode", auth(), apiProxy)
router.post("/setNetworkServe", auth(), apiProxy)
router.post("/setUploadErrLog", auth(), apiProxy)
router.post("/setNetworkProxy", auth(), apiProxy)
router.post("/setWorkspaceDir", auth(), apiProxy)
router.post("/listWorkspaceDirs", auth(), apiProxy)
router.post("/setAppearanceMode", auth(), apiProxy)
router.post("/getSysFonts", auth(), apiProxy)
router.post("/exit", auth(), apiProxy)
router.post("/setUILayout", auth(), apiProxy)
router.post("/getConf", auth(), apiProxy)
router.post("/checkUpdate", auth(), apiProxy)
router.post("/exportLog", auth(), apiProxy)
module.exports=router