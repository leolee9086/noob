const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/getNotebookHistory", auth(), apiProxy)
router.post("/rollbackNotebookHistory", auth(), apiProxy)
router.post("/rollbackAssetsHistory", auth(), apiProxy)
router.post("/getDocHistoryContent", auth(), apiProxy)
router.post("/rollbackDocHistory", auth(), apiProxy)
router.post("/clearWorkspaceHistory", auth(), apiProxy)
router.post("/reindexHistory", auth(), apiProxy)
router.post("/searchHistory", auth(), apiProxy)
module.exports=router