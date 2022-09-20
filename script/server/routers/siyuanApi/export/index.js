const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/batchExportMd", atuh(), apiProxy)
router.post("/exportMd", atuh(), apiProxy)
router.post("/exportSY", atuh(), apiProxy)
router.post("/exportNotebookSY", atuh(), apiProxy)
router.post("/exportMdContent", atuh(), apiProxy)
router.post("/exportHTML", atuh(), apiProxy)
router.post("/exportMdHTML", atuh(), apiProxy)
router.post("/exportDocx", atuh(), apiProxy)
router.post("/addPDFOutline", atuh(), apiProxy)
router.post("/preview", atuh(), apiProxy)
router.post("/exportData", atuh(), apiProxy)
router.post("/exportDataInFolder", atuh(), apiProxy)
module.exports=router