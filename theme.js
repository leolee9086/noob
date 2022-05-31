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
naive.加载css = function (
  src = "daylight",sort = 1
) {
  let link = document.createElement("link");
  link.setAttribute("href", src);
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("class", "naiveStyle");
  link.setAttribute("sort", sort||1);
  document.head.appendChild(link);
};

//从siyuan对象加载必要的设置
if(window.siyuan){
  naive.workspaceDir = window.siyuan.config.system.workspaceDir;
  naive.siyuan =  window.siyuan
}

//加载界面脚本
naive.加载js({src: `${naive.根目录}/script/main.js`, type: "module"})
