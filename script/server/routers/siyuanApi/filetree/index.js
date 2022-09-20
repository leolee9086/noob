const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/searchDocs", atuh(), apiProxy)
router.post("/listDocsByPath", atuh(), apiProxy)
router.post("/getDoc", atuh(), apiProxy)
router.post("/getDocNameTemplate", atuh(), apiProxy)
router.post("/changeSort", atuh(), apiProxy)
router.post("/lockFile", atuh(), apiProxy)
router.post("/createDocWithMd", atuh(), apiProxy)
router.post("/createDailyNote", atuh(), apiProxy)
router.post("/createDoc", atuh(), apiProxy)
router.post("/renameDoc", atuh(), apiProxy)
router.post("/removeDoc", atuh(), apiProxy)
router.post("/moveDoc", atuh(), apiProxy)
router.post("/duplicateDoc", atuh(), apiProxy)
router.post("/getHPathByPath", atuh(), apiProxy)
router.post("/getHPathByID", atuh(), apiProxy)
router.post("/getFullHPathByID", atuh(), apiProxy)
router.post("/doc2Heading", atuh(), apiProxy)
router.post("/heading2Doc", atuh(), apiProxy)
router.post("/li2Doc", atuh(), apiProxy)
router.post("/refreshFiletree", atuh(), apiProxy)
router.post("/reindexTree", atuh(), apiProxy)
module.exports=router