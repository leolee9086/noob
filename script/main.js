const workspaceDir = window.siyuan.config.system.workspaceDir;
const userId = window.siyuan.user.userId;
const winlist = {
  服务器设置窗口: null,
};
var newWin = {};
function 加载窗口(url, windowParams, closeCallback) {
  console.log(newWin.name);
  if (window.require) {
    if (!newWin.name) {
      newWin.close ? newWin.close() : null;

      const { BrowserWindow } = require("@electron/remote");
      // 新建窗口(Electron 环境)
      newWin = new BrowserWindow(windowParams);
      newWin.loadURL(url);
      newWin.name = "name";
      console.log(newWin);
      newWin.on("close", 关闭窗口);
      winlist.服务器设置窗口 = newWin;
      console.log(winlist);
    } else {
      winlist.服务器设置窗口.show();
    }
  }
}
function 关闭窗口(窗口) {
  newWin = {};
  newWin.name = null;
  winlist.服务器设置窗口 = null;
}
let option = {
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
};

//加载窗口("http://192.168.0.9:6806/appearance/themes/naive/", option);
function 点击打开服务器设置窗口() {
  加载窗口("http://127.0.0.1:6806/appearance/themes/naive/", option);
}
if (window.require) {
  let button = document.createElement("div");
  button.innerHTML = `<div class="toolbar__item toolbar__item--action b3-tooltips b3-tooltips__sw" aria-label="打开发布服务设置" id="minWindow">
<svg>
    <use xlink:href="#iconSettings"></use>
</svg>
</div>`;
  button.setAttribute("class", "fn__flex");
  let toolbar = document.getElementById("toolbar");
  let windowControls = document.getElementById("windowControls");
  setTimeout(() => toolbar.insertBefore(button, windowControls), 1000);
  console.log(button);
  button.addEventListener("click", 点击打开服务器设置窗口);
}
const watchjs = require (`${workspaceDir}/conf/appearance/themes/naive/config/watch.js`)
const watch=watchjs.监听路径列表(workspaceDir)
if (window.require) {
  const fs = require("fs");

  const server = require(workspaceDir +
    "/conf/appearance/themes/naive/script/server");
  console.log(userId);
  window.publishserver = server.创建服务器(workspaceDir, userId);
  for (let path  in watch){
    fs.watch(watch[path], {recursive:true},async function () {
      window.location.reload();
    });
  }
  fs.watch(`${workspaceDir}/conf/appearance/themes/naive/config/watch.js`, async function () {
    window.location.reload();
  });

}
