const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/getBlockInfo", atuh(), apiProxy)
router.post("/getBlockDOM", atuh(), apiProxy)
router.post("/getBlockKramdown", atuh(), apiProxy)
router.post("/getBlockBreadcrumb", atuh(), apiProxy)
router.post("/getRefIDs", atuh(), apiProxy)
router.post("/getRefIDsByFileAnnotationID", atuh(), apiProxy)
router.post("/getBlockDefIDsByRefText", atuh(), apiProxy)
router.post("/getRefText", atuh(), apiProxy)
router.post("/getBlockWordCount", atuh(), apiProxy)
router.post("/getBlocksWordCount", atuh(), apiProxy)
router.post("/getContentWordCount", atuh(), apiProxy)
router.post("/getRecentUpdatedBlocks", atuh(), apiProxy)
router.post("/getDocInfo", atuh(), apiProxy)
router.post("/checkBlockExist", atuh(), apiProxy)
router.post("/checkBlockFold", atuh(), apiProxy)
router.post("/insertBlock", atuh(), apiProxy)
router.post("/prependBlock", atuh(), apiProxy)
router.post("/appendBlock", atuh(), apiProxy)
router.post("/updateBlock", atuh(), apiProxy)
router.post("/deleteBlock", atuh(), apiProxy)
router.post("/setBlockReminder", atuh(), apiProxy)
module.exports=router