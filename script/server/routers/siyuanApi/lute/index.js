const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/spinBlockDOM", auth(), apiProxy) // 未测试
naive.serverUtil.discribeApi('/api/lute/spinBlockDOM', {
    名称: '自旋blockDOM',
    功能: '对blockDOM进行一次自旋',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'lute'
})

router.post("/html2BlockDOM", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/lute/html2BlockDOM', {
    名称: '转换html为blockDOM',
    功能: '将输入的blockDOM转换为blockDOM',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'lute'
})
router.post("/copyStdMarkdown", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/lute/copyStdMarkdown', {
    名称: '复制标准markdown',
    功能: '复制标准markdown内容',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'lute'
})
module.exports=router