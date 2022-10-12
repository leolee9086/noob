import {npmCmd} from "./shell.js"
let re = null
if (window.require) {
        const fs = require("fs")
        const path = require("path")
        if (!window) {
                const window = global
        }
        const realRequire = window.require
        if (realRequire) {
                const path = require("path")
                re = function (moduleName, base) {
                        if (!window.realRequire) {
                                window.realRequire = realRequire
                        }
                        let workspaceDir
                        let that = window
                        if (base) {
                                moduleName = path.resolve(base, moduleName)
                                console.log(moduleName)
                        }

                        if (global.naive && global.naive.public) {
                                workspaceDir = naive.public.config.backend.filesys.workspaceDir
                        }

                        if (window.siyuan) {
                                workspaceDir = siyuan.config.system.workspaceDir
                        }
                        if (workspaceDir) {
                                if (this) {
                                        that = this
                                }
                                try {
                                        if (that.realRequire) {
                                                return that.realRequire(moduleName, __dirname)
                                        }
                                        else {
                                                return window.realRequire(moduleName, __dirname)
                                        }
                                } catch (e) {
                                        if (e.message.indexOf('Cannot find module') >= 0) {

                                                if (!(moduleName.startsWith("/") || moduleName.startsWith("./") || moduleName.startsWith("../"))) {

                                                        if (global.ExternalDepPathes) {
                                                                let flag
                                                                let modulePath
                                                                global.ExternalDepPathes.forEach(depPath => {
                                                                        if (fs.existsSync(path.join(depPath, moduleName))) {
                                                                                if (!flag) {
                                                                                        console.file_warn?console.file_warn(`模块${moduleName}未找到,重定向到${path.join(depPath, moduleName)}`):console.warn(`模块${moduleName}未找到,重定向到${path.join(depPath, moduleName)}`)
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
                        else return realRequire(moduleName)
                        console.log(realRequire.cache.electron.__proto__.require)
                        realRequire.cache.electron.__proto__.realRequire = realRequire.cache.electron.__proto__.require
                        realRequire.cache.electron.__proto__.require = re
                        window.require = re
                        global.require = re
                }
        }

}
if (window.require) {
        window.require = re
        window.require.setExternalDeps = (path) => {
                if (!window.ExternalDepPathes) {
                        window.ExternalDepPathes = []
                }
                if (path && !window.ExternalDepPathes.indexOf(path) >= 0) {
                        window.ExternalDepPathes.push(path)
                        window.ExternalDepPathes = Array.from(new Set(window.ExternalDepPathes))
                }
        }
        if (global.naive) {
                re.setExternalDeps(`${naive.public.config.backend.filesys.workspaceDir}`)
        }
        window.require.setExternalBase = (path) => {
                if (!window.ExternalDepPathes) {
                        window.ExternalDepPathes = []
                }
                if (!window.ExternalBase) {
                        window.ExternalBase = path
                }
                else {
                        console.error('不能重复设置外部依赖路径')
                }
        }
        window.requireInstall = function (moduleName) {
                if(!window.ExternalBase){
                        console.error('未设置外部依赖位置')
                        return
                }
                try {
                        return require(moduleName)
                } catch (e) {
                        console.log(e, window.require)
                        npmCmd(`--registry https://registry.npmmirror.com install ${moduleName} `, window.ExternalBase).then(w => {
                                console.log(w)
                                window.location.reload()
                        }).catch(
                                e => {
                                        console.log(e)
                                }
                        )
                }
        }
}

else {
        const require = {}
}

export default window.require
