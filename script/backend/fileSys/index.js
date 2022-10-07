import pathConstructor from "../util/pathConstructor.js"
import requireHacker from "./requireHacker.js"

const fs = require('fs-extra')
function 获取文件扩展名(filename) {
    return filename.split(".").pop()
}
export default class FileSys {
    constructor(naive) {
        this.naive = naive
        let config = naive.public.config
        this.standalone = config.standalone
        this.watchFiletypes =config.backend.filesys.watchFiletypes
        this.workspaceDir = config.backend.filesys.workspaceDir
        this.初始化工作空间()
        this.初始化外部资源()
        this.初始化依赖加载()
        this.开始监听文件修改()
    }
    初始化工作空间() {
        this.pathConstructor = new pathConstructor(this.naive)
    }
    初始化外部资源() {
        
    }
    初始化依赖加载() {
        
    }
    开始监听文件修改() {
        let standalone = this.standalone
        let watchFiletypes = this.watchFiletypes
        let naive = this.naive
        const option = {
            persistent: true,
            recursive: true,
        };
        this.fileWatcher = fs.watch(
            this.workspaceDir, option, (type, fileName) => {
                if (!standalone && watchFiletypes && watchFiletypes.indexOf(获取文件扩展名(fileName)) >= 0) {
                    naive.重新加载()
                }
            }
        )
    }
    结束监听文件修改() {
        if (this.fileWatcher) {
            this.fileWatcher.close()
        }
    }
}