import serverUtil from "./util/index.js";
import NaiveServer from "./naiveServer.js"
import FileSys from "./fileSys/index.js";

export default class NaiveBackend {
    constructor(naive) {
        this.naive = naive
        let config = naive.public.config
        this.standalone = config.standalone
        this.watchFiletypes =config.watchFiletypes
        this.workspaceDir = config.system.workspaceDir
        this.初始化文件系统()
        this.创建服务器()
    }
    初始化文件系统(){
        this.fileSys=new FileSys(this.naive)
        console.log(this.fileSys)
    }
    创建服务器() {
        this.发布服务器 = new NaiveServer(naive)
        this.发布服务器.开始服务()
        this.api = this.发布服务器.api
    }
}