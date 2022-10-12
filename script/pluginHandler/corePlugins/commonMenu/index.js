import { DOM监听器 } from "/script/public/DOMwatcher.js";

window.siyuan.menus.menu.element =new Proxy(
  window.siyuan.menus.menu.element,{
    get(target,key){
      console.log(key)

      if(target[key] instanceof Function){
        if(key == 'append'){
          return function(...args){
             console.log(...args)
             args.forEach(
              el=>{console.log(el)}
             )
             target.append(...args)
          }
        }
        return target[key].bind(target)
      }
      else{
        return target[key]
      }
    },
    set(target,key,value){
      target[key]=value
      console.log(key,value)
      return true
    }
  }
)
let 通用菜单监听器选项 = {
  监听目标: "#commonMenu",
  监听器回调: 通用菜单监听器回调,
};
new DOM监听器(通用菜单监听器选项);
function 判定通用菜单(通用菜单) {
  let readonly = 通用菜单.querySelector(
    ".b3-menu__item.b3-menu__item--readonly"
  );
  if (readonly && readonly.innerText.indexOf("创建于") >= 0) {
    naive.事件总线.emit("块标菜单显示", {
      类型: naive.当前块类型,
      id: naive.当前块id,
      菜单: 通用菜单,
    });
    return;
  }
  if (readonly && readonly.innerText.indexOf("文档词数") >= 0) {
    naive.事件总线.emit("标签页右上角菜单显示", {
      类型: "NodeDocument",
      id: naive.当前文档id,
      菜单: 通用菜单,
    });
    return;
  }
  if (!readonly && 通用菜单.querySelector('[placeholder="图片地址"]')) {
    naive.事件总线.emit("图片菜单显示", {
      类型: "image",
      id: naive.当前文档id,
      菜单: 通用菜单,
    });
    return;
  }
  if (!readonly && 通用菜单.innerText.startsWith("新建子文档")) {
    naive.事件总线.emit("文档树菜单显示", {
      类型: "NodeDocument",
      id: naive.当前文档id,
      菜单: 通用菜单,
    });
    return;
  }

  if (!readonly && naive.当前块类型 == "NodeDocument") {
    setTimeout(() => 判定通用菜单(通用菜单), 100, { once: true });
  }
}
function 注册块标菜单(option, 目标) {
  let 自定义块标菜单 = !目标 ? naive.自定义块标菜单 : 目标;
  let { 块类型, 菜单文字, 菜单图标, 回调函数, 显示判断函数,children } = option;
  自定义块标菜单[块类型] ? null : (自定义块标菜单[块类型] = {});
  自定义块标菜单[块类型][菜单文字] = {};
  自定义块标菜单[块类型][菜单文字]["回调函数"] = 回调函数;
  自定义块标菜单[块类型][菜单文字]["菜单文字"] = 菜单文字;
  自定义块标菜单[块类型][菜单文字]["菜单图标"] = 菜单图标;
  自定义块标菜单[块类型][菜单文字]["注册插件"] = this;
  自定义块标菜单[块类型][菜单文字]["显示判断函数"] = 显示判断函数;
  自定义块标菜单[块类型][菜单文字]["children"] = children;

}
function 注册图片菜单(option) {
  naive.自定义图片菜单 ? null : (naive.自定义图片菜单 = {});
  let 自定义图片菜单 = naive.自定义图片菜单;
  注册块标菜单(option, 自定义图片菜单);
}
function 注册文档右上角菜单(option) {
  naive.自定义标签页右上角菜单 ? null : (naive.自定义标签页右上角菜单 = {});
  let 自定义右上角菜单 = naive.自定义标签页右上角菜单;
  注册块标菜单(option, 自定义右上角菜单);
}
function 注册文档树菜单(option) {
  naive.自定义文档树菜单 ? null : (naive.自定义文档树菜单 = {});
  let 自定义文档树菜单 = naive.自定义文档树菜单;
  注册块标菜单(option, 自定义文档树菜单);
}
function 通用菜单监听器回调(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.target) {
      if (mutation.target.getAttribute("class") == "b3-menu") {
        naive.事件总线.emit("通用菜单显示", mutation.target);
        判定通用菜单(mutation.target);
      } else {
        naive.事件总线.emit("通用菜单隐藏", mutation.target);
        判定通用菜单(mutation.target);
      }
    }
  }
}
naive.事件总线.on("标签页右上角菜单显示", 插入自定义标签页右上角菜单项目);
function 插入自定义标签页右上角菜单项目(块标菜单数据) {
  let 自定义块标菜单 = naive.自定义标签页右上角菜单;
  let 当前块类型 = 块标菜单数据.类型;
  for (let 菜单项目 in 自定义块标菜单[当前块类型]) {
    注入菜单项目(菜单项目, 块标菜单数据, 自定义块标菜单, 当前块类型);
  }
  for (let 菜单项目1 in 自定义块标菜单.All) {
    当前块类型 = "All";
    注入菜单项目(菜单项目1, 块标菜单数据, 自定义块标菜单, 当前块类型);
  }
  if (!块标菜单数据.菜单.querySelector(".custom__separator")) {
    let menu__separator = document.createElement("button");
    menu__separator.setAttribute(
      "class",
      "b3-menu__separator custom__separator"
    );
    let readonly = 块标菜单数据.菜单.querySelector(
      ".b3-menu__item.b3-menu__item--readonly"
    );
    块标菜单数据.菜单.insertBefore(menu__separator, readonly);
  }
}
naive.事件总线.on("块标菜单显示", 插入自定义块标菜单项目);
function 插入自定义块标菜单项目(块标菜单数据) {
  let 自定义块标菜单 = naive.自定义块标菜单;
  let 当前块类型 = 块标菜单数据.类型;
  for (let 菜单项目 in 自定义块标菜单[当前块类型]) {
    注入菜单项目(菜单项目, 块标菜单数据, 自定义块标菜单, 当前块类型);
  }
  for (let 菜单项目1 in 自定义块标菜单.All) {
    当前块类型 = "All";
    注入菜单项目(菜单项目1, 块标菜单数据, 自定义块标菜单, 当前块类型);
  }
  if (!块标菜单数据.菜单.querySelector(".custom__separator")) {
    let menu__separator = document.createElement("button");
    menu__separator.setAttribute(
      "class",
      "b3-menu__separator custom__separator"
    );
    let readonly = 块标菜单数据.菜单.querySelector(
      ".b3-menu__item.b3-menu__item--readonly"
    );
    块标菜单数据.菜单.insertBefore(menu__separator, readonly);
  }
}
naive.事件总线.on("图片菜单显示", 插入自定义图片菜单项目);
function 插入自定义图片菜单项目(块标菜单数据) {
  let 自定义块标菜单 = naive.自定义图片菜单;
  let 当前块类型 = 块标菜单数据.类型;
  for (let 菜单项目 in 自定义块标菜单[当前块类型]) {
    注入菜单项目(菜单项目, 块标菜单数据, 自定义块标菜单, 当前块类型);
  }
  for (let 菜单项目1 in 自定义块标菜单.All) {
    当前块类型 = "All";
    注入菜单项目(菜单项目1, 块标菜单数据, 自定义块标菜单, 当前块类型);
  }
  if (!块标菜单数据.菜单.querySelector(".custom__separator")) {
    let menu__separator = document.createElement("button");
    menu__separator.setAttribute(
      "class",
      "b3-menu__separator custom__separator"
    );
    let readonly = 块标菜单数据.菜单.querySelector(
      ".b3-menu__item.b3-menu__item--readonly"
    );
    块标菜单数据.菜单.insertBefore(menu__separator, readonly);
  }
}
naive.事件总线.on("文档树菜单显示", 插入自定义文档树菜单项目);
function 插入自定义文档树菜单项目(块标菜单数据) {
  let 自定义块标菜单 = naive.自定义文档树菜单;
  let 当前块类型 = 块标菜单数据.类型;
  for (let 菜单项目 in 自定义块标菜单[当前块类型]) {
    注入菜单项目(菜单项目, 块标菜单数据, 自定义块标菜单, 当前块类型);
  }
  for (let 菜单项目1 in 自定义块标菜单.All) {
    当前块类型 = "All";
    注入菜单项目(菜单项目1, 块标菜单数据, 自定义块标菜单, 当前块类型);
  }
  if (!块标菜单数据.菜单.querySelector(".custom__separator")) {
    let menu__separator = document.createElement("button");
    menu__separator.setAttribute(
      "class",
      "b3-menu__separator custom__separator"
    );
    let readonly = 块标菜单数据.菜单.querySelector(
      ".b3-menu__item.b3-menu__item--readonly"
    );
    块标菜单数据.菜单.insertBefore(menu__separator, readonly);
  }
}
function 元素转字符串(元素) {
  let div = document.createElement("div");
  div.appendChild(元素);
  return div.innerHTML;
}
function 注入菜单项目(菜单项目, 块标菜单数据, 自定义块标菜单, 当前块类型) {
  ///#ifDEBUG
  console.log("test");
  ///#endif

  let readonly = 块标菜单数据.菜单.querySelector(
    ".b3-menu__item.b3-menu__item--readonly"
  );
  let item = 生成列表菜单项目(自定义块标菜单[当前块类型][菜单项目]);
  let flag =
    块标菜单数据.菜单.innerHTML.indexOf(item.innerHTML) >= 0 ? false : true;
  if (自定义块标菜单[当前块类型][菜单项目]["显示判断函数"]) {
    flag =
      flag &&
      自定义块标菜单[当前块类型][菜单项目]["显示判断函数"].bind(
        自定义块标菜单[当前块类型][菜单项目]["注册插件"]
      )();
  }
  if (
    块标菜单数据.菜单.innerHTML &&
    块标菜单数据.菜单.innerHTML.indexOf(
      元素转字符串(生成列表菜单项目(自定义块标菜单[当前块类型][菜单项目]))
    ) !==-1
  ) {
   
    return;
  }
  if (flag && item) {
    if (readonly) {
      块标菜单数据.菜单.insertBefore(
        生成列表菜单项目(自定义块标菜单[当前块类型][菜单项目]),
        readonly
      );
    } else {
      块标菜单数据.菜单.appendChild(
        生成列表菜单项目(自定义块标菜单[当前块类型][菜单项目])
      );
    }
  }
}
const 生成列表菜单项目 = function (菜单项目) {
  if(菜单项目['渲染函数']){
    return (菜单项目['渲染函数'])()
  }
  let button = document.createElement("button");

  if(!菜单项目.children){
  button.className = "b3-menu__item diy";
  button.onclick = () =>
  菜单项目.回调函数.call(菜单项目.注册插件, naive.当前块id);
  button.setAttribute("data-node-id", naive.当前块id);
  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="${菜单项目.菜单图标}"></use></svg><span class="b3-menu__label">${菜单项目.菜单文字}</span>`;
  }
  if(菜单项目.children){
    button.className = "b3-menu__item diy";
    button.setAttribute("data-node-id", naive.当前块id);

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="${菜单项目.菜单图标}"></use></svg><span class="b3-menu__label">${菜单项目.菜单文字}</span>`;

    button.innerHTML+=`<svg class="b3-menu__icon b3-menu__icon--arrow"><use xlink:href="#iconRight"></use></svg>`
    let div = document.createElement('div')
    div.className="b3-menu__submenu"
    菜单项目.children.forEach(element => {
      let sub =生成列表菜单项目(element)
      if(element['渲染函数']){
        sub =  (element['渲染函数'])()
      }

      sub.onclick = () =>{
        element.回调函数.call(菜单项目.注册插件,naive.当前块id)
      }
      div.appendChild(sub)
      
    });
    button.appendChild(div)
    
  }
  return button;
};
export class commonMenu extends naive.plugin {
  constructor() {
    super({ name: "commonMenu" });
    naive.自定义图片菜单 = {};
    naive.自定义块标菜单 = {};
    naive.自定义标签页右上角菜单 = {};
    this.设置插件接口({中文:"注册块标菜单"}, 注册块标菜单);
    this.设置插件接口({中文:"注册文档右上角菜单"}, 注册文档右上角菜单);
    this.设置插件接口({中文:"注册图片菜单"}, 注册图片菜单);
    this.设置插件接口({中文:"注册文档树菜单"}, 注册文档树菜单);
  }
}
