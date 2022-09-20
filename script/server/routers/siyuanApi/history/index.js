const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/getNotebookHistory", atuh(), apiProxy)
router.post("/rollbackNotebookHistory", atuh(), apiProxy)
router.post("/rollbackAssetsHistory", atuh(), apiProxy)
router.post("/getDocHistoryContent", atuh(), apiProxy)
router.post("/rollbackDocHistory", atuh(), apiProxy)
router.post("/clearWorkspaceHistory", atuh(), apiProxy)
router.post("/reindexHistory", atuh(), apiProxy)
router.post("/searchHistory", atuh(), apiProxy)
module.exports=router