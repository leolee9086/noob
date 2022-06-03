import { 加载图标 } from "./ui/icon.js";
import { 窗口配置器 } from "./ui/page.js";
import { DOM监听器 } from "../public/DOMwatcher.js";
import { 主题插件 } from "./plugin.js";
import { 事件总线 } from "../public/eventBus.js";
import { 主题界面 } from "./ui/ui.js";
import { 共享数据总线 } from "../public/eventChannel.js";
import { 快捷键监听器 } from "../public/keymap.js";
import { 添加行内样式 } from "./util/font.js";

naive.事件总线 = new 事件总线();
naive.eventBus = naive.事件总线;
naive.全局快捷键监听器 = new 快捷键监听器(document);
naive.打开服务器设置窗口 = 窗口配置器.打开服务器设置窗口;
naive.打开样式设置窗口 = 窗口配置器.打开样式设置窗口;
naive.编辑器队列 = [];
naive.竖线菜单设置 = [];
naive.自定义块标菜单 = [];
let res = await fetch("/appearance/themes/naive/config/style.json");
naive.编辑器样式设置 = await res.json();
let res3 = await fetch("/appearance/themes/naive/config/keymap.json");
naive.快捷键设置 = await res3.json();
for (let 功能 in naive.快捷键设置) {
  if (naive[功能]) {
    naive.全局快捷键监听器.on(naive.快捷键设置[功能], naive[功能]);
  }
}
naive.加载css(
  `/appearance/themes/${naive.编辑器样式设置.编辑器样式}/theme.css`
);
//插件机制
naive.plugin = 主题插件;

let res4 = await fetch("/appearance/themes/naive/plugins/config.json");
naive.frontEndPluginConfig = await res4.json();
naive.停用插件 = function (插件) {
  naive.frontEndPluginConfig[插件.name] = null;
};
console.log(naive);
for (let 插件名 in naive.frontEndPluginConfig) {
  if (naive.frontEndPluginConfig[插件名]) {
    if (!window.require) {
      await naive.加载插件(插件名, "browser");
    } else {
      await naive.加载插件(插件名, "app");
    }
  }
}
naive.editor = {};
naive.editor.footerWidget = "cc-template";

加载图标();
console.log(naive);

function 获取url参数(参数名) {
  const search = location.search; // 返回类似于 ?a=10&b=20&c=30
  const obj = new URLSearchParams(search);
  return obj.get(参数名);
}
function 打开块id(块id) {
  let 临时目标 = document.querySelector(
    "div.protyle-wysiwyg div[data-node-id] div[contenteditable][spellcheck]"
  );
  if (临时目标) {
    let 临时链接 = document.createElement("span");
    临时链接.setAttribute("data-type", "block-ref");
    临时链接.setAttribute("data-id", 块id);
    临时目标.appendChild(临时链接);
    临时链接.click();
    临时链接.remove();
  }
}
const 打开到url块id = function () {
  let 窗口块id = 获取url参数("blockid") || 获取url参数("id");
  if (窗口块id) {
    console.log("跳转到", 窗口块id);
    打开块id(窗口块id);
  }
};
const 延时跳转 = function () {
  setTimeout(打开到url块id, 1000);
};
window.addEventListener("load", 延时跳转());
const workspaceDir = window.siyuan.config.system.workspaceDir;
const userId = window.siyuan.user.userId;
const winlist = {
  服务器设置窗口: null,
};

//工具栏面板监听器
function 工具面板监听器回调(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.target) {
      console.log(mutation.target);
      if (mutation.target.getAttribute("class") == "protyle-util") {
        naive.事件总线.emitt("工具栏面板显示", mutation.target);
      } else {
        naive.事件总线.emitt("工具栏面板隐藏", mutation.target);
      }
    }
  }
}
let 工具栏面板监听器选项 = {
  监听目标: ".protyle-util",
  监听器回调: 工具面板监听器回调,
};
naive.工具栏面板监听器 = new DOM监听器(工具栏面板监听器选项);
//块标菜单监听器
function 通用菜单监听器回调(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.target) {
      if (mutation.target.getAttribute("class") == "b3-menu") {
        console.log("通用菜单显示");
        naive.事件总线.emitt("通用菜单显示", mutation.target);
        判定通用菜单(mutation.target);
      } else {
        naive.事件总线.emitt("通用菜单隐藏", mutation.target);
      }
    }
  }
}
let 通用菜单监听器选项 = {
  监听目标: "#commonMenu",
  监听器回调: 通用菜单监听器回调,
};
naive.通用菜单监听器回调 = new DOM监听器(通用菜单监听器选项);
//判定通用菜单情形
function 判定通用菜单(通用菜单) {
  let readonly = 通用菜单.querySelector(
    ".b3-menu__item.b3-menu__item--readonly"
  );
  if (readonly && readonly.innerText.indexOf("创建于") >= 0) {
    naive.事件总线.emitt("块标菜单显示", {
      类型: naive.当前块类型,
      id: naive.当前块id,
      菜单:通用菜单
    });
  }
}
naive.事件总线.on("块标菜单显示", 插入自定义块标菜单项目);
function 插入自定义块标菜单项目(块标菜单数据) {
  let 自定义块标菜单 = naive.自定义块标菜单;
  console.log(自定义块标菜单);

  let 当前块类型 = 块标菜单数据.类型;
  for (let 菜单项目 in 自定义块标菜单[当前块类型]) {
    console.log(菜单项目);
    let readonly = 块标菜单数据.菜单.querySelector(
      ".b3-menu__item.b3-menu__item--readonly"
    );
    let item =          生成列表菜单项目(自定义块标菜单[当前块类型][菜单项目])
    let flag =  块标菜单数据.菜单.innerHTML.indexOf(item.innerHTML)>=0?false:true
    console.log(flag)
    flag? 块标菜单数据.菜单.insertBefore(
          生成列表菜单项目(自定义块标菜单[当前块类型][菜单项目]),
          readonly
        )
      : null;
  }
}
const 生成列表菜单项目 = function (菜单项目) {
  let 自定义块标菜单 = naive.自定义块标菜单;

  let button = document.createElement("button");
  button.className = "b3-menu__item diy";
  console.log(菜单项目);
  button.onclick = (() => 菜单项目.回调函数.call(菜单项目.注册插件,naive.当前块id));

  button.setAttribute("data-node-id", naive.当前块id);
  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="${菜单项目.菜单图标}"></use></svg><span class="b3-menu__label">${菜单项目.菜单文字}</span>`;
  return button;
};




//获取当前块id用
document.addEventListener("mousedown", 判定并获取块id);
function 判定并获取块id(event) {
  if (event && event.target) {
    let target = event.target;
    获取id与类型(target);
  }
}
function 获取id与类型(target) {
  if (!target) {
    return;
  }
  if (target.getAttribute("data-node-id")) {
    if (target.getAttribute("data-node-id") !== naive.当前块id) {
      naive.当前块id = target.getAttribute("data-node-id");
      console.log(naive.当前块id);
      naive.事件总线.emitt("当前块id改变", naive.当前块id);
      if (target.getAttribute("data-type")) {
        naive.当前块类型 = target.getAttribute("data-type");
      }
    }
    return;
  } else {
    target = target.parentElement;
    获取id与类型(target);
  }
}
