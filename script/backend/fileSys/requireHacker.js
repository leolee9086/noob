let re = null
if (require) {
        const fs = require("fs")
        const path = require("path")
        if (!window) {
                const window = global
        }

        const realRequire = window.require
        if (realRequire) {
                const path = require("path")
                re = function (moduleName, base) {
                        console.log(global)
                        window.realRequire = realRequire
                        let workspaceDir
                        let that = window
                        if (base) {
                                moduleName = path.resolve(base, moduleName)
                                console.log(moduleName)
                        }

                        if (global.naive && global.naive.public) {
                                workspaceDir = naive.public.config.system.workspaceDir
                                re.setExternalDeps(workspaceDir + `/conf/naiveConf/deps/node_modules`)
                        }
                        if (workspaceDir) {
                                if (this) {
                                        that = this
                                }
                                try {
                                        if (that.realRequire) {
                                                return that.realRequire(moduleName)
                                        }
                                        else {
                                                return window.realRequire(moduleName)
                                        }
                                } catch (e) {
                                        if (e.message.indexOf('Cannot find module') >= 0) {

                                                if (!(moduleName.startsWith("/") || moduleName.startsWith("./") || moduleName.startsWith("../"))) {

                                                        if (global.require.ExternalDepPathes) {
                                                                let flag
                                                                let modulePath
                                                                global.require.ExternalDepPathes.forEach(depPath => {
                                                                        if (fs.existsSync(path.join(depPath, moduleName))) {
                                                                                if (!flag) {
                                                                                        console.warn(`模块${moduleName}未找到,重定向到${path.join(depPath, moduleName)}`)
                                                                                        moduleName = path.join(depPath, moduleName)
                                                                                        modulePath = path.join(depPath, moduleName)
                                                                                        flag = true
                                                                                } else {
                                                                                        console.warn(`模块${moduleName}在${modulePath}已经找到,请检查外部路径${path.join(depPath, moduleName)}是否重复安装`)
                                                                                }

                                                                        }
                                                                });
                                                        }
                                                }
                                                else if (that && window.naive.plugin && that instanceof window.naive.plugin) {
                                                        try {
                                                                moduleName = path.resolve(that.selfPath, moduleName)
                                                                return window.require(moduleName)
                                                        }
                                                        catch (e) {
                                                                throw e
                                                        }
                                                }
                                                try {
                                                        let module = that.realRequire(moduleName)
                                                        return module
                                                }
                                                catch (e) {
                                                        throw e
                                                }
                                        }
                                        else {
                                                console.error(e)
                                        }
                                }
                        }
                        console.log(realRequire.cache.electron.__proto__.require)
                        realRequire.cache.electron.__proto__.realRequire = realRequire.cache.electron.__proto__.require
                        realRequire.cache.electron.__proto__.require = re
                        window.require = re
                        global.require = re
                }
        }
}
re.setExternalDeps = (path) => {
        if (!global.require) {
                return
        }
        if (!global.require.ExternalDepPathes) {
                global.require.ExternalDepPathes = []
        }
        if (path) {
                global.require.ExternalDepPathes.push(path)
        }
}
if (global.naive) {
        re.setExternalDeps(`${naive.public.config.system.workspaceDir}`)
}
export default require = re