import { 加载图标 } from "./ui/icon.js";
import { 窗口配置器 } from "./ui/page.js";
import { 主题界面 } from "./ui/ui.js";
import { DOM监听器 } from "../public/DOMwatcher.js";
import { 主题插件 } from "./plugin.js";
import {事件总线} from "../public/eventbus.js"
import {快捷键监听器} from "../public/keymap.js"

naive.事件总线 = new 事件总线()
naive.全局快捷键监听器 = new 快捷键监听器(document)

naive.事件总线.on('DOM改变',(数据)=>{console.log(数据)})
naive.停用插件 = function () {
  console.log("测试");
};
console.log(naive);
naive.竖线菜单设置 = [];
naive.editor = {};
naive.editor.footerWidget = "cc-template";
naive.plugins = {};
naive.plugin = 主题插件;
let 测试插件 = { name: "测试" };
new naive.plugin(测试插件);
naive.plugins.测试.停用();

加载图标();
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
const 菜单监听器回调 = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.");
    } else if (mutation.type === "attributes") {
      console.log(mutation);
      console.log("The " + mutation.attributeName + " attribute was modified.");
    }
  }
};
let 监听器选项 = {
  监听目标: "#commonMenu",
  监听器回调: 菜单监听器回调,
};
//const 监听器 = new DOM监听器(监听器选项);
//监听器.开始监听();

const 编辑器监听回调 = async function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (
      mutation.target &&
      mutation.target.getAttribute("data-node-id") &&
      mutation.target.getAttribute("updated")
    ) {
      naive.当前块id = mutation.target.getAttribute("data-node-id");
      naive.事件总线.emitt('DOM改变',mutation)
      let 文档编辑器 = mutation.target.parentElement;
      if (文档编辑器 && 文档编辑器.previousSibling.previousSibling) {
        let 当前文档id =
          文档编辑器.previousSibling.previousSibling.getAttribute(
            "data-node-id"
          );
        naive["当前文档id"] = 当前文档id;
        if (文档编辑器) {
          let footer = 文档编辑器.parentElement.querySelector(
            "div.NodeDocumentFooter"
          );
          let customfooterurl = 文档编辑器.getAttribute("custom-footerWidget");
          let customfooterheight =
            文档编辑器.getAttribute("custom-footerHeight") || 400;
          if (!customfooterurl) {
            customfooterurl = naive.editor.footerWidget;
          }
          let customfooterposition = 文档编辑器.getAttribute(
            "custom-footerPosition"
          );
          if ((!footer) && customfooterurl) {
            let div = document.createElement("div");
            div.setAttribute("class", "NodeDocumentFooter");
            div.setAttribute("data-id", 当前文档id);
            div.setAttribute("data-node-id", 当前文档id);
            div.setAttribute("data-type", "NodeWidget");
            div.setAttribute(
              "style",
              `z-index:1;top:calc(100% - ${customfooterheight});max-width:100%;max-height:${customfooterheight};width:100%;height:${customfooterheight};max-height:500px;background-color:var(--b3-theme-surface)`
            );
            div.innerHTML = `
          <div class="iframe-content" style="width:100%;height:100%">
          <iframe
           src="/widgets/${customfooterurl}/?mode=1&&id=${当前文档id}" 
           data-src="${customfooterurl}"
          data-subtype="widget" 
          data-slot="NodeDocumentFooter"
          border="0" 
          frameborder="no" 
          framespacing="0" 
          allowfullscreen="true"
          style="width:100%;height:100%"
        
          >
          </iframe>
          </div>
          `;
            if (customfooterposition) {
              div.style.position = customfooterposition;
            }
            文档编辑器.parentElement.appendChild(div);
          } else {
            console.log(footer)
            let content = footer.querySelector("iframe");
            if (customfooterposition) {
              footer.style.position = customfooterposition;
            }
            if (customfooterurl) {
              if (customfooterurl !== content.getAttribute("data-src")) {
                content.setAttribute("src", "/widgets/" + customfooterurl);
                content.setAttribute("data-src", customfooterurl);
              }
            } else footer.remove();
          }
        }
      }
    }
  }
};
let 编辑器监听器选项 = {
  监听目标: ".layout__center.fn__flex.fn__flex-1",
  监听器回调: 编辑器监听回调,
};
const 编辑器监听器 = new DOM监听器(编辑器监听器选项);
编辑器监听器.开始监听();

if (window.require) {
  if (naive.siyuan.user.userPaymentSum) {
    主题界面.注册顶栏按钮(
      "打开服务器设置窗口",
      "iconPublish",
      窗口配置器.打开服务器设置窗口
    );
  }
  else {
    主题界面.注册顶栏按钮(
        "打开服务器设置窗口",
        "iconPublish",
        ()=>window.alert("仅思源订阅用户可用发布设置功能")
      );  
  }
  主题界面.注册顶栏按钮(
    "打开图床设置",
    "iconBrush",
    窗口配置器.打开样式设置窗口
  );
}
