const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getShorthands", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/inbox/getShorthands', {
    名称: '获取收集箱内容',
    功能: '获取云端收集箱的内容',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'inbox'
})

router.post("/removeShorthands", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/inbox/removeShorthands', {
    名称: '移除收集箱内容',
    功能: '移除云端收集箱的内容',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'inbox'
})

module.exports=router