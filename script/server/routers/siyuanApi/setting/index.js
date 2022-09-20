const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/setAccount", atuh(), apiProxy)
router.post("/setEditor", atuh(), apiProxy)
router.post("/setExport", atuh(), apiProxy)
router.post("/setFiletree", atuh(), apiProxy)
router.post("/setSearch", atuh(), apiProxy)
router.post("/setKeymap", atuh(), apiProxy)
router.post("/setAppearance", atuh(), apiProxy)
router.post("/getCloudUser", atuh(), apiProxy)
router.post("/logoutCloudUser", atuh(), apiProxy)
router.post("/login2faCloudUser", atuh(), apiProxy)
router.post("/getCustomCSS", atuh(), apiProxy)
router.post("/setCustomCSS", atuh(), apiProxy)
router.post("/setEmoji", atuh(), apiProxy)
router.post("/setSearchCaseSensitive", atuh(), apiProxy)
module.exports=router