const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/refreshBacklink", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/ref/refreshBacklink', {
    名称: '刷新反向链接',
    功能: '刷新反向链接',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'ref'
})

//router.post("/getBacklink", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/ref/getBacklink', {
    名称: '获取反向链接',
    功能: '获取反向链接',
    方法: {
        post:[auth(),apiProxy],
        get:function(req,res){
            res.end("测试一下")
        }
    },
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'ref'
})
router.post("/createBacklink", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/ref/createBacklink', {
    名称: '创建反向链接',
    功能: '创建反向链接',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'ref'
})
module.exports=router