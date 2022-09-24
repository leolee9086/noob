const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getCloudSpace", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/cloud/getCloudSpace', {
    名称: '获取云端空间情况',
    功能: '获取云端空间详情',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'cloud'
})
module.exports=router