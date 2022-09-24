const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/pushMsg", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/transactions/pushMsg', {
    名称: '推送消息',
    功能: '推送错误消息',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'template'
})

router.post("/pushErrMsg", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/transactions/pushErrMsg', {
    名称: '推送消息',
    功能: '推送错误消息',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'pushMsg'
})
router.post("", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/transactions', {
    名称: '事务',
    功能: '事务',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'transactions'
})

module.exports=router