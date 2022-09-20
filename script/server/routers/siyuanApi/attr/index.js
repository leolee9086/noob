const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getBookmarkLabels", atuh(), apiProxy)
router.post("/resetBlockAttrs", atuh(), apiProxy)
router.post("/setBlockAttrs", atuh(), apiProxy)
router.post("/getBlockAttrs", atuh(), apiProxy)
module.exports=router