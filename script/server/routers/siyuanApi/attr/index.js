const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getBookmarkLabels", auth(), apiProxy)
router.post("/resetBlockAttrs", auth(), apiProxy)
router.post("/setBlockAttrs", auth(), apiProxy)
router.post("/getBlockAttrs", auth(), apiProxy)
module.exports=router