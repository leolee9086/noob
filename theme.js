const naive = {};
naive.根目录 = "/appearance/themes/naive";
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
};
//从siyuan对象加载必要的设置
if(window.siyuan){
  naive.workspaceDir = window.siyuan.config.system.workspaceDir;
  naive.siyuan =  window.siyuan
}
naive.加载js({ src: `${naive.根目录}/script/public/util/siYuanApi.js` });
naive.加载js({ src: `${naive.根目录}/script/main.js`, type: "module" });
//加载后台服务
if(window.require){
  naive.加载js({src: `${naive.根目录}/script/server/index.js`, type: "module"})
}
//加载界面脚本
naive.加载js({src: `${naive.根目录}/script/app/index.js`, type: "module"})
//判定是否在app内运行
naive.isApp=window.require?true:false