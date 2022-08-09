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
    打开块id(窗口块id);
  }
};
function 延时跳转() {
  setTimeout(打开到url块id, 1000);
}
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
      if (mutation.target.getAttribute("class") == "protyle-util") {
        naive.事件总线.emit("工具栏面板显示", mutation.target);
      } else {
        naive.事件总线.emit("工具栏面板隐藏", mutation.target);
      }
    }
  }
}
let 工具栏面板监听器选项 = {
  监听目标: ".protyle-util",
  监听器回调: 工具面板监听器回调,
};
naive.工具栏面板监听器 = new naive.DOM监听器(工具栏面板监听器选项);

//块标菜单监听器
function 通用菜单监听器回调(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.target) {
      if (mutation.target.getAttribute("class") == "b3-menu") {
        naive.事件总线.emit("通用菜单显示", mutation.target);
        判定通用菜单(mutation.target);
      } else {
        naive.事件总线.emit("通用菜单隐藏", mutation.target);
      }
    }
  }
}
let 通用菜单监听器选项 = {
  监听目标: "#commonMenu",
  监听器回调: 通用菜单监听器回调,
};
naive.通用菜单监听器回调 = new naive.DOM监听器(通用菜单监听器选项);
//监听头图变化
//监听html块变化
//监听文档变化
let 文档块监听选项 = {
  监听目标: ".protyle-wysiwyg.protyle-wysiwyg--attr",
  监听器回调: 文档块监听回调,
};
function 文档块监听回调(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.target) {
    }
  }
}
naive.文档块监听器 = new naive.DOM监听器(文档块监听选项);
//监听导出按钮变化
//事件回调
document.addEventListener("mousedown", naive.判定并获取块id);
document.addEventListener("mouseover", naive.判定并获取目标);




