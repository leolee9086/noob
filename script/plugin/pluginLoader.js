//加载插件配置在服务器环境下运行
import { 驼峰转换 } from "../public/util/name.js";
export function 监听插件(插件名) {
  let 插件主文件 = `${naive.workspaceDir}/data/${naive.插件文件夹url}/${插件名}`;
  naive.fs.watch(插件主文件, { recursive: true }, (event, filname) =>
    重载插件(event, filname, 插件名)
  );
}
export async function 重载插件(event, 文件名, 插件名) {
  console.log(插件名);
  if (文件名 == "index.js") {
    let manifest = await fetch(
      `${naive.pathConstructor.pluginsURL()}/${插件名}/plugin.json`
    );
    let menifestJSON = await manifest.json();
    let 插件环境配置 = menifestJSON.environment;
    if (插件环境配置 == "publish") {
      await 加载插件(插件名, 插件环境配置);
    } else {
      for (let 环境名 of 插件环境配置) {
        await 加载插件(插件名, 环境名);
      }
    }
  }
}
/*export async function 加载插件(插件名, 环境) {
  console.log(插件名)
  try {
    let manifest = await fetch(
      `http://${naive.pathConstructor.pluginsURL()}/${插件名}/plugin.json`
    );
    let menifestJSON = await manifest.json();
    if (
      menifestJSON &&
      menifestJSON.environment.indexOf(环境) >= 0 &&
      环境 !== "publish" &&
      环境 !== "CustomBlock"
    ) {
      try {
        let pluginclass = await import(
          `http://${naive.publishOption.发布地址}:${naive.publishOption.发布端口}/plugins/${插件名}/index.js`
        );
        console.log(pluginclass);
        naive.plugins[插件名] = new pluginclass[插件名]({ name: 插件名 });
        if (naive.plugins[插件名].environment) {
          naive.plugins[插件名].environment[环境] = true;
        } else {
          naive.plugins[插件名].environment = {};
          naive.plugins[插件名].environment[环境] = true;
        }
      } catch (e) {
        console.error("加载插件", 插件名, "失败", e);
      }
    }
    if (
      menifestJSON &&
      menifestJSON.environment.indexOf(环境) >= 0 &&
      环境 == "publish"
    ) {
      let res = await fetch(
        `http://${naive.publishOption.发布地址}:${naive.publishOption.发布端口}/plugins/${插件名}/index.js`
      );
      naive.publishPlugins[插件名] = await res.text();
      console.log(naive.publishPlugins[插件名]);
    }
    if (
      menifestJSON &&
      menifestJSON.environment == "CustomBlock" &&
      环境 == "CustomBlock"
    ) {
      let pluginclass = await import(
        `http://${naive.publishOption.发布地址}:${naive.publishOption.发布端口}/plugins/${插件名}/index.js`
      );
      customElements.define(驼峰转换(插件名), pluginclass[插件名]);
      naive.customHTML[驼峰转换(插件名)] = pluginclass[插件名];
      console.log("定义自定义HTML", 驼峰转换(插件名));
    }
  } catch (e) {
    console.error("加载插件", 插件名, "失败", e);
  }
}*/
export async function 加载插件(插件名){
  let options=JSON.parse(JSON.stringify(naive.ifDefOptions))
  options.verbose= false
  options.defs=JSON.parse(JSON.stringify(naive.ifDefOptions.defs))
  try{
    let {condition} = await import(
      `http://${naive.pathConstructor.pluginsURL()}/${插件名}/index.js
      `
    );
    let pluginclass
    let defs =options.defs

    if (condition){
       for(let name in options.defs){
        condition[name]= defs[name]!==undefined?defs[name]:condition[name]
        options.defs =condition
        options.verbose= naive.ifDefOptions.verbose
      }

       pluginclass = await import(
        `http://${naive.pathConstructor.pluginsURL()}/${插件名}/index.js?condition=${JSON.stringify(
          options
        )}`
      );
    }
    else{
       pluginclass = await import(
        `http://${naive.pathConstructor.pluginsURL()}/${插件名}/index.js?condition=${JSON.stringify(
          options
        )}`
      );
    }

    if(pluginclass.environments&&pluginclass.environments instanceof Array){
      let flag = false
      pluginclass.environments.forEach(en => {
        naive.ifDefOptions.defs[en]?flag= true:null
  
      });
      if(!flag){
        return
      }
    }
    if (pluginclass.dependencies&&pluginclass.dependencies instanceof Array) {
        for await( let 插件名 of pluginclass.dependencies) {
        try{
        await 加载核心插件(插件名);
        await 加载插件(插件名);
        }catch(e){}
      }
    }
    naive.plugins ? null : (naive.plugins = {});
    !naive.plugins[插件名]
      ? (naive.plugins[插件名] = new pluginclass[插件名]({ name: 插件名 }))
      : null;
      pluginclass.dependencies?naive.plugins[插件名].dependencies=pluginclass.dependencies:null
    console.log(`加载插件${插件名}成功`)
      }catch(e){
        console.error(`加载插件${插件名}失败:`, e);
      }
}
export async function 加载所有核心插件() {
  for await (let 插件名 of naive.corePluginsList) {
    await 加载核心插件(插件名)
  }
}
async function 加载核心插件(插件名) {
  try{
  let pluginclass = await import(
    `http://${naive.pathConstructor.corePluginsURL()}/${插件名}/index.js?condition=${JSON.stringify(
      naive.ifDefOptions
    )}`
  )
  if(pluginclass.environments&&pluginclass.environments instanceof Array){
    let flag = false
    pluginclass.environments.forEach(en => {
      naive.ifDefOptions.defs[en]?flag= true:null

    });
    if(!flag){
      console.log(`跳过核心插件${插件名}加载`)
      return
    }
  }
  if (pluginclass.dependencies&&pluginclass.dependencies instanceof Array) {
      for await( let 依赖插件名 of pluginclass.dependencies) {
      console.log(依赖插件名)
      await 加载核心插件(依赖插件名);
    }
  }
  naive.corePlugins ? null : (naive.corePlugins = {});
  !naive.corePlugins[插件名]
    ? (naive.corePlugins[插件名] = new pluginclass[插件名]({ name: 插件名 }))
    : null;
    pluginclass.dependencies?naive.corePlugins[插件名].dependencies=pluginclass.dependencies:null
    }catch(e){
      console.error(`加载核心插件${插件名}失败:`, e);
    }
}
/* try {
   let manifest = await fetch(
      `${this.核心插件文件夹url}/${插件名}/plugin.json`
    );
    let menifestJSON = await manifest.json();
    if (menifestJSON && menifestJSON.environment.indexOf(环境) >= 0) {
      try {
        let pluginclass = await import(
          `${this.核心插件文件夹url}/${插件名}/index.js`
        );
        this.corePlugins[插件名] = new pluginclass[插件名]({ name: 插件名 });
      } catch (e) {
        console.error("加载核心插件", 插件名, "失败", e);
      }
    } else {
      console.error("加载核心插件", 插件名, "失败", `非${环境}环境插件`);
    }
  } catch (e) {
    console.error("加载核心插件", 插件名, "失败", e);
  }
}
export async function 加载笔记内插件(){
  let stmt = `select * from blocks where id in (select block_id  from attributes where name='custom-plugin') and type ='d'`
  let docs = await naive.核心API.sql({stmt:stmt},"")
  docs.forEach(
    doc=>{

    }
  )*/
