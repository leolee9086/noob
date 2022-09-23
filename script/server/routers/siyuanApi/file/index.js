const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/getFile", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/file/getFile', {
    名称: '获取指定文件',
    功能: '指定工作空间路径,获取指定文件',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'file'
})
router.post("/putFile", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/file/putFile', {
    名称: '上传文件',
    功能: '指定工作空间路径,上传文件到此位置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'file'
})
router.post("/copyFile", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/file/copyFile', {
    名称: '复制文件',
    功能: '指定工作空间路径,复制文件',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'file'
})
module.exports=router