const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/setAccount", auth, apiProxy)
router.post("/setEditor", auth, apiProxy)
router.post("/setExport", auth, apiProxy)
router.post("/setFiletree", auth, apiProxy)
router.post("/setSearch", auth, apiProxy)
router.post("/setKeymap", auth, apiProxy)
router.post("/setAppearance", auth, apiProxy)
router.post("/getCloudUser", auth, apiProxy)
router.post("/logoutCloudUser", auth, apiProxy)
router.post("/login2faCloudUser", auth, apiProxy)
router.post("/getCustomCSS", auth, apiProxy)
router.post("/setCustomCSS", auth, apiProxy)
router.post("/setEmoji", auth, apiProxy)
router.post("/setSearchCaseSensitive", auth, apiProxy)
module.exports=router