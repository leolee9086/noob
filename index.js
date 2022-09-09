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
naive.ifDefOptions.defs.DEBUG= true,


naive.ifdefParser = new ifdefParser(naive.ifDefOptions);
await initNaive();
console.log(naive.workspaceDir+'')
if (naive.ifDefOptions.defs.APP) {
  //这里只利用了import函数的副作用
  await import("./script/server/severIndex.js");
}

