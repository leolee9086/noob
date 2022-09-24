const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/copy", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/extension/copy', {
    名称: '浏览器插件复制',
    功能: '供浏览器插件调用,复制文件到思源的剪贴板',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'export'
})

module.exports=router