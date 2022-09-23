const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getTag", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/tag/getTag', {
    名称: '获取标签',
    功能: '获取标签',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'tag'
})

router.post("/renameTag", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/tag/renameTag', {
    名称: '重命名标签',
    功能: '重命名标签',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'tag'
})
router.post("/removeTag", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/tag/removeTag', {
    名称: '移除标签',
    功能: '移除标签',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'tag'
})
module.exports=router