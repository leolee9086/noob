const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
const adminAuth =naive.middlewares.auth({user_group:'admin'})

router.post("/getBookmarkLabels", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/attr/getBookmarkLabels',{
    名称:'获取书签',
    功能:'获取书签标记',
    方法:'post',
    权限:'read',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'attr'
})

router.post("/resetBlockAttrs", auth.apiAuth, apiProxy)
naive.serverUtil.describeJSONApi('/api/attr/resetBlockAttrs',{
    名称:'重设块属性',
    功能:'重新设置思源块属性,与setBlockAttrs不同的是,未指定的快属性将被删除',
    方法:'post',
    权限:'write',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'attr'
})
router.post("/setBlockAttrs", auth.apiAuth, apiProxy)
naive.serverUtil.describeJSONApi('/api/attr/setBlockAttrs',{
    名称:'设置块属性',
    功能:'设置指定id块的属性值',
    方法:'post',
    权限:'write',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'attr'
})

router.post("/getBlockAttrs", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/attr/getBlockAttrs',{
    名称:'设置块属性',
    功能:'设置指定id块的属性值',
    方法:'post',
    权限:'read',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'attr'
})

module.exports=router