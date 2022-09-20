const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/lsNotebooks", atuh(), apiProxy)
router.post("/openNotebook", atuh(), apiProxy)
router.post("/closeNotebook", atuh(), apiProxy)
router.post("/getNotebookConf", atuh(), apiProxy)
router.post("/setNotebookConf", atuh(), apiProxy)
router.post("/createNotebook", atuh(), apiProxy)
router.post("/removeNotebook", atuh(), apiProxy)
router.post("/renameNotebook", atuh(), apiProxy)
router.post("/changeSortNotebook", atuh(), apiProxy)
router.post("/setNotebookIcon", atuh(), apiProxy)
module.exports=router