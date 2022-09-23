const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getBookmark", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bookmark/getBookmark', {
    名称: '获取书签',
    功能: '获取书签列表',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'bookmark'
})

router.post("/renameBookmark", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bookmark/renameBookmark', {
    名称: '重命名书签',
    功能: '重命名某个书签',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'bookmark'
})
router.post("/removeBookmark", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bookmark/removeBookmark', {
    名称: '删除书签',
    功能: '删除某个书签',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'bookmark'
})
module.exports=router