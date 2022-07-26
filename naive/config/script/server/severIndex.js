import {加载插件配置} from "../plugin/pluginLoader.js"
const fs = require("fs");
const watchjs = require(`${naive.workspaceDir}/conf/appearance/themes/naive/config/watch.js`);
const watch = watchjs.监听路径列表(naive.workspaceDir);
const server = require(naive.workspaceDir +"/conf/appearance/themes/naive/script/server/initServer.js");
naive.publishserver = server.创建服务器(naive.workspaceDir, naive.userId);
for (let path in watch) {
  fs.watch(watch[path], { recursive: true }, 重新加载);
}
fs.watch(
  `${naive.workspaceDir}/conf/appearance/themes/naive/config/watch.js`,
  重新加载
);
function 重新加载() {
  window.location.reload();
}
fs.watch(
  `${naive.workspaceDir}${naive.插件文件夹路径}/config.json`,
  () => setTimeout(重新加载, 1000)
);
naive.加载插件配置 = 加载插件配置
naive.加载插件配置() 