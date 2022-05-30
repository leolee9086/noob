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
naive.加载js({ src: `${naive.根目录}/script/util/siYuanApi.js` });
naive.加载js({ src: `${naive.根目录}/script/main.js`, type: "module" });
if(window.require){
  naive.加载js({src: `${naive.根目录}/script/sever/index.js`, type: "module"})
}
naive.加载js({src: `${naive.根目录}/script/app/index.js`, type: "module"})
