const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/batchExportMd", auth(), apiProxy)
router.post("/exportMd", auth(), apiProxy)
router.post("/exportSY", auth(), apiProxy)
router.post("/exportNotebookSY", auth(), apiProxy)
router.post("/exportMdContent", auth(), apiProxy)
router.post("/exportHTML", auth(), apiProxy)
router.post("/exportMdHTML", auth(), apiProxy)
router.post("/exportDocx", auth(), apiProxy)
router.post("/addPDFOutline", auth(), apiProxy)
router.post("/preview", auth(), apiProxy)
router.post("/exportData", auth(), apiProxy)
router.post("/exportDataInFolder", auth(), apiProxy)
module.exports=router