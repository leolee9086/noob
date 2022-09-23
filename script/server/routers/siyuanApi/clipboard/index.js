const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/readFilePaths", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/clipboard/readFilePaths', {
    名称: '读取系统剪贴板内容',
    功能: '删除某个书签',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'clipboard'
})
module.exports=router