//这个文件只是用来加载各种功能
//theme.js中无法使用import,为了在浏览器运行也没有办法使用require,所以这里只能用其他方式来加载js
//import函数可以在module以外使用,因此可以用在此处用于加载各种脚本
import("./script/naive.js").then((module) => {
  const naive = new module.default("naive");
  window.naive = naive;
  initNaive(naive);
});
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
  naive.加载js({ src: `${naive.根目录}/script/main.js`, type: "module" });
}
Proxy = new Proxy(Proxy, {
  //拦截 new 操作符，生成 Proxy 实例的时候来拦截
  construct: function (target, argumentsList) {
    //result是new Proxy()生成的原本的实例
    const result = new target(...argumentsList);
    //获取原本实例reslut的类型
    const originToStringTag = Object.prototype.toString.call(result).slice(1,-1).split(' ')[1]
    //改写result的[Symbol.toStringTag]属性，加上被代理的标志
    result[Symbol.toStringTag] = 'Proxy-' + originToStringTag;
    return result;
  },
});
/*
let proxydefine = {
  get(target, property) {

    return target[property];
  },
  set(target, property,value) {
    if(typeof value =='object')
    { target[property]=new Proxy(value,proxydefine)}
     return true
  },
}
let syproxy = new Proxy(window.siyuan, proxydefine);
let proxystack=new WeakMap()
function 深度代理(object){

  for(属性名 in object){
    if(typeof object[属性名] =='object'&&!proxystack.get([object[属性名]])){
      object[属性名]=new Proxy( object[属性名],proxydefine)
      proxystack.set([object[属性名]],true)
      深度代理(object[属性名])
    }
  }
  return object
}
let obj = {a:{}}
obj.a=obj
window.obj =深度代理(obj)*/