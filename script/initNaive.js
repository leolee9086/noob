import pathConstructor from "./server/util/pathConstructor.js";
import { 生成默认设置 } from "./public/configer.js";
import { 事件总线 } from "./public/eventBus.js";
import { kernelApiList } from "./public/kernelApi.js";
//插件机制，集中到一个入口文件里面去
//除了util不允许跨模块引用
import { 加载插件 } from "./plugin/index.js";
import { corePluginList } from "./plugin/pluginConfiger.js";
import { updatePluginsConfig } from "./plugin/pluginConfiger.js";
let fn = window.fetch
window.fetch =async function(...args){
  console.log(...args)
  let path = args[0]
  let data = args[1]
  console.log(path,data)
  let res = await fn(...args)
  console.log(res)
  return res
}
export async function initNaive() {
  let naive = window.naive;
  naive.pathConstructor = new pathConstructor(
    naive.workspaceDir,
    naive.themeName
  );
  naive.doc = {
    usage: {
      type: "file",
      path: "../../readme"

    },
    api: {},
    method: {},
    config: {},
    plugins: {}
  }
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
        console[属性名] = function () { };
      }
    }
  }
  //用于设置各级api鉴权
  naive.syAuthConfig = {
    api: {
      insertBlock: {
        access: { user_group: 'admin' },
      },
      transactions: {
        access: { user_group: 'admin' },
      },
      prependBlock: { user_group: 'admin' },
      appendBlock: { user_group: 'admin' },
      updateBlock: { user_group: 'admin' },
      deleteBlock: { user_group: 'admin' },
      setBlockReminder: { user_group: 'admin' },
      setBlockAttrs: {
        access: { user_group: 'admin' },
      },
      upload: { user_group: 'admin' }
    }
  }
  //app环境下直接读取配置文件
  if (naive.ifDefOptions.defs.APP) {


    const fs = require("fs");
    let option = {}
    try {
      option =
        JSON.parse(
          fs.readFileSync(naive.pathConstructor.cusoptionPath(), "utf-8")
        )
    } catch (e) { }
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
  //仅仅在桌面端加载服务端代码
  if (naive.ifDefOptions.defs.APP) {
    await import("./server/severIndex.js");
  }
  //这里的代码会在服务器创建完成之后运行,ifdef这时已经启用了,因此后面可以从这里开始加载插件
  naive.eventBus.on("message", async (m) => {
    if (m.type !== "serverStart") {
      return;
    }
    //这里为了防止设置出错时无法通过naiveApi获取配置，使用了思源自身的api来获取文件
    naive.publishOption = await naive.核心api.getFile.raw({ path: 'conf/naiveConf/config/publish.json' }, '')
    naive.设置 = new Proxy(naive.publishOption, {})
    //校验发布地址是否有效
    //加载插件
    await 加载插件()
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
