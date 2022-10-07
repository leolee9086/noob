//import serverUtil from "./util/index.js";
import NaiveServer from "./naiveServer.js"
import FileSys from "./fileSys/index.js";
import DBS from "./dataBase/index.js"
export default class NaiveBackend {
    constructor(naive) {
        this.naive = naive
        let config = naive.public.config
        this.standalone = config.backend.filesys.standalone
        this.watchFiletypes = config.backend.filesys.watchFiletypes
        this.workspaceDir = config.backend.filesys.workspaceDir
        this.初始化文件系统()
        this.创建配置桥()
        this.初始化服务器()
    }
    创建配置桥() {
        let json = {
            server: {
                port: this.naive.public.config.backend.server.port,
                location: this.naive.public.config.backend.server.location
            }
        }
        let fs = require('fs-extra')
        fs.writeFileSync(`${this.workspaceDir}/conf/appearance/themes/naive/confBridge.json`, JSON.stringify(json))
    }
    初始化api() {

    }
    初始化文件系统() {
        this.fileSys = new FileSys(this.naive)
    }
    初始化服务器() {
        this.发布服务器 = new NaiveServer(naive)
        this.发布服务器.开始服务()
        this.api = this.发布服务器.api
    }
}