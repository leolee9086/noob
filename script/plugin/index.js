import {加载所有客户插件,加载所有核心插件} from "./pluginLoader.js"
export async function 加载插件(){
    naive.plugin = await (
        await import(
          `http://${naive.pathConstructor.scriptURL()}/plugin/plugin.js?condition=${JSON.stringify(
            naive.ifDefOptions
          )}`
        )
      ).主题插件;
      await 加载所有核心插件();
      await 加载所有客户插件()
  
}