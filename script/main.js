import {加载图标} from './ui/icon.js'
import {窗口配置器} from './ui/page.js'
import {主题界面} from './ui/ui.js'
加载图标()
function 获取url参数 (参数名) {
  const search = location.search; // 返回类似于 ?a=10&b=20&c=30
  const obj = new URLSearchParams(search);
  return obj.get(参数名)
}
function 打开块id(块id){
  let 临时目标 = document.querySelector('div.protyle-wysiwyg div[data-node-id] div[contenteditable][spellcheck]');
  if (临时目标) {
      let 临时链接 = document.createElement("span");
      临时链接.setAttribute("data-type", "block-ref");
      临时链接.setAttribute("data-id", 块id);
      临时目标.appendChild(临时链接);
      临时链接.click();
      临时链接.remove();
  }
}
const 打开到url块id= function (){
  let 窗口块id =  获取url参数('blockid')||获取url参数('id')
  if(窗口块id){
  console.log("跳转到",窗口块id)
  打开块id(窗口块id)
}
}
const 延时跳转 =function (){
  setTimeout(打开到url块id,1000)
}
window.addEventListener('load',延时跳转())
const workspaceDir = window.siyuan.config.system.workspaceDir;
const userId = window.siyuan.user.userId;
const winlist = {
  服务器设置窗口: null,
};

if (window.require) {
  主题界面.注册顶栏按钮('打开服务器设置窗口',"iconPublish",窗口配置器.打开服务器设置窗口)
  主题界面.注册顶栏按钮('打开图床设置',"iconImage",窗口配置器.打开样式设置窗口)
  const fs = require("fs");
  const watchjs = require (`${workspaceDir}/conf/appearance/themes/naive/config/watch.js`)
  const watch=watchjs.监听路径列表(workspaceDir)
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

