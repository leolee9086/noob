import serverUtil from "./util/index.js";
import NaiveServer from "./naiveServer.js"
const fs = require('fs-extra')

function 获取文件扩展名(filename) {
    return filename.split(".").pop()
}
export default class NaiveBackend {
    constructor(naive) {
        this.naive = naive
        let config = naive.public.config
        this.standalone = config.standalone
        this.watchFiletypes =config.watchFiletypes
        this.workspaceDir = config.system.workspaceDir
        this.开始监听文件修改()
        this.创建服务器()
    }
    开始监听文件修改() {
        let standalone = this.standalone
        let watchFiletypes = this.watchFiletypes
        let naive = this.naive
        const option = {
            persistent: true,
            recursive: true,
          };
        fs.watch(
            this.workspaceDir, option,(type, fileName) => {
                if (!standalone &&watchFiletypes &&watchFiletypes.indexOf(获取文件扩展名(fileName))>=0) {
                    naive.重新加载()
                }
            }
        )
    }
    创建服务器() {
        this.发布服务器 = new NaiveServer(naive)
        this.发布服务器.开始服务()
        this.api = this.发布服务器.api
    }
}