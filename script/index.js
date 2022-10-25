//这里是第一次引入requireHacker,纯粹是为了它的副作用,扩展window.require
import requireHacker from "./util/requireHacker.js"
import 获取文件扩展名 from "./util/file.js"
//开发过程中修改文件后重启
import 重新加载界面 from "./util/reload.js"
//用于执行npm命令等
import { 命令行工具, npm命令行工具 } from "./util/shell.js"
export default class naive {
    constructor(options) {
        this.frontend = {}
        this.backend = {}
        this.public = {
            config: options,
            status: {
                ifDefOptions: {}
              }
        
        }
        this.doc = {}
        if (window.require) {
            require.setExternalDeps(this.public.config.backend.filesys.workspaceDir + `/conf/naiveConf/deps/node_modules`)
            require.setExternalDeps(this.public.config.backend.filesys.workspaceDir + `/conf/appearance/themes/naive/script/node_modules`)
            require.setExternalBase(this.public.config.backend.filesys.workspaceDir + `/conf/naiveConf/deps`)
        }
        this.合并设置()
        this.开始监听文件修改()
        this.加载自定义api()
        this.加载css片段()
        this.加载自定义菜单()
        this.加载自定义工具栏()
        this.加载自定义urlScheme()
        this.加载自定义块类型()
        this.加载自定义tab类型()
        this.加载自定义全局事件监听器()
    }
    合并设置(){
            if (window.siyuan) {
              this.public.status.workspaceDir = window.siyuan.config.system.workspaceDir
              this.siyuan = window.siyuan
              module.__dirname = this.public.status.workspaceDir + '/conf/appearance/themes/naive/script'
            }
            this.selfPath = this.public.status.workspaceDir + '/conf/appearance/themes/naive/script'
    }
    加载自定义api(){

    }
    加载css片段(){

    }
    加载自定义菜单(){

    }
    加载自定义工具栏(){

    }
    加载自定义urlScheme(){

    }
    加载自定义块类型(){

    }
    加载自定义tab类型(){

    }
    加载自定义全局事件监听器(){

    }
    开始监听文件修改(){
        let fs =require("fs")
        let standalone = this.standalone
        let watchFiletypes =        this.watchFiletypes =this.public.config.backend.filesys.watchFiletypes
        const option = {
            persistent: true,
            recursive: true,
        };
        this.文件监听器 = fs.watch(
          this.public.config.backend.filesys.workspaceDir+`/conf/appearance/themes/naive`, option, (type, fileName) => {
                if (!standalone && watchFiletypes && watchFiletypes.indexOf(获取文件扩展名(fileName)) >= 0) {
                    重新加载界面()
                }
            }
        )
    
    }
}