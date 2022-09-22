const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/uploadCloud", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/asset/uploadCloud',{
    名称:'上传附件文件到云端',
    功能:'将指定的附件文件上传到云端',
    方法:'post',
    权限:'write',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'asset'
})
router.post("/insertLocalAssets", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/asset/insertLocalAssets',{
    名称:'插入本地文件',
    功能:'插入本地附件文件链接到笔记中',
    方法:'post',
    权限:'write',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'asset'
})

router.post("/resolveAssetPath", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/asset/resolveAssetPath',{
    名称:'解析附件路径',
    功能:'todo',
    方法:'post',
    权限:'read',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'asset'
})
router.post("/upload", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/asset/upload',{
    名称:'上传附件到assets中',
    功能:'todo',
    方法:'post',
    权限:'write',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'asset'
})

router.post("/setFileAnnotation", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/asset/setFileAnnotation',{
    名称:'设置文件说明',
    功能:'todo',
    方法:'post',
    权限:'write',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'asset'
})

router.post("/getFileAnnotation", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/asset/setFileAnnotation',{
    名称:'上传附件到assets中',
    功能:'todo',
    方法:'post',
    权限:'write',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'asset'
})

router.post("/getUnusedAssets", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/asset/setFileAnnotation',{
    名称:'获取未使用附件列表',
    功能:'todo',
    方法:'post',
    权限:'write',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'asset'
})

router.post("/removeUnusedAsset", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/asset/setFileAnnotation',{
    名称:'删除未使用附件',
    功能:'todo',
    方法:'post',
    权限:'write',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'asset'
})

router.post("/removeUnusedAssets", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/asset/setFileAnnotation',{
    名称:'批量删除未使用附件',
    功能:'todo',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'asset'
})

router.post("/getDocImageAssets", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/asset/getDocImageAssets',{
    名称:'获取文档图片附件',
    功能:'获取文档中所有图片附件属性',
    方法:'post',
    权限:'read',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'asset'
})

router.post("/renameAsset", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/asset/renameAsset',{
    名称:'重命名附件',
    功能:'重命名指定的附件文件',
    方法:'post',
    权限:'write',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'asset'
})

module.exports=router