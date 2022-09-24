const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/importStdMd", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/import/importStdMd', {
    名称: '导入标准markdown',
    功能: '导入markdown内容到指定位置',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'import'
})

router.post("/importData", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/import/importData', {
    名称: '导入数据',
    功能: '导入data文件夹',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'import'
})
router.post("/importSY", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/import/importSY', {
    名称: '导入.sy压缩包',
    功能: '导入思源导出的压缩包文件',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'import'
})

module.exports=router