export class defaultRouter extends naive.plugin {
  constructor() {
    super({ name: "" });
    ///#ifAPP
    //这里不知道为什么不能使用router作为属性名
    this.setPluginsProp('publishRouter',naive.router)
    this.setPluginsProp('initFolder',this.initFolder)
    this.setPluginsProp('publishServer',naive.publishServer)

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

    this.publishRouter.use(
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
  ///#endif
}
