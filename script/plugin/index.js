import {加载所有客户插件,加载所有核心插件} from "./pluginLoader.js"
export async function 加载插件(){
    naive.plugin = await (
        await import(
          `http://${naive.设置.发布地址}:${naive.设置.发布端口}/script/plugin/plugin.js?condition=${JSON.stringify(
            naive.ifDefOptions
          )}`
        )
      ).主题插件;
      await 加载所有核心插件();
      await 加载所有客户插件()
  
}