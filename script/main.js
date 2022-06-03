//判定是否在app内运行
import {生成默认设置} from "./public/configer.js"
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
console.log(naive)
if(naive.isApp){
  //加载后台服务
  naive.加载js({src: `${naive.根目录}/script/server/severIndex.js`, type: "module"})
}
