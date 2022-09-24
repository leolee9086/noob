const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/render", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/template/render', {
    名称: '渲染标签',
    功能: '渲染标签',
    方法: 'post',
    权限: 'write',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'template'
})

router.post("/docSaveAsTemplate", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/template/docSaveAsTemplate', {
    名称: '另存文档为模板',
    功能: '另存文档为模板',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'template'
})
module.exports=router