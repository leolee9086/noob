import 插件文件夹 from '../util/constants.js'
import 工作空间文件转url from '../util/url.js'
//加载插件配置在服务器环境下运行
export function 监听插件(插件名) {
if(window.require){
  let 插件主文件 = `${naive.workspaceDir}/data/${naive.插件文件夹url}/${插件名}`;
  require(fs).watch(插件主文件, { recursive: true }, (event, filname) =>
    重载插件(event, filname, 插件名)
  );
}
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
      await 加载插件(插件名);
    } else {
      for (let 环境名 of 插件环境配置) {
        await 加载插件(插件名);
      }
    }
  }
}
export async function 加载所有客户插件() {
  naive.pluginsConfig = await fetch(
    `http://${naive.设置.发布地址}:${naive.设置.发布端口}/naiveApi/plugin/getConfig`
  );
  naive.pluginsConfig = await naive.pluginsConfig.json();
  naive.plugins = {};
  for (let 插件名 in naive.pluginsConfig) {
    if (!插件名) {
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
export async function 加载插件(插件名) {
  console.log(`开始加载插件${插件名}`)
  let options = JSON.parse(JSON.stringify(naive.ifDefOptions))
  options.verbose = false
  options.defs = JSON.parse(JSON.stringify(naive.ifDefOptions.defs))
  try {
    let { condition } = await import(
      `http://${naive.设置.发布地址}:${naive.设置.发布端口}/plugins/${插件名}/index.js
      `
    );
    let pluginclass
    let defs = options.defs
    if (condition) {
      for (let name in options.defs) {
        condition[name] = defs[name] !== undefined ? defs[name] : condition[name]
        options.defs = condition
        options.verbose = naive.ifDefOptions.verbose
      }
    }
    pluginclass = await import(
      `http://${naive.设置.发布地址}:${naive.设置.发布端口}/plugins/${插件名}/index.js?condition=${JSON.stringify(
        options
      )}`
    );


    if (pluginclass.environments && pluginclass.environments instanceof Array) {
      let flag = false
      pluginclass.environments.forEach(en => {
        naive.ifDefOptions.defs[en] ? flag = true : null

      });
      if (!flag) {
        return
      }
    }
    if (pluginclass.dependencies && pluginclass.dependencies instanceof Array) {
      for await (let 依赖插件名 of pluginclass.dependencies) {
        try {
          await 加载核心插件(依赖插件名);
          await 加载插件(依赖插件名);
        } catch (e) {
          console.error(`插件${依赖插件名}加载依赖插件失败:${e}`)
        }
      }
    }
    naive.plugins ? null : (naive.plugins = {});
    !naive.plugins[插件名]
      ? (naive.plugins[插件名] = new pluginclass[插件名]({ name: 插件名 }))
      : null;
    pluginclass.dependencies ? naive.plugins[插件名].dependencies = pluginclass.dependencies : null
    if(window.require){
      let filePath = `${naive.pathConstructor.naivePath()}/script/plugin/corePlugins/${插件名}/backend/index.js`
      if(naive.serverUtil.fs.existsSync(filePath)){
        naive.plugins[插件名].backend = require(filePath)
      }
      
    }
    console.log(`加载插件${插件名}成功`)
  } catch (e) {
    throw new Error(`加载插件${插件名}失败:${e}`)
  }
}







export async function 加载所有核心插件() {
  naive.corePluginsList = await fetch(
    `http://${naive.设置.发布地址}:${naive.设置.发布端口}/naiveApi/plugin/corePluginsList`
  );
  naive.corePluginsList = await naive.corePluginsList.json();
  console.log("核心插件列表", naive.corePluginsList)
  for await (let 插件名 of naive.corePluginsList) {
    await 加载核心插件(插件名)
  }
}
async function 加载核心插件(插件名) {
  if (naive.corePlugins && naive.corePlugins[插件名]) {
    console.log(`核心插件${插件名}已加载,跳过当前加载`)
    return
  }

  console.log("开始加载核心插件", 插件名)
  try {
    let pluginclass = await import(
      `http://${naive.设置.发布地址}:${naive.设置.发布端口}/script/plugin/coreplugins/${插件名}/index.js?condition=${JSON.stringify(
        naive.ifDefOptions
      )}`
    )
    if (pluginclass.environments && pluginclass.environments instanceof Array) {
      let flag = false
      pluginclass.environments.forEach(en => {
        naive.ifDefOptions.defs[en] ? flag = true : null

      });
      if (!flag) {
        console.log(`跳过核心插件${插件名}加载`)
        return
      }
    }

    if (pluginclass.dependencies && pluginclass.dependencies instanceof Array) {
      for await (let 依赖插件名 of pluginclass.dependencies) {
        console.log(依赖插件名)
        try { await 加载核心插件(依赖插件名); } catch (e) {
          console.error(`核心插件${插件名}加载依赖插件失败:${e}`)
        }
      }
    }
    naive.corePlugins ? null : (naive.corePlugins = {});
    !naive.corePlugins[插件名]
      ? (naive.corePlugins[插件名] = new pluginclass[插件名]({ name: 插件名 }))
      : null;
    pluginclass.dependencies ? naive.corePlugins[插件名].dependencies = pluginclass.dependencies : null
    if(window.require){
      let filePath = `${naive.pathConstructor.naivePath()}/script/plugin/corePlugins/${插件名}/backend/index.js`
      if(naive.serverUtil.fs.existsSync(filePath)){
        naive.corePlugins[插件名].backend = require(filePath)
      }
    }

  } catch (e) {
    throw new Error(`加载核心插件${插件名}失败:${e}`)
  }
}
Footer
© 2023 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
noob/pluginLoader.js at 4a9e75a8b1ed3d9fc229e2ba25376fed8c914027 · leolee9086/noob