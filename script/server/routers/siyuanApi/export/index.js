const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/batchExportMd", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/export/batchExportMd', {
    名称: '批量导出markdown',
    功能: '批量导出指定文档的markdown内容',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'export'
})
router.post("/exportMd", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/export/exportMd', {
    名称: '导出markdown',
    功能: '导出指定文档的markdown内容',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'export'
})
router.post("/exportSY", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/export/exportSY', {
    名称: '导出sy压缩包',
    功能: '导出指定文档的sy压缩包',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'export'
})
router.post("/exportNotebookSY", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/export/exportNotebookSY', {
    名称: '导出笔记本压缩包',
    功能: '导出笔记本的压缩包',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'export'
})

router.post("/exportMdContent", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/export/exportMdContent', {
    名称: '导出maekdown内容',
    功能: '导出指定文档的markdown内容',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'export'
})

router.post("/exportHTML", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/export/exportHTML', {
    名称: '导出HTML',
    功能: '导出指定文档的HTML',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'export'
})

router.post("/exportMdHTML", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/export/exportMdHTML', {
    名称: '导出以markdown生成的HTML',
    功能: '导出指定文档的HTML',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'export'
})

router.post("/exportDocx", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/export/exportDocx', {
    名称: '导出Docx',
    功能: '导出Docx文件',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'export'
})
router.post("/addPDFOutline", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/export/addPDFOutline', {
    名称: '导出PDF大纲',
    功能: '导出PDF时的大纲',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'export'
})

router.post("/preview", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/export/preview', {
    名称: '导出预览',
    功能: '导出预览',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'export'
})
router.post("/exportData", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/export/exportData', {
    名称: '导出data文件',
    功能: '导出data文件',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'export'
})
router.post("/exportDataInFolder", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/export/exportDataInFolder', {
    名称: '导出data文件到压缩包',
    功能: '导出data文件到压缩包',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'export'
})

module.exports=router