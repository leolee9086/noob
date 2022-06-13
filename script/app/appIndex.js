//插件机制
let res4 = await fetch(`${naive.插件文件夹url}config.json`);
naive.frontEndPluginConfig = await res4.json();
naive.停用插件 = function (插件) {
  naive.frontEndPluginConfig[插件.name] = null;
};
for (let 插件名 in naive.frontEndPluginConfig) {
  if (naive.frontEndPluginConfig[插件名]) {
    if (!window.require) {
      await naive.加载插件(插件名, "browser");
    } else {
      await naive.加载插件(插件名, "app");
    }
    await naive.加载插件(插件名, "CustomBlock");
  }
}


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
//判定通用菜单情形
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
  }
}
naive.事件总线.on("块标菜单显示", 插入自定义块标菜单项目);
function 插入自定义块标菜单项目(块标菜单数据) {
  let 自定义块标菜单 = naive.自定义块标菜单;

  let 当前块类型 = 块标菜单数据.类型;

  for (let 菜单项目 in 自定义块标菜单[当前块类型]) {
    注入菜单项目(菜单项目, 块标菜单数据, 自定义块标菜单, 当前块类型);
  }
  for (let 菜单项目1 in 自定义块标菜单.all) {
    当前块类型 = "all";
    注入菜单项目(菜单项目1, 块标菜单数据, 自定义块标菜单, 当前块类型);
  }
}
function 注入菜单项目(菜单项目, 块标菜单数据, 自定义块标菜单, 当前块类型) {
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

  flag && item
    ? 块标菜单数据.菜单.insertBefore(
        生成列表菜单项目(自定义块标菜单[当前块类型][菜单项目]),
        readonly
      )
    : null;
}
const 生成列表菜单项目 = function (菜单项目) {
  let button = document.createElement("button");
  button.className = "b3-menu__item diy";
  button.onclick = () =>
    菜单项目.回调函数.call(菜单项目.注册插件, naive.当前块id);
  button.setAttribute("data-node-id", naive.当前块id);
  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="${菜单项目.菜单图标}"></use></svg><span class="b3-menu__label">${菜单项目.菜单文字}</span>`;
  return button;
};
//监听头图变化
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
naive.头图按钮监听器 = new naive.DOM监听器(头图按钮监听器选项);
//监听html块变化
let html块监听选项 = {
  监听目标: `protyle-html`,
  监听器回调: html块监听器回调,
};
function html块监听器回调(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.target) {
      if (mutation.target.shadowRoot) {
        hackHTMLBlock(mutation.target);
      }
    }
  }
}
naive.html块监听器 = new naive.DOM监听器(html块监听选项);
window.addEventListener("load",()=>setTimeout(hackHTMLBlockAll,2000));

function hackHTMLBlock(htmlel) {
  for (let hacker in naive.customHTML){
    let parent=htmlel.parentElement.parentElement
    if(hacker== parent.getAttribute("custom-type")){   
      if(htmlel.parentElement.querySelector(hacker)){
        let cusel=  htmlel.parentElement.querySelector(hacker)
        cusel.setAttribute("data-content",htmlel.getAttribute("data-content"))
      }
      else{
        let customhtml=document.createElement(hacker)
        htmlel.style.display="none"
        customhtml.setAttribute("data-content",htmlel.getAttribute("data-content"))
        htmlel.parentElement.insertBefore(customhtml,htmlel)
      }
    }
  }
}
function hackHTMLBlockAll() {
  let htmls = document.querySelectorAll('[data-type="NodeHTMLBlock"]');
  if(htmls[0]){
    htmls.forEach(htmlel=>{
        if(htmlel.querySelector("protyle-html")){
        hackHTMLBlock(htmlel.querySelector("protyle-html"));
      }
      })
    
  }
 
}
hackHTMLBlockAll()
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

//获取当前块id用
naive.判定并获取块id = function (event) {
  if (event && event.target) {
    let target = event.target;
    naive.获取id与类型(target);
    naive.获取文档id(target);
  }
};
naive.获取id与类型 = function (target) {
  if (!target) {
    return;
  }
  if (target.getAttribute("data-node-id")) {
    if (target.getAttribute("data-node-id") !== naive.当前块id) {
      naive.当前块id = target.getAttribute("data-node-id");
      naive.事件总线.emit("当前块id改变", naive.当前块id);
      if (target.getAttribute("data-type")) {
        naive.当前块类型 = target.getAttribute("data-type");
      }
    }
    return;
  } else {
    target = target.parentElement;
    naive.获取id与类型(target);
  }
};
naive.获取文档id = function (target) {
  if (!target) {
    return;
  }
  if (
    target.getAttribute("data-node-id") &&
    (target.getAttribute("data-type") == "NodeDocument" ||
      target.getAttribute("class") == "protyle-background")
  ) {
    if (target.getAttribute("data-node-id") !== naive.当前文档id) {
      naive.当前文档id = target.getAttribute("data-node-id");
      naive.事件总线.emit("当前文档id", naive.当前块id);
    }
    return;
  } else {
    target = target.parentElement;
    naive.获取文档id(target);
  }
};

naive.获取块数组 = function () {
  naive.当前块元素数组 = document.querySelectorAll(
    `div.protyle-wysiwyg div[data-node-id='${naive.当前块id}'`
  );
  if (!naive.当前块元素数组) {
    naive.当前块元素数组 = document.querySelectorAll(
      `div.protyle-wysiwyg[data-node-id='${naive.当前块id}'`
    );
  }
};
naive.事件总线.on("当前块id改变", naive.获取块数组);
//事件回调
naive.判定并获取目标 = function (event) {
  let target = event.target;
  if (event.target.className == "protyle-background") {
    naive.事件总线.emit("鼠标聚焦到头图", event.target);
  }
};

naive.插入头图按钮 = function (头图元素, 按钮项目) {
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
};
naive.添加头图按钮 = function (头图元素) {
  for (let 按钮配置 in naive.自定义头图菜单) {
    if (按钮配置 && naive) {
      let 按钮项目 = naive.自定义头图菜单[按钮配置];
      naive.插入头图按钮(头图元素, 按钮项目);
    }
  }
};
naive.事件总线.on("鼠标聚焦到头图", naive.添加头图按钮);
document.addEventListener("mousedown", naive.判定并获取块id);
document.addEventListener("mouseover", naive.判定并获取目标);
