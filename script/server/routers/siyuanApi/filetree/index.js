const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/searchDocs", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/searchDocs', {
    名称: '搜索文档',
    功能: '搜索文档',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'file'
})
router.post("/listDocsByPath", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/listDocsByPath', {
    名称: '列出路径下文文档',
    功能: '搜索文档',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/getDoc", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/getDoc', {
    名称: '获取文档内容',
    功能: '获取指定文档的内容',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})

router.post("/getDocNameTemplate", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/getDocNameTemplate', {
    名称: '获取文档名模板',
    功能: '获取指定笔记本的文档名模板',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/changeSort", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/changeSort', {
    名称: '改变排序方式',
    功能: '改变笔记排序方式',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/lockFile", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/lockFile', {
    名称: '锁定文件',
    功能: '锁定指定文件',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})

router.post("/createDocWithMd", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/createDocWithMd', {
    名称: '以md创建文档',
    功能: '传入md字符串,在指定位置创建文档',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/createDailyNote", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/createDailyNote', {
    名称: '创建每日笔记',
    功能: '创建指定笔记本的每日笔记',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/createDoc", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/createDoc', {
    名称: '创建文档',
    功能: '在指定位置创建文档',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/renameDoc", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/renameDoc', {
    名称: '重命名文档',
    功能: '重命名指定文档',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/removeDoc", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/removeDoc', {
    名称: '移除文档',
    功能: '移除指定文档',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/moveDoc", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/moveDoc', {
    名称: '移动文档',
    功能: '移动指定文档到指定位置',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/duplicateDoc", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/duplicateDoc', {
    名称: '复制文档',
    功能: '复制文档的拷贝',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/getHPathByPath", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/getHPathByPath', {
    名称: '根据路径获取人类可读路径',
    功能: '根据id形式的思源路径获取文档名形式的可读路径',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})

router.post("/getHPathByID", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/getHPathByID', {
    名称: '根据ID获取人类可读路径',
    功能: '根据id获取文档名形式的可读路径',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})

router.post("/getFullHPathByID", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/getFullHPathByID', {
    名称: '根据ID获取完整可读路径',
    功能: '根据id获取文档名形式的完整可读路径(包括笔记本名称)',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})

router.post("/doc2Heading", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/doc2Heading', {
    名称: '转换文档为标题',
    功能: '将指定文档转化为标题',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/heading2Doc", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/heading2Doc', {
    名称: '转换标题为文档',
    功能: '将指定标题转换为文档',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/li2Doc", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/li2Doc', {
    名称: '转换列表为文档',
    功能: '将指定列表块转换为文档',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/refreshFiletree", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/refreshFiletree', {
    名称: '刷新文档树',
    功能: '刷新文档树',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
router.post("/reindexTree", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/filetree/reindexTree', {
    名称: '重建索引',
    功能: '重建索引',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'filetree'
})
module.exports=router