const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/getNotebookHistory", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/history/getNotebookHistory', {
    名称: '获取笔记本历史',
    功能: '获取笔记本的编辑历史',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'history'
})

router.post("/rollbackNotebookHistory", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/history/rollbackNotebookHistory', {
    名称: '回滚笔记本历史',
    功能: '回滚笔记本历史到指定版本',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'history'
})

router.post("/rollbackAssetsHistory", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/history/rollbackAssetsHistory', {
    名称: '回滚附件历史',
    功能: '会滚附件历史到指定版本',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'history'
})

router.post("/getDocHistoryContent", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/history/getDocHistoryContent', {
    名称: '获取文档历史内容',
    功能: '获取指定文档历史内容',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'history'
})

router.post("/rollbackDocHistory", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/history/rollbackDocHistory', {
    名称: '回滚文档历史',
    功能: '回滚文档的编辑历史',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'history'
})

router.post("/clearWorkspaceHistory", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/history/clearWorkspaceHistory', {
    名称: '清除工作空间历史版本',
    功能: '获取笔记本的编辑历史',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'history'
})

router.post("/reindexHistory", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/history/reindexHistory', {
    名称: '重新索引历史',
    功能: '重建历史索引',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'history'
})

router.post("/searchHistory", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/history/searchHistory', {
    名称: '搜索历史',
    功能: '在历史版本中搜索',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'history'
})

module.exports=router