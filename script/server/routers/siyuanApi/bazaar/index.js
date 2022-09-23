const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
router.post("/getBazaarWidget", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/getBazaarWidget',{
    名称:'获取挂件',
    功能:'获取指定的挂件列表',
    方法:'post',
    权限:'read',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})

router.post("/getInstalledWidget", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/getInstalledWidget',{
    名称:'获取挂件',
    功能:'获取已安装挂件列表',
    方法:'post',
    权限:'read',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})

router.post("/installBazaarWidget", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/installBazaarWidget',{
    名称:'安装集市挂件',
    功能:'安装指定的集市挂件',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})

router.post("/uninstallBazaarWidget", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/uninstallBazaarWidget',{
    名称:'卸载集市挂件',
    功能:'卸载指定的集市挂件',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})

router.post("/getBazaarIcon", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/getBazaarIcon',{
    名称:'获取集市图标列表',
    功能:'获取集市上图标集的列表等',
    方法:'post',
    权限:'read',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})
router.post("/getInstalledIcon", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/getInstalledIcon',{
    名称:'获取已安装的图标列表',
    功能:'获取已经安装的图标',
    方法:'post',
    权限:'read',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})
router.post("/installBazaarIcon", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/installBazaarIcon',{
    名称:'安装集市图标',
    功能:'获取已经安装的集市图标',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})

router.post("/uninstallBazaarIcon", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/uninstallBazaarIcon',{
    名称:'卸载集市图标',
    功能:'卸载已经安装的图标',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})
router.post("/getBazaarTemplate", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/getBazaarTemplate',{
    名称:'获取集市模板列表',
    功能:'获取集市上的所有模板',
    方法:'post',
    权限:'read',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})

router.post("/getInstalledTemplate", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/getInstalledTemplate',{
    名称:'获取已安装的模板列表',
    功能:'获取本地已安装的所有模板',
    方法:'post',
    权限:'read',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})
router.post("/installBazaarTemplate", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/installBazaarTemplate',{
    名称:'安装集市模板',
    功能:'安装指定的集市模板到本地',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})
router.post("/uninstallBazaarTemplate", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/uninstallBazaarTemplate',{
    名称:'卸载集市模板',
    功能:'卸载指定的集市模板',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})

router.post("/getBazaarTheme", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/getBazaarTheme',{
    名称:'获取集市主题列表',
    功能:'获取所有集市主题的列表',
    方法:'post',
    权限:'read',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})
router.post("/getInstalledTheme", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/getInstalledTheme',{
    名称:'获取已安装主题列表',
    功能:'获取所有本地已经安装的主题',
    方法:'post',
    权限:'read',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})
router.post("/installBazaarTheme", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/installBazaarTheme',{
    名称:'安装集市主题',
    功能:'安装指定的集市主题到本地',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})
router.post("/uninstallBazaarTheme", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/uninstallBazaarTheme',{
    名称:'卸载集市主题',
    功能:'卸载已经安装的主题',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})
router.post("/getBazaarPackageREAME", auth(), apiProxy)
naive.serverUtil.discribeApi('/api/bazaar/getBazaarPackageREAME',{
    名称:'获取集市包说明文件',
    功能:'获取集市包的说明文件',
    方法:'post',
    权限:'admin',
    请求值:"todo",
    返回值:'todo',
    一级分组:'siyuanApi',
    二级分组:'bazaar'
})
module.exports=router