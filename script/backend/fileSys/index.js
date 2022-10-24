import requireHacker from "../util/requireHacker.js"
import pathConstructor from "../util/pathConstructor.js"
import list from "./utils/list.js"
import tree from "./utils/tree.js"
import compilers from "./compilers/index.js"
import relaod  from "../../util/reload.js"
import naiveClassLoader from "./naiveModuleLoader.js"
const fs = requireInstall('fs-extra')
function 获取文件扩展名(filename) {
    return filename.split(".").pop()
}

export default class FileSys {
    constructor(naive) {
        this.naive = naive
        let config = naive.public.config
        this.standalone = config.standalone
        this.compilers= {}
        this.watchFiletypes = config.backend.filesys.watchFiletypes
        this.workspaceDir = config.backend.filesys.workspaceDir
        this.初始化工作空间()
        this.初始化外部资源()
        this.初始化依赖加载()
        this.开始监听文件修改()
        this.加载编译器()
        this.加载模块加载器()
        this.list =list
        this.tree= tree
        console.log(this.tree(this.workspaceDir+'/data'))
    }
    加载模块加载器(){
        this.模块文件加载器 = new naiveClassLoader()
    }
    加载编译器(){
        this.compilers=new compilers()
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
            this.workspaceDir+`/conf/appearance/themes/naive`, option, (type, fileName) => {
                if (!standalone && watchFiletypes && watchFiletypes.indexOf(获取文件扩展名(fileName)) >= 0) {
                    relaod()
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