const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/uploadCloud", auth(), apiProxy)
router.post("/insertLocalAssets", auth(), apiProxy)
router.post("/resolveAssetPath", auth(), apiProxy)
router.post("/upload", auth(), apiProxy)
router.post("/setFileAnnotation", auth(), apiProxy)
router.post("/getFileAnnotation", auth(), apiProxy)
router.post("/getUnusedAssets", auth(), apiProxy)
router.post("/removeUnusedAsset", auth(), apiProxy)
router.post("/removeUnusedAssets", auth(), apiProxy)
router.post("/getDocImageAssets", auth(), apiProxy)
router.post("/renameAsset", auth(), apiProxy)
module.exports=router