const 主题 = {};
主题.根目录 = "/appearance/themes/naive";
//来自dark+主题
主题.加载程序 = function (
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
const naive= {
  竖线菜单设置:[]
}
主题.加载程序({ src: `${主题.根目录}/script/util/siYuanApi.js` });
主题.加载程序({ src: `${主题.根目录}/script/main.js`, type: "module" });

