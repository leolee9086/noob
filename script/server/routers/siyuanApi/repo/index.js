const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/InitRepoKeyFromPassphrase", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/InitRepoKeyFromPassphrase', {
    名称: '以passphrase创建repoKey',
    功能: '以passphrase创建repoKey',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})

router.post("/initRepoKey", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/initRepoKey', {
    名称: '初始化repoKey',
    功能: '初始化repoKey',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})
router.post("/resetRepo", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/resetRepo', {
    名称: '重设repo',
    功能: '重设repo',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})

router.post("/importRepoKey", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/importRepoKey', {
    名称: '导入repoKey',
    功能: '导入repoKey',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})

router.post("/createSnapshot", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/createSnapshot', {
    名称: '创建数据快照',
    功能: '创建当前数据快照',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})
router.post("/tagSnapshot", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/tagSnapshot', {
    名称: '标记数据快照',
    功能: '标记数据快照',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})
router.post("/checkoutRepo", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/checkoutRepo', {
    名称: 'checkoutRepo',
    功能: 'checkoutRepo',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})
router.post("/getRepoSnapshots", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/getRepoSnapshots', {
    名称: '获取所有快照',
    功能: '获取所有快照',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})
router.post("/getRepoTagSnapshots", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/getRepoTagSnapshots', {
    名称: '获取所有标记快照',
    功能: '获取所有标记快照',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})
router.post("/removeRepoTagSnapshot", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/removeRepoTagSnapshot', {
    名称: '移除标记快照',
    功能: '移除标记快照',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})
router.post("/getCloudRepoTagSnapshots", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/getCloudRepoTagSnapshots', {
    名称: '获取云端数据快照',
    功能: '获取思源云端数据快照',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})
router.post("/removeCloudRepoTagSnapshot", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/removeCloudRepoTagSnapshot', {
    名称: '移除云端数据快照',
    功能: '移除云端数据快照',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})

router.post("/uploadCloudSnapshot", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/uploadCloudSnapshot', {
    名称: '上传数据快照到云端',
    功能: '上传数据快照到云端',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})
router.post("/downloadCloudSnapshot", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/repo/downloadCloudSnapshot', {
    名称: '下载云端数据快照',
    功能: '下载云端数据快照',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})
module.exports=router