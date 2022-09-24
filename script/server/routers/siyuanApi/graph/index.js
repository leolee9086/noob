const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/resetGraph", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/graph/resetGraph', {
    名称: '重置全局图谱设定',
    功能: '重置全局图谱设定',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'format'
})

router.post("/resetLocalGraph", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/graph/resetLocalGraph', {
    名称: '重置局部图谱设定',
    功能: '重置局部图谱设定',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'format'
})


router.post("/getGraph", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/graph/getGraph', {
    名称: '获取全局图谱',
    功能: '获取全局图谱',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'format'
})
router.post("/getLocalGraph", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/graph/getLocalGraph', {
    名称: '获取局部图谱',
    功能: '获取局部图谱',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'format'
})

module.exports=router