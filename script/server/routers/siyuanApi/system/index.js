const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.get("/bootProgress", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/bootProgress', {
    名称: '获取启动进度',
    功能: '获取启动进度',
    方法: 'get',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})
router.post("/bootProgress", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/bootProgress', {
    名称: '获取启动进度',
    功能: '获取启动进度',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})
router.get("/version", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/version', {
    名称: '获取思源版本',
    功能: '获取思源版本',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})
router.post("/version", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/version', {
    名称: '获取思源版本',
    功能: '获取思源版本',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})
router.post("/currentTime", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/currentTime', {
    名称: '获取系统时间',
    功能: '获取系统时间',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})
router.post("/uiproc", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/uiproc', {
    名称: 'uiproc',
    功能: 'uiproc',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})
router.post("/loginAuth", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/loginAuth', {
    名称: '登入校验',
    功能: '登入校验',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})
router.post("/logoutAuth", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/logoutAuth', {
    名称: '登出校验',
    功能: '登出校验',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

router.get("/getCaptcha", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/getCaptcha', {
    名称: '获取验证码',
    功能: '获取验证码',
    方法: 'get',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})
// 需要鉴权
router.post("/getEmojiConf", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/getEmojiConf', {
    名称: '获取emoji设置',
    功能: '获取验证码',
    方法: 'get',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

router.post("/setAccessAuthCode", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/setAccessAuthCode', {
    名称: '设置访问授权码',
    功能: '获取验证码',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})
router.post("/setNetworkServe", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/setNetworkServe', {
    名称: '设置访问授权码',
    功能: '获取验证码',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

router.post("/setUploadErrLog", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/setUploadErrLog', {
    名称: '设置访问授权码',
    功能: '获取验证码',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

router.post("/setNetworkProxy", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/setNetworkProxy', {
    名称: '设置访问授权码',
    功能: '获取验证码',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

router.post("/setWorkspaceDir", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/setWorkspaceDir', {
    名称: '设置工作空间',
    功能: '设置工作空间',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

router.post("/listWorkspaceDirs", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/listWorkspaceDirs', {
    名称: '获取工作空间列表',
    功能: '获取工作空间列表',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

router.post("/setAppearanceMode", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/setAppearanceMode', {
    名称: '设置显示模式',
    功能: '设置显示模式',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

router.post("/getSysFonts", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/getSysFonts', {
    名称: '获取系统字体',
    功能: '获取系统字体',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

router.post("/exit", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/exit', {
    名称: '退出思源',
    功能: '退出思源',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

router.post("/setUILayout", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/setUILayout', {
    名称: '设置ui布局',
    功能: '设置ui布局',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

router.post("/getConf", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/getConf', {
    名称: '获取设置',
    功能: '获取设置',
    方法: 'post',
    权限: 'read',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

router.post("/checkUpdate", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/checkUpdate', {
    名称: '检查思源更新',
    功能: '检查思源更新',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

router.post("/exportLog", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/system/exportLog', {
    名称: '导出日志',
    功能: '导出日志',
    方法: 'post',
    权限: 'admin',
    请求值: "todo",
    返回值: 'todo',
    一级分组: 'siyuanApi',
    二级分组: 'system'
})

module.exports=router