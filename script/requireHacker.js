let re = null
if(require){
const fs = require("fs")
if (!window) {
        const window = global
        global.window = window
}
const realRequire = window.require
console.log(realRequire)
if (realRequire) {
        const path = require("path")
        re =function(moduleName, base) {
                window.realRequire = realRequire

                let workspaceDir
                if(global.naive&&global.naive.public){
                    workspaceDir = naive.public.config.system.workspaceDir
                    console.log(workspaceDir)
                }
                if (workspaceDir) {
                        let that = window
                        if (base) {
                                moduleName = path.resolve(base, moduleName)
                                console.log(moduleName)
                        }
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
                                                console.warn(`模块${moduleName}未找到,重定向到naive设置文件deps/node_modules`)
                                                let realModuleName = moduleName
                                                moduleName = workspaceDir + `/conf/naiveConf/deps/node_modules/${moduleName}`
                                                if (!fs.existsSync(moduleName)) {
                                                        try {
                                                                npm(`i ${realModuleName}`, workspaceDir + `/conf/naiveConf/deps`)
                                                        } catch (e) {

                                                        }
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
export default require = re