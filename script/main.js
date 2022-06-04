//判定是否在app内运行
import {生成默认设置} from "./public/configer.js"
import { 事件总线 } from "./public/eventBus.js";
import { kernalApiList } from "./public/kernalApi.js";
naive.util={}
naive.子窗口 = {}
naive.当前块元素数组=[]
naive.事件总线 = new 事件总线();
naive.eventBus = naive.事件总线;

naive.isApp=window.require?true:false
naive.加载插件=async function(插件名,环境){
  try {
    let manifest = await fetch(
      `/appearance/themes/naive/plugins/${插件名}/manifest.json`
    );
    let menifestJSON = await manifest.json();
    if (menifestJSON && menifestJSON.environment.indexOf(环境)>=0) {
      let indexjs = await fetch(
        `/appearance/themes/naive/plugins/${插件名}/index.js`
      );
      let text = await indexjs.text();
      try {
        let pluginclass = window.Function('return '+text)();
        console.log(pluginclass);
        naive.plugins[插件名] = new pluginclass({ name: 插件名 });
        console.log("加载插件", 插件名);
      } catch (e) {
        console.log("加载插件", 插件名, "失败", e);
      }
    } else {
      console.log("加载插件", 插件名, "失败", `非${环境}环境插件`);
    }
  } catch (e) {
    console.log("加载插件", 插件名, "失败", e);
  }
}

naive.加载js({src: `${naive.根目录}/script/app/appIndex.js`, type: "module"})
naive.设置 = 生成默认设置({},naive.workspaceDir,"")
naive.kernalApi=new kernalApiList()
naive.核心api = naive.kernalApi
let version = await naive.核心api.获取软件版本({})
console.log(version)
console.log(naive.newApi)

console.log(naive)
if(naive.isApp){
  //加载后台服务
  naive.加载js({src: `${naive.根目录}/script/server/severIndex.js`, type: "module"})
}
naive.util.获取json =async function(路径){
  let json= {}
  if(window.require){
     naive.fs = require('fs')
     try{
     json = JSON.parse(naive.fs.readFileSync(路径, "utf-8"));}
     catch(e){
       console.log("获取文件失败",e)
     }
  }
  else{
    let res = await fetch(路径)
    json = await res.json()
  }
}
console.log(await naive.util.获取json('/'))