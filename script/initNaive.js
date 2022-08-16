import pathConstructor from "./server/util/pathConstructor.js";
import { 生成默认设置 } from "./public/configer.js";
import { 事件总线 } from "./public/eventBus.js";
import { kernelApiList } from "./public/kernelApi.js";
import { 加载插件 } from "./plugin/pluginLoader.js";
import { 加载所有核心插件 } from "./plugin/pluginLoader.js";
import { corePluginList } from "./plugin/pluginConfiger.js";
import { updatePluginsConfig } from "./plugin/pluginConfiger.js";
export async function initNaive() {
  let naive = window.naive;
  //从siyuan对象获取工作空间路径
  naive.workspaceDir = window.siyuan.config.system.workspaceDir;
  //从siyuan对象获取主题名称
  naive.themeName = !window.siyuan.config.appearance.mode
    ? window.siyuan.config.appearance.themeLight
    : window.siyuan.config.appearance.themeDark;
  //路径生成器
  naive.pathConstructor = new pathConstructor(
    naive.workspaceDir,
    naive.themeName
  );

  //获取用户信息
  naive.user={}
  if(window.siyuan.user){
  naive.user = window.siyuan.user;
  }
  //获取websocket
  naive.ws = window.siyuan.ws;

  //事件总线用于向插件发送事件数据
  naive.eventBus = new 事件总线();
  naive.事件总线 = new 事件总线();
  naive.kernelApi = new kernelApiList();
  naive.核心api = naive.kernelApi;
  naive.自定义块标菜单 = {};
  for (let 属性名 in console) {
    if (console.hasOwnProperty(属性名)) {
      console["force_" + 属性名] = console[属性名];
      if (!naive.ifDefOptions.defs.DEBUG) {
        console[属性名] = function(){};
      }
    }
  }

  if ( naive.ifDefOptions.defs.APP) {
    const fs = require("fs");
    let option = {}
    try {option =
      JSON.parse(
        fs.readFileSync(naive.pathConstructor.cusoptionPath(), "utf-8")
      )
    }catch(e){}
    naive.publishOption = 生成默认设置(
      option,
      naive.workspaceDir,
      naive.user.userId,
      naive.插件文件夹路径
    );
    await updatePluginsConfig();
    naive.corePluginsList = corePluginList();
    naive.pluginsConfig = JSON.parse(
      fs.readFileSync(naive.pathConstructor.pluginConfigPath(), "utf-8")
    );
    naive.ifDefOptions.verbose = naive.publishOption.develop;
  }
  //这里的代码会在服务器创建完成之后运行,ifdef这时已经启用了
  naive.eventBus.on("message", async (m) => {
    if (m.type !== "serverStart") {
      return;
    }
    console.log(window.location);
    naive.publishOption = await (
      await fetch(
        `http://${window.location.hostname}/naiveApi/getPublishOption`
      )
    ).json();
    console.log(naive.publishOption);
    naive.plugin = await (
      await import(
        `http://${naive.pathConstructor.scriptURL()}/plugin/plugin.js?condition=${JSON.stringify(
          naive.ifDefOptions
        )}`
      )
    ).主题插件;
    naive.corePluginsList = await fetch(
      `http://${naive.pathConstructor.baseURL()}/naiveApi/corePluginsList`
    );
    naive.corePluginsList = await naive.corePluginsList.json();
    await 加载所有核心插件();
    console.log(naive.router + "");
    naive.pluginsConfig = await fetch(
      `http://${naive.pathConstructor.pluginConfigURL()}`
    );
    naive.pluginsConfig = await naive.pluginsConfig.json();
    /*await import(
      `http://${naive.pathConstructor.scriptURL()}/app/appIndex.js?condition=${JSON.stringify(
        naive.ifDefOptions
      )}`
    );*/
    naive.plugins = {};
    console.log(m);
    naive.加载插件 = 加载插件;
    naive.loadPlugin = 加载插件;
    console.log(naive);
    console.log(naive.plugin.prototype);

    for (let 插件名 in naive.pluginsConfig) {
      try {
        if (naive.pluginsConfig[插件名]) {
          await naive.加载插件(插件名);
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (naive.ifDefOptions.defs.DEBUG) {
      console.force_warn(
        "当前为开发模式,改动插件代码并保存后思源界面将自动重启"
      );
      console.force_warn("当前为开发模式,增加新插件后将自动开启");
      console.force_warn(`当前为开发模式,将在控制台输出插件解析日志
    有关解析选项说明请参考naive主题的开发文档
    `);
    }
    console.force_warn(
      `非开发模式下插件代码中的console对象方法不会生效,请使用this.forceLog()或naive.plugin.forceLog()替代`
    );
  });

  if (!naive.ifDefOptions.defs.APP) {
    naive.eventBus.emit("message", { type: "serverStart" });
  }
}
