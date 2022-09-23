const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/lsNotebooks", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/notebook/lsNotebooks', {
    名称: '列出所有笔记本',
    功能: '列出当前工作空间下所有笔记本',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'notebook'
})
router.post("/openNotebook", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/notebook/openNotebook', {
    名称: '打开笔记本',
    功能: '打开制定笔记本',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'notebook'
})
router.post("/closeNotebook", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/notebook/closeNotebook', {
    名称: '关闭指定笔记本',
    功能: '关闭指定笔记本',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'notebook'
})
router.post("/getNotebookConf", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/notebook/getNotebookConf', {
    名称: '获取指定笔记本设置',
    功能: '获取指定笔记本设置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'notebook'
})
router.post("/setNotebookConf", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/notebook/setNotebookConf', {
    名称: '修改笔记本设置',
    功能: '修改制定笔记本的设置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'notebook'
})
router.post("/createNotebook", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/notebook/createNotebook', {
    名称: '创建笔记本',
    功能: '创建新的笔记本',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'notebook'
})
router.post("/removeNotebook", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/notebook/removeNotebook', {
    名称: '移除笔记本',
    功能: '移除指定的笔记本',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'notebook'
})
router.post("/renameNotebook", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/notebook/renameNotebook', {
    名称: '重命名笔记本',
    功能: '重命名指定的笔记本',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'notebook'
})
router.post("/changeSortNotebook", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/notebook/changeSortNotebook', {
    名称: '更改指定笔记本的排序方式',
    功能: '更改指定笔记本的排序方式',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'notebook'
})
router.post("/setNotebookIcon", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/notebook/setNotebookIcon', {
    名称: '设置笔记本图标',
    功能: '设置指定笔记本的图标',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'notebook'
})
module.exports=router