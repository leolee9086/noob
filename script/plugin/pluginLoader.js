//加载插件配置在服务器环境下运行
export function 监听插件(插件名) {
  let 插件主文件 = `${naive.workspaceDir}/data/${naive.插件文件夹url}/${插件名}`;
  naive.serverUtil.fs.watch(插件主文件, { recursive: true }, (event, filname) =>
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




export async function 加载所有客户插件(){
  naive.pluginsConfig = await fetch(
    `http://${naive.pathConstructor.pluginConfigURL()}`
  );
  naive.pluginsConfig = await naive.pluginsConfig.json();
  naive.plugins = {};

  for (let 插件名 in naive.pluginsConfig) {
    console.error(插件名)
    if(!插件名){
      return
    }
    try {
      if (naive.pluginsConfig[插件名]) {
        await 加载插件(插件名);
      }
    } catch (e) {
      console.error(e);
    }
  }

}
export async function 加载插件(插件名){
  console.error(插件名)
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
        }catch(e){
          console.error(e)
        }
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
  naive.corePluginsList = await fetch(
    `http://${naive.pathConstructor.baseURL()}/naiveApi/corePluginsList`
  );
  naive.corePluginsList = await naive.corePluginsList.json();
  console.log("核心插件列表",naive.corePluginsList)
  for await (let 插件名 of naive.corePluginsList) {
    await 加载核心插件(插件名)
  }
}
async function 加载核心插件(插件名) {
  if (naive.corePlugins&&naive.corePlugins[插件名]){
    console.log(`核心插件${插件名}已加载,跳过当前加载`)
    return
  }

  console.log("开始加载核心插件",插件名)
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
  console.log(`加载核心插件${插件名}错误:${e}`)
  
  }
}
