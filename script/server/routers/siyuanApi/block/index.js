const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/getBlockInfo", auth, apiProxy)
router.post("/getBlockDOM", auth, apiProxy)
router.post("/getBlockKramdown", auth, apiProxy)
router.post("/getBlockBreadcrumb", auth, apiProxy)
router.post("/getRefIDs", auth, apiProxy)
router.post("/getRefIDsByFileAnnotationID", auth, apiProxy)
router.post("/getBlockDefIDsByRefText", auth, apiProxy)
router.post("/getRefText", auth, apiProxy)
router.post("/getBlockWordCount", auth, apiProxy)
router.post("/getBlocksWordCount", auth, apiProxy)
router.post("/getContentWordCount", auth, apiProxy)
router.post("/getRecentUpdatedBlocks", auth, apiProxy)
router.post("/getDocInfo", auth, apiProxy)
router.post("/checkBlockExist", auth, apiProxy)
router.post("/checkBlockFold", auth, apiProxy)
router.post("/insertBlock", auth, apiProxy)
router.post("/prependBlock", auth, apiProxy)
router.post("/appendBlock", auth, apiProxy)
router.post("/updateBlock", auth, apiProxy)
router.post("/deleteBlock", auth, apiProxy)
router.post("/setBlockReminder", auth, apiProxy)
module.exports=router