const express = require('express');
const router = express.Router();
const { middlewares } = naive
const { auth, syProxy } = middlewares
const { apiProxy } = syProxy
router.post("/getBlockInfo", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/getBlockInfo', {
    名称: '获取块信息',
    功能: '获取指定块的信息',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})

router.post("/getBlockDOM", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/getBlockDOM', {
    名称: '获取块DOM',
    功能: '获取指定块的DOM',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})

router.post("/getBlockKramdown", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/getBlockKramdown', {
    名称: '获取块Kramdown',
    功能: '获取指定块的DOM',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})
router.post("/getBlockBreadcrumb", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/getBlockBreadcrumb', {
    名称: '获取块面包屑',
    功能: '获取指定块的面包屑',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})
router.post("/getRefIDs", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/getRefIDs', {
    名称: '获取指定块的refIDs',
    功能: '获取指定块refID',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})
router.post("/getRefIDsByFileAnnotationID", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/getRefIDsByFileAnnotationID', {
    名称: '根据FileAnnotationID获取所有refID',
    功能: '获取指定附件文件的引用id',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})
router.post("/getBlockDefIDsByRefText", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/getBlockDefIDsByRefText', {
    名称: '根据块引文字获取定义块id',
    功能: '指定一段文字,获取所有符合这段文字的可引用块ID',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})
router.post("/getRefText", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/getRefText', {
    名称: '获取块引用文字',
    功能: '指定一段文字,获取所有符合这段文字的可引用块ID',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})

router.post("/getBlockWordCount", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/getBlockWordCount', {
    名称: '获取块字数统计',
    功能: '指定块id,获取其字数统计',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})
router.post("/getBlocksWordCount", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/getBlocksWordCount', {
    名称: '批量获取块字数统计',
    功能: '指定一组块id,获取其字数统计',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})
router.post("/getContentWordCount", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/getContentWordCount', {
    名称: '获取指定块的内容字数',
    功能: '指定块id,获取其字数统计',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})

router.post("/getRecentUpdatedBlocks", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/getRecentUpdatedBlocks', {
    名称: '获取最近更新块',
    功能: '获取最近更新的块',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})

router.post("/getDocInfo", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/getDocInfo', {
    名称: '获取文档信息',
    功能: '获取文档的信息',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})

router.post("/checkBlockExist", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/checkBlockExist', {
    名称: '校验块是否存在',
    功能: '校验指定的块是否存在',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})

router.post("/checkBlockFold", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/block/checkBlockFold', {
    名称: '校验块是否折叠',
    功能: '校验指定的块是否折叠',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})

router.post("/insertBlock", auth.apiAuth, apiProxy)
naive.serverUtil.describeJSONApi('/api/block/insertBlock', {
    名称: '插入块',
    功能: '在指定位置插入块',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})
router.post("/prependBlock", auth.apiAuth, apiProxy)
naive.serverUtil.describeJSONApi('/api/block/prependBlock', {
    名称: '插入前置块',
    功能: '在指定文档开头插入块',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})
router.post("/appendBlock", auth.apiAuth, apiProxy)
naive.serverUtil.describeJSONApi('/api/block/appendBlock', {
    名称: '插入后置块',
    功能: '在指定文档结尾插入块',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})
router.post("/updateBlock", auth.apiAuth, apiProxy)
naive.serverUtil.describeJSONApi('/api/block/updateBlock', {
    名称: '更新块',
    功能: '更新指定块',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})
router.post("/deleteBlock", auth.apiAuth, apiProxy)
naive.serverUtil.describeJSONApi('/api/block/deleteBlock', {
    名称: '删除块',
    功能: '删除指定块',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})

router.post("/setBlockReminder", auth.apiAuth, apiProxy)
naive.serverUtil.describeJSONApi('/api/block/setBlockReminder', {
    名称: '设置块提醒',
    功能: '设置指定块的提醒',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'block'
})
module.exports = router