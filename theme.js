//这个文件只是用来加载各种功能
//theme.js中无法使用import,为了在浏览器运行也没有办法使用require,所以这里只能用其他方式来加载js
//import函数可以在module以外使用,因此可以用在此处用于加载各种脚本
import('./script/naive.js').then(
  module=>{
    const naive = new module.default("naive")
    window.naive= naive
    initNaive(naive)
  }
)
function initNaive(naive){
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
naive.加载模块("./script/main.js", "test",true);
//加载界面脚本
naive.加载js({ src: `${naive.根目录}/script/main.js`, type: "module" });
}