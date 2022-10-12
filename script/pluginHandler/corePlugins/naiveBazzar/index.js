
const {fs,fg} =naive.serverUtil
export class naiveBazzar extends naive.plugin {
  constructor() {
    super({ name: "naiveBazzar" });
    naive.bazzar = {};
    naive.bazzar.plugins = {};
    let cachePath  = naive.pathConstructor.cachePath()
    this.pluginCachePath= naive.pathConstructor.initDirp(`${cachePath}/pluginCache`)
    this.安装插件()

    this.获取集市包列表()

    this.转移已安装的插件()
  }
  安装插件(插件名){
    alert("注意,naive不保证你安装的包的安全性.")
  }
  转移已安装的插件(){
    let 模块路径 = this.pluginCachePath.replace(/\\/g,'/')+'/node_modules'
    let 文件夹列表 = fg.sync(`${模块路径}/**`,{onlyDirectories:true,deep:1,dot:true,stats:true})
    //仅仅复制插件,其他复制到deps文件夹中
    文件夹列表.forEach(
      文件夹=>{
        //如果不存在plugin.json,说明不是插件而是依赖
        if(!fs.existsSync(`${文件夹.name}/plugin.json`)){
          if(!fs.existsSync(`/conf/naiveConf/deps/node_modules/${文件夹.name}`)){
          naive.pathConstructor.initDirp(`/conf/naiveConf/deps/node_modules/${文件夹.name}`)
          fs.copySync(文件夹.path,naive.workspaceDir + `/conf/naiveConf/deps/node_modules/${文件夹.name}`)
          }
        }
        else{
          let json = fs.readJsonSync(`${文件夹}/plugin.json`)
          if(json.naiveVersion){
            if(json.naiveVersion)
            fs.copySync(文件夹.path,naive.workspaceDir + `/conf/naiveConf/plugins/${文件夹.name}`)
          }
          else{
            if(!fs.existsSync(`/conf/naiveConf/deps/node_modules/${文件夹.name}`)){
              naive.pathConstructor.initDirp(`/conf/naiveConf/deps/node_modules/${文件夹.name}`)
              fs.copySync(文件夹.path,naive.workspaceDir + `/conf/naiveConf/deps/node_modules/${文件夹.name}`)
              }    
          }
        }
        
      }
    )
  }
  async 获取集市包列表(registry){
    naive.bazzar={}
    let bazzar = naive.bazzar
    await naive.serverUtil.npmCmd('install naiveBazzar -registry=https://registry.npmmirror.com',this.initFolder())
   /* bazzar.naive插件列表 =await this.搜索npm包列表("siyuan-naivePlugin")
    bazzar.挂件列表 = await this.搜索npm包列表("siyuan-widget")
    bazzar.模板列表 = await this.搜索npm包列表('siyuan-template')
    bazzar.主题列表 = await this.搜索npm包列表('siyuan-theme')
    bazzar.css片段列表 = await this.搜索npm包列表('siyuan-css')*/
  }
  async 搜索npm包列表(搜索表达式){
    let output = await naive.serverUtil.shellCmd('npm',`search ${搜索表达式} -long -json -parseable -registry=https://registry.npmjs.org/`,naive.pathConstructor.pluginsPath())
    if(output.data){
      return JSON.parse(output.data)
    }
    else{
      return []
    }
  }
  async 卸载插件(插件名) {
    let flag = naive.ifDefOptions.defs.DEBUG ? true : false;
    naive.ifDefOptions.defs.DEBUG
      ? (naive.ifDefOptions.defs.DEBUG = false)
      : null;
    naive.watchingReload = false;
    fs.removeSync(naive.pathConstructor.pluginsPath() + `/${插件名}`);
    naive.ifDefOptions.defs.DEBUG = flag;
    naive.watchingReload = true;
  }
  async 安装插件(插件名) {
    console.log(`开始安装${插件名}`)
    naive.pathConstructor.initDirp(this.pluginCachePath)
    await naive.serverUtil.npmCmd(`install ${插件名} -registry=registry=https://registry.npmmirror.com`,this.pluginCachePath)
  }
  async 升级插件(插件名) {
    console.log(`开始升级${插件名}`)
    naive.pathConstructor.initDirp(this.pluginCachePath)
    await naive.serverUtil.npmCmd(`install ${插件名} -registry=registry=https://registry.npmmirror.com`,this.pluginCachePath)
  }
}
export const environment = ["APP"];
export const dependencies = ["siyuanPublisher"];
