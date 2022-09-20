const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/searchTag", atuh(), apiProxy)
router.post("/searchTemplate", atuh(), apiProxy)
router.post("/searchWidget", atuh(), apiProxy)
router.post("/searchRefBlock", atuh(), apiProxy)
router.post("/searchEmbedBlock", atuh(), apiProxy)
router.post("/fullTextSearchBlock", atuh(), apiProxy)
router.post("/searchAsset", atuh(), apiProxy)
router.post("/findReplace", atuh(), apiProxy)
module.exports=router