const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/searchTag", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/search/searchTag', {
    名称: '搜索标签',
    功能: '搜索标签',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'repo'
})

router.post("/searchTemplate", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/search/searchTemplate', {
    名称: '搜索模板',
    功能: '搜索模板',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'search'
})
router.post("/searchWidget", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/search/searchWidget', {
    名称: '搜索挂件',
    功能: '搜索挂件',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'search'
})
router.post("/searchRefBlock", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/search/searchRefBlock', {
    名称: '搜索引用块',
    功能: '搜索引用块',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'search'
})
router.post("/searchEmbedBlock", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/search/searchEmbedBlock', {
    名称: '搜索引用块',
    功能: '搜索引用块',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'search'
})
router.post("/fullTextSearchBlock", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/search/fullTextSearchBlock', {
    名称: '全文搜索块',
    功能: '全文搜索块',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'search'
})
router.post("/searchAsset", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/search/searchAsset', {
    名称: '搜索附件',
    功能: '搜索附件',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'search'
})
router.post("/findReplace", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/search/findReplace', {
    名称: '搜索并替换内容',
    功能: '搜索并替换内容',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'search'
})
module.exports=router