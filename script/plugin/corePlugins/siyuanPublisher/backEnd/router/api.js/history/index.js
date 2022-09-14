const express = require('express');
const router = express.Router();
const util = naive.serverUtil
const {CheckAuth} = util
router.post("/getNotebookHistory", CheckAuth, getNotebookHistory)
router.post("/rollbackNotebookHistory", CheckAuth, rollbackNotebookHistory)
router.post("/rollbackAssetsHistory", CheckAuth, rollbackAssetsHistory)
router.post("/getDocHistoryContent", CheckAuth, getDocHistoryContent)
router.post("/rollbackDocHistory", CheckAuth, CheckReadonly, rollbackDocHistory)
router.post("/clearWorkspaceHistory", CheckAuth, CheckReadonly, clearWorkspaceHistory)
router.post("/reindexHistory", CheckAuth, CheckReadonly, reindexHistory)
router.post("/searchHistory", CheckAuth, CheckReadonly, searchHistory)
