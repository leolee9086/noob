const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/login", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/account/login',{
    名称:'登录思源账号',
    功能:'用于登录思源账号',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'account'
})
router.post("/checkActivationcode", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/account/checkActivationcode',{
    名称:'校验激活码',
    功能:'用于校验思源激活码',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'account'
})
router.post("/useActivationcode", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/account/useActivationcode',{
    名称:'使用激活码',
    功能:'使用思源激活码',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'account'
})
router.post("/deactivate", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/account/deactivate',{
    名称:'反激活',
    功能:'反激活思源账号',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'account'
})
router.post("/startFreeTrial", auth(), apiProxy)
naive.serverUtil.describeJSONApi('/api/account/startFreeTrial',{
    名称:'开始试用思源',
    功能:'开始试用思源会员功能,试用时长参考思源的文档',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'account'
})
module.exports=router