const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getDocOutline", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/outline/getDocOutline', {
    名称: '获取文档大纲',
    功能: '获取文档大纲',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'ouline'
})

module.exports=router