const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post( "/pushMsg", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/notification/pushMsg', {
    名称: '推送消息',
    功能: '推送消息到各个编辑器',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'notification'
})
router.post( "/pushErrMsg", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/notification/pushErrMsg', {
    名称: '推送错误信息',
    功能: '推送错误信息到各个编辑器',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'notification'
})
module.exports=router