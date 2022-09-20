const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/searchTag", auth(), apiProxy)
router.post("/searchTemplate", auth(), apiProxy)
router.post("/searchWidget", auth(), apiProxy)
router.post("/searchRefBlock", auth(), apiProxy)
router.post("/searchEmbedBlock", auth(), apiProxy)
router.post("/fullTextSearchBlock", auth(), apiProxy)
router.post("/searchAsset", auth(), apiProxy)
router.post("/findReplace", auth(), apiProxy)
module.exports=router