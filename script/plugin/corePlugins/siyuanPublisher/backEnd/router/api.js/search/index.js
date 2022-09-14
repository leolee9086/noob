const express = require('express');
const router = express.Router();
const util = naive.serverUtil
const {CheckAuth} = util

router.post("/searchTag", CheckAuth, searchTag)
router.post("/searchTemplate", CheckAuth, searchTemplate)
router.post("/searchWidget", CheckAuth, searchWidget)
router.post("/searchRefBlock", CheckAuth, searchRefBlock)
router.post("/searchEmbedBlock", CheckAuth, searchEmbedBlock)
router.post("/fullTextSearchBlock", CheckAuth, fullTextSearchBlock)
router.post("/searchAsset", CheckAuth, searchAsset)
router.post("/findReplace", CheckAuth, findReplace)
