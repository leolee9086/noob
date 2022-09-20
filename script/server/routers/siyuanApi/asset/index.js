const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/uploadCloud", atuh(), apiProxy)
router.post("/insertLocalAssets", atuh(), apiProxy)
router.post("/resolveAssetPath", atuh(), apiProxy)
router.post("/upload", atuh(), apiProxy)
router.post("/setFileAnnotation", atuh(), apiProxy)
router.post("/getFileAnnotation", atuh(), apiProxy)
router.post("/getUnusedAssets", atuh(), apiProxy)
router.post("/removeUnusedAsset", atuh(), apiProxy)
router.post("/removeUnusedAssets", atuh(), apiProxy)
router.post("/getDocImageAssets", atuh(), apiProxy)
router.post("/renameAsset", atuh(), apiProxy)
module.exports=router