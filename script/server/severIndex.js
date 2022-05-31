const fs = require("fs");
const watchjs = require(`${naive.workspaceDir}/conf/appearance/themes/naive/config/watch.js`);
const watch = watchjs.监听路径列表(naive.workspaceDir);
const server = require(naive.workspaceDir +
  "/conf/appearance/themes/naive/script/server/server.js");
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
  `${naive.workspaceDir}/conf/appearance/themes/naive/plugins/config.json`,
  重新加载
);

const 插件设置内容 = fs.readFileSync(
  `${naive.workspaceDir}/conf/appearance/themes/naive/plugins/config.json`,
  "utf-8"
);
let 插件设置 = JSON.parse(插件设置内容);
const 新插件设置内容 = fs.readFileSync(
  `${naive.workspaceDir}/conf/appearance/themes/naive/plugins/config.json`,
  "utf-8"
);
let 新插件设置 = JSON.parse(新插件设置内容);
let path = require("path"); //解析需要遍历的文件夹
let 插件路径 = path.resolve(
  `${naive.workspaceDir}/conf/appearance/themes/naive/plugins`
); //遍历插件文件夹
//调用文件遍历方法
fileDisplay(插件路径, 插件设置, 新插件设置);
//文件遍历方法
function fileDisplay(插件路径, 插件设置, 新插件设置) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(插件路径, function (err, 文件列表) {
    if (err) {
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      文件列表.forEach(function (文件名) {
        //获取当前文件的绝对路径
        var 文件路径 = path.join(插件路径, 文件名); //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(文件路径, function (eror, stats) {
          if (eror) {
            console.warn("获取文件stats失败");
          } else {
            var isFile = stats.isFile(); //是文件
            var isDir = stats.isDirectory(); //是文件夹
            if (isFile) {
              console.log(文件路径); // 读取文件内容
            }
            if (isDir) {
              console.log(文件路径); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
              if (新插件设置[文件名] === undefined) {
                新插件设置[文件名] = false;
                对比(插件设置, 新插件设置);
              }
            }
          }
        });
      });
    }
  });
}
function 对比(插件设置, 新插件设置) {
  console.log(插件设置, 新插件设置);
  if (JSON.stringify(插件设置) !== JSON.stringify(新插件设置)) {
    console.log(插件设置, 新插件设置);
    const formData = new FormData();
    let data = JSON.stringify(新插件设置, undefined, 4);
    let blob = new Blob([data], { type: "text/json" });
    formData.append(
      "path",
      "conf\\appearance\\themes\\naive\\plugins\\config.json"
    );
    formData.append("modTime", Date.now());
    formData.append("file", blob);
    let url = "/api/file/putFile";
    fetch(url, {
      body: formData,
      method: "POST",
    });
  }
}
