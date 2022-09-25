const listEndpoints = require('express-list-endpoints')

module.exports = {
    //校验是否所有path都有设置权限
    chekEndPoints: function (app, registry) {
        const pathTable = listEndpoints(app)
        pathTable.forEach(
            pathItem => {
                let path = pathItem.path
                if (!registry) {
                    registry = {}
                }
                else {
                    if (!registry[path]) {
                        registry[path] = {}
                        registry[path]['level'] = 0
                        registry[path]['level_lable'] = 'admin'
                        console.warn(`路径:${path}未设置接口等级,请检查接口权限配置文件`)
                    }
                }
            }
        )
        return registry
    },
   /* mergeUserGroup: function (userGroupTable) {
        let mergedGroupTable = {}
        for (userGroup in userGroupTable) {
            if (!userGroupTable[userGroup]['access']) {
                userGroupTable[userGroup]['access'] = {}
                console.warn(`用户组:${userGroup}未设置权限校验,请检查接口权限配置文件`)
            } else {
                for (pathName in userGroupTable[userGroup]['access']) {
                    let pathArray = mergePathTree(pathName,userGroup(pathName))
                    if(!mergedGroupTable[userGroup]){
                        mergedGroupTable[userGroup]=[]
                    }
                    mergedGroupTable[userGroup]=mergedGroupTable[userGroup].concat(pathArray)
                }
            }
        }
        return mergedGroupTable

    },*/
    getRoutersSturct: function (app) {
        let json = {}
        let routerlist = listEndpoints(app)
        routerlist.forEach(
            router => {
                let pathArray = router.path.split('/')
                console.log(pathArray)
                let currentNode = json
                for (let i = 0, l = pathArray.length; i < l; i++) {
                    let nodeName = pathArray[i]
                    if (!currentNode[nodeName]) {
                        currentNode[nodeName] = { _parent: currentNode }
                        currentNode = currentNode[nodeName]
                    }
                    else {
                        currentNode = currentNode[nodeName]
                    }
                    if (i == pathArray.length - 1) {
                        currentNode["_parent"][nodeName] = router
                    }
                }
            }
        )
        return json['']
    }
}