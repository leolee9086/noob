export class defaultRouter extends naive.plugin {
  constructor() {
    super({ name: "defaultRouter" });
    ///#ifAPP
    //这里不知道为什么不能使用router作为属性名
    this.setPluginsProp({中文:"发布路由",en:'expressApp'},naive.expressApp)
    this.setPluginsProp({中文:"初始化文件夹",en:'initFolder'},this.initFolder)
    this.setPluginsProp({中文:"发布服务器",en:'publishServer'},naive.publishServer)
    this.setPluginsProp({中文:"初始化文件",en:'initFile'},this.initFile)
    this.setPluginsProp({中文:'初始化外部路径',en:"initDir"},this.initDir)

    this.setRouter();
    ///#endif

    ///#if!APP
    this.setPluginsProp('publishRouter',{
        use:function(){console.log(`
        仅在app环境下可以使用this.router定义路由,
        可以尝试以下代码
        ///#ifAPP
        <需要仅在APP环境加载的代码>
        ///#endif
        `
        )}
    })
    ///#endif
  }
  ///#ifAPP
  setRouter() {
    //允许访问外观设置文件夹内容

    this.expressApp.use(
      "/appearance",
      naive.express.static(`${naive.workspaceDir}/conf/appearance/`)
    );
  }
  ///#endif
  ///#ifAPP
  initFolder(){
    let pluginFoldr = naive.pathConstructor.initDirp(`${naive.pathConstructor.workspaceDir}/conf/naiveConf/pluginFolders/${this.name}`)
    console.log(pluginFoldr)
    return pluginFoldr
  }
  initFile(filePath, data){
    let FolderPath = this.initFolder()
    let path = require('path')
    let realPath =  path.join(FolderPath,filePath)
    return naive.pathConstructor.initFilep(realPath,data)
  }
  initDir(dirpath){
    let FolderPath = this.initFolder()

    let path = require('path')
    let realPath =  path.join(FolderPath,dirpath)
    return naive.pathConstructor.initDirp(realPath)
    }
  ///#endif
  
}
