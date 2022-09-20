const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/lsNotebooks", auth, apiProxy)
router.post("/openNotebook", auth, apiProxy)
router.post("/closeNotebook", auth, apiProxy)
router.post("/getNotebookConf", auth, apiProxy)
router.post("/setNotebookConf", auth, apiProxy)
router.post("/createNotebook", auth, apiProxy)
router.post("/removeNotebook", auth, apiProxy)
router.post("/renameNotebook", auth, apiProxy)
router.post("/changeSortNotebook", auth, apiProxy)
router.post("/setNotebookIcon", auth, apiProxy)
module.exports=router