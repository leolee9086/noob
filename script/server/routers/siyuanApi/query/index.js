const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/sql", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/query/sql', {
    名称: 'sql查询',
    功能: '以sql查询结果',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'query'
})
module.exports=router