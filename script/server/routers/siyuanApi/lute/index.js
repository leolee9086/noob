const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/lute/spinBlockDOM", auth, apiProxy) // 未测试
router.post("/lute/html2BlockDOM", auth, apiProxy)
router.post("/lute/copyStdMarkdown", auth, apiProxy)
module.exports=router