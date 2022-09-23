const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/setSyncEnable", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/sync/setSyncEnable', {
    名称: '搜索大小写设置',
    功能: '搜索大小写设置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'sync'
})

router.post("/setSyncMode", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/sync/setSyncMode', {
    名称: '搜索大小写设置',
    功能: '搜索大小写设置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'sync'
})

router.post("/setCloudSyncDir", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/sync/setCloudSyncDir', {
    名称: '搜索大小写设置',
    功能: '搜索大小写设置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'sync'
})

router.post("/createCloudSyncDir", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/sync/createCloudSyncDir', {
    名称: '搜索大小写设置',
    功能: '搜索大小写设置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'sync'
})

router.post("/removeCloudSyncDir", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/sync/removeCloudSyncDir', {
    名称: '搜索大小写设置',
    功能: '搜索大小写设置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'sync'
})

router.post("/listCloudSyncDir", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/sync/listCloudSyncDir', {
    名称: '搜索大小写设置',
    功能: '搜索大小写设置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'sync'
})

router.post("/performSync", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/sync/performSync', {
    名称: '搜索大小写设置',
    功能: '搜索大小写设置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'sync'
})

router.post("/performBootSync", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/sync/performBootSync', {
    名称: '搜索大小写设置',
    功能: '搜索大小写设置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'sync'
})

router.post("/getBootSync", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/sync/getBootSync', {
    名称: '搜索大小写设置',
    功能: '搜索大小写设置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'sync'
})

module.exports=router