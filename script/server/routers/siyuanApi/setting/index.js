const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/setAccount", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/setAccount', {
    名称: '设置账户',
    功能: '设置账户',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
router.post("/setEditor", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/setEditor', {
    名称: '设置编辑器',
    功能: '设置编辑器',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
router.post("/setExport", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/setExport', {
    名称: '设置导出',
    功能: '设置导出',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
router.post("/setFiletree", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/setFiletree', {
    名称: '设置导出',
    功能: '设置导出',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
router.post("/setSearch", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/setSearch', {
    名称: '设置导出',
    功能: '设置导出',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
router.post("/setKeymap", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/setKeymap', {
    名称: '设置导出',
    功能: '设置导出',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
router.post("/setAppearance", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/setAppearance', {
    名称: '设置导出',
    功能: '设置导出',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
router.post("/getCloudUser", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/getCloudUser', {
    名称: '设置导出',
    功能: '设置导出',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
router.post("/logoutCloudUser", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/logoutCloudUser', {
    名称: '登出云端账户',
    功能: '设置导出',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
router.post("/login2faCloudUser", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/login2faCloudUser', {
    名称: '登入云端账户',
    功能: '登入云端账户',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
router.post("/getCustomCSS", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/getCustomCSS', {
    名称: '获取自定义css',
    功能: '获取自定义css',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
router.post("/setCustomCSS", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/setCustomCSS', {
    名称: '设置自定义css',
    功能: '设置自定义css',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
router.post("/setEmoji", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/setEmoji', {
    名称: '设置emoji',
    功能: '设置emoji',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
router.post("/setSearchCaseSensitive", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/setting/setSearchCaseSensitive', {
    名称: '搜索大小写设置',
    功能: '搜索大小写设置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'setting'
})
module.exports=router