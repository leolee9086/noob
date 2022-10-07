//这个文件只是用来加载各种功能
//theme.js中无法使用import,为了在浏览器运行也没有办法使用require,所以这里只能用其他方式来加载js
//import函数可以在module以外使用,因此可以用在此处用于加载各种脚本
//使用立即执行函数避免污染全局对象
//async是为了能够在函数中使用await
//只有下面这段代码是必须的


if (window.frameElement) {
  let style = document.createElement('style')
  style.innerHTML = `.toolbar{
      display:none !important
  }`
  document.head.appendChild(style)
}
(async function () {
  this.naivePath = '../naive/script/index.js'
  let meta = document.createElement("meta")
  meta.setAttribute('name', 'referrer')
  meta.setAttribute('content', 'never')
  document.head.appendChild(meta)
  let defaultConfigPath = `${window.siyuan.config.system.workspaceDir}/conf/naiveConf/config/naiveConfig.js`
  let options
  //初始化用户配置文件
  if(window.require){
    let fs = require("fs")
    if (fs.existsSync(defaultConfigPath)){
      options= (await import (`${window.siyuan.config.system.workspaceDir}/conf/naiveConf/config/naiveConfig.js`)).default()
    }
  }
  //获取用户配置文件
/*{
    frontend:{
      theme:"ZHANG-Light",
      cssSnippets:""
    },
    backend:{
      filesys:{
        workspaceDir:window.siyuan.config.system.workspaceDir,
        confDir:window.siyuan.config.system.workspaceDir+'/conf/naiveConf',
        watchFiletypes:['js']
      },
      server:{
        port:"80",
        location:"127.0.0.1"
      }
    },
    plugin:{},
    log:{},
    doc:{},
    publish:{}
  }*/

  //加载naive
  import(this.naivePath).then(
    module => {
      let naive = module.default
      window.naive = new naive(options)
      console.log(window.naive)
    }
  ).catch(e => {
    console.error(e)
  })
})()

