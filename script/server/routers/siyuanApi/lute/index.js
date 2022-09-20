const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/lute/spinBlockDOM", atuh(), apiProxy) // 未测试
router.post("/lute/html2BlockDOM", atuh(), apiProxy)
router.post("/lute/copyStdMarkdown", atuh(), apiProxy)
module.exports=router