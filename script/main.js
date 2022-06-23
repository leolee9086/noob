//判定是否在app内运行
//插件相关
//API相关

//配置相关

if(naive.isApp){
  //加载后台服务
  naive.加载js({src: `${naive.根目录}/script/server/severIndex.js`, type: "module"})
}
naive.加载js({src: `${naive.根目录}/script/app/appIndex.js`, type: "module"})
