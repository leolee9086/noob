const express = require('express');
const router = express.Router();
const util = naive.serverUtil
const {CheckAuth} = util
router.get("/bootProgress", bootProgress)
router.post("/bootProgress", bootProgress)
router.get("/version", version)
router.post("/version", version)
router.post("/currentTime", currentTime)
router.post("/uiproc", addUIProcess)
router.post("/loginAuth", LoginAuth)
router.post("/logoutAuth", LogoutAuth)
router.get("/getCaptcha", GetCaptcha)
// 需要鉴权
router.post("/getEmojiConf", CheckAuth, getEmojiConf)
router.post("/setAccessAuthCode", CheckAuth, setAccessAuthCode)
router.post("/setNetworkServe", CheckAuth, setNetworkServe)
router.post("/setUploadErrLog", CheckAuth, setUploadErrLog)
router.post("/setNetworkProxy", CheckAuth, setNetworkProxy)
router.post("/setWorkspaceDir", CheckAuth, setWorkspaceDir)
router.post("/listWorkspaceDirs", CheckAuth, listWorkspaceDirs)
router.post("/setAppearanceMode", CheckAuth, setAppearanceMode)
router.post("/getSysFonts", CheckAuth, getSysFonts)
router.post("/exit", CheckAuth, exit)
router.post("/setUILayout", CheckAuth, setUILayout)
router.post("/getConf", CheckAuth, getConf)
router.post("/checkUpdate", CheckAuth, checkUpdate)
router.post("/exportLog", CheckAuth, exportLog)
