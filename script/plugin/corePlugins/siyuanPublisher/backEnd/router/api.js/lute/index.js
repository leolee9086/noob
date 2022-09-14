const express = require('express');
const router = express.Router();
const util = naive.serverUtil
const {CheckAuth} = util
router.post("/lute/spinBlockDOM", CheckAuth, spinBlockDOM) // 未测试
router.post("/lute/html2BlockDOM", CheckAuth, html2BlockDOM)
router.post("/lute/copyStdMarkdown", CheckAuth, copyStdMarkdown)
