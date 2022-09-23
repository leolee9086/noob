const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/autoSpace", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/format/autoSpace', {
    名称: '自动空格',
    功能: '自动在中外文之间插入空格',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'format'
})
router.post("/netImg2LocalAssets", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/format/netImg2LocalAssets', {
    名称: '网络图片转本地图片',
    功能: '将网络图片转为本地图片',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'format'
})
module.exports=router