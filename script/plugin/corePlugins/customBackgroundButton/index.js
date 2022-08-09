import { DOM监听器 } from "/script/public/DOMwatcher.js";
let 头图按钮监听器选项 = {
  监听目标: ".protyle-background__img",
  监听器回调: 头图按钮监听器回调,
};
function 头图按钮监听器回调(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.target) {
    }
  }
}
naive.头图按钮监听器 = new DOM监听器(头图按钮监听器选项);

function 插入头图按钮(头图元素, 按钮项目) {
  let 头图按钮组 = 头图元素.querySelector(".protyle-icons");
  let span = 头图按钮组.querySelector(
    `[data-type = 'custom-${按钮项目.type || 按钮项目.类型}']`
  );
  if (span) {
    return;
  } else {
    span = document.createElement("span");
    span.setAttribute("class", "protyle-icon b3-tooltips b3-tooltips__sw ");
    span.setAttribute("data-type", `custom-${按钮项目.type || 按钮项目.类型}`);
    span.setAttribute("aria-label", 按钮项目.label);
    span.setAttribute("style", "relative");
    span.addEventListener("click", 按钮项目.回调函数);
    span.innerHTML = `<svg><use xlink:href="${按钮项目.图标}"></use></svg>`;
    let 随机按钮 = 头图元素.querySelector(
      "[aria-label='上下拖动图片以调整位置']"
    );
    头图按钮组.insertBefore(span, 随机按钮);
  }
}
function 添加头图按钮(头图元素) {
  for (let 按钮配置 in naive.自定义头图菜单) {
    if (按钮配置 && naive) {
      let 按钮项目 = naive.自定义头图菜单[按钮配置];
      插入头图按钮(头图元素, 按钮项目);
    }
  }
}
function 判定并获取目标(event) {
  let target = event.target;
  if (target.className == "protyle-background") {
    添加头图按钮(target)
  }
}
function 添加所有头图按钮(){
    let els = document.querySelectorAll('protyle-background')
    els.forEach(
        el=>添加头图按钮(el)
    )
}


export class customBackgroundButton extends naive.plugin {
  constructor() {
    super({ name: "customBackgroundButton" });
    this.setPluginsProp("注册头图按钮", this.注册头图按钮);
    this.注册自定义事件({target:document,type:"mouseover"},'鼠标聚焦到头图',判定并获取目标)
  }
  注册头图按钮(option) {
    naive.自定义头图菜单?null:naive.自定义头图菜单={}
    naive.自定义头图菜单[option.type] = option;
  }
}
export const dependencies =["customEvent"]