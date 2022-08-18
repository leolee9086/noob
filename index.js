//路径生成器
//条件加载器
import ifdefParser from "./script/public/util/ifdef/index.js";
import {initNaive} from "./script/initNaive.js";

//创建naive对象
window.naive = {};
let naive = window.naive;

//初始化naive对象
//条件加载器
naive.ifDefOptions = {
  defs:{
    BROWSER: window.require ? false : true,
    APP: window.require ? true : false,
    PUBLISH: !window.siyuan,
    MOBILE: !window.siyuan.mobileEditor ? false : true,
    DEBUG: true,
  },
  verbose: true,
  tripleSlash: true,
  fillWithBlanks: true,
  uncommentPrefixString: "",
};
//判定环境
naive.ifDefOptions.defs.BROWSER=window.require ? false : true,
naive.ifDefOptions.defs.APP=window.require ? true : false,
naive.ifDefOptions.defs.PUBLISH=!window.siyuan,
naive.ifDefOptions.defs.MOBILE=!window.siyuan.mobileEditor ? false : true,
naive.ifDefOptions.defs.DEBUG= false,


naive.ifdefParser = new ifdefParser(naive.ifDefOptions);
await initNaive();
console.log(naive.workspaceDir+'')
if (naive.ifDefOptions.defs.APP) {
  //这里只利用了import函数的副作用
  await import("./script/server/severIndex.js");
}

/*
//中文版
const 思源工作空间路径 = workspaceDir;
const 主题根目录思源URL = `/appearance/themes/${themeName}/`;
const cusoption = await (await fetch(naiveConstans.cusoptionpath())).json();
const { 生成默认设置 } = await import(
  `${workspaceDir}/conf/appearance/themes/${themeName}/naive/script/public/configer.js`
);

console.log(生成默认设置(cusoption));
await import("./script/naive.js").then((module) => {
  const naive = new module.default("naive", workspaceDir);
  window.naive = naive;
  initNaive(naive);
});
naive.parserOptions = options;
naive.ifdefParser = ifdefParser;
naive.scriptParser = new ifdefParser(options);
function initNaive(naive) {
  //默认加载模块时会在控制台打印
  //加载到DOM中的js,放到这里是为了路径绑定简单
  naive.加载js = function (
    option = { src, type: "module", async: false, defer: false }
  ) {
    let { src, type, async, defer } = option;
    let script = document.createElement("script");
    if (type) script.setAttribute("type", type);
    if (async) script.setAttribute("async", true);
    if (defer) script.setAttribute("defer", true);
    script.setAttribute("src", src);
    document.head.appendChild(script);
    return script;
  };
  //加载到DOM中的css
  naive.加载css = function (src = "daylight", sort = 1) {
    let link = document.createElement("link");
    link.setAttribute("href", src);
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("class", "naiveStyle");
    link.setAttribute("sort", sort || 1);
    document.head.appendChild(link);
    return link;
  };
  //加载模块函数中如果第三个函数为真则相对主题文件夹加载
  //否则相对naive.js的位置加载
  //如果有第四个base参数则相对base加载
  //naive.加载模块("./script/main.js", "test",true);
  //加载界面脚本
  const cusoptionpath = `${naive.workspaceDir}/${naive.插件文件夹路径}/publish.json`;
  let cusoption = JSON.parse(fs.readFileSync(cusoptionpath, "utf-8"));
  let realoption = naive.生成默认设置(
    cusoption,
    naive.workspaceDir,
    "",
    naive.插件文件夹路径
  );
  naive.设置 = realoption;
  naive.加载js({ src: `${naive.根目录}/script/main.js`, type: "module" });
}
*/
