const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/searchDocs", auth, apiProxy)
router.post("/listDocsByPath", auth, apiProxy)
router.post("/getDoc", auth, apiProxy)
router.post("/getDocNameTemplate", auth, apiProxy)
router.post("/changeSort", auth, apiProxy)
router.post("/lockFile", auth, apiProxy)
router.post("/createDocWithMd", auth, apiProxy)
router.post("/createDailyNote", auth, apiProxy)
router.post("/createDoc", auth, apiProxy)
router.post("/renameDoc", auth, apiProxy)
router.post("/removeDoc", auth, apiProxy)
router.post("/moveDoc", auth, apiProxy)
router.post("/duplicateDoc", auth, apiProxy)
router.post("/getHPathByPath", auth, apiProxy)
router.post("/getHPathByID", auth, apiProxy)
router.post("/getFullHPathByID", auth, apiProxy)
router.post("/doc2Heading", auth, apiProxy)
router.post("/heading2Doc", auth, apiProxy)
router.post("/li2Doc", auth, apiProxy)
router.post("/refreshFiletree", auth, apiProxy)
router.post("/reindexTree", auth, apiProxy)
module.exports=router