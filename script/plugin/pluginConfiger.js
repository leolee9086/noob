//加载插件配置在服务器环境下运行

export async function updatePluginsConfig() {
  naive.pluginStatus=[]
  const fs = require("fs");
  const path = require("path"); //解析需要遍历的文件夹
  //获取集市内容
  const 插件设置内容 = fs.readFileSync(
    naive.pathConstructor.pluginConfigPath(),
    "utf-8"
  );
  let 插件设置 = JSON.parse(插件设置内容);
  let 插件设置文本 = "{}";
  let 当前安装插件列表 = [];
  let 插件文件列表 = fs.readdirSync(naive.pathConstructor.pluginsPath());
  for (let 文件名 of 插件文件列表) {
    test(文件名, naive.pathConstructor.pluginsPath());
  }
  console.log("当前安装插件:", 当前安装插件列表);
  for (let 插件名 in 插件设置) {
    console.log(插件名, 插件文件列表.indexOf(插件名));
    if (!(插件文件列表.indexOf(插件名) > -1)) {
      插件设置[插件名] = undefined;
    }
    console.log(插件设置);
  }
  插件设置文本 = JSON.stringify(插件设置, undefined, 4);
  保存插件设置(插件设置文本);
  function test(文件名, 插件路径) {
    //获取当前文件的绝对路径
    var 文件路径 = path.join(插件路径, 文件名); //根据文件路径获取文件信息，返回一个fs.Stats对象
    let stats = fs.statSync(文件路径);
    var isFile = stats.isFile(); //是文件
    var isDir = stats.isDirectory(); //是文件夹
    if (isFile) {
      console.log("文件", 文件路径); // 读取文件内容
    }
    if (isDir) {
      console.log("文件夹", 文件路径); //递归，如果是文件夹，就继续遍历该文件夹下面的文件

      当前安装插件列表.push(文件名);
      if (插件设置[文件名] == undefined) {
        插件设置[文件名] = false;
      }
      try{
      let status = fs.readFileSync(文件路径+'\\plugin.json',"utf-8")
      naive.pluginStatus.push(status)
      }catch(e){

      }
    }
  }
  function 保存插件设置(插件设置文本) {
    console.log("当前插件设置:", 插件设置文本);
    let 旧插件设置内容 = fs.readFileSync(
        naive.pathConstructor.pluginConfigPath(),
      "utf-8"
    );
    if (旧插件设置内容 !== 插件设置文本) {
      fs.writeFileSync(naive.pathConstructor.pluginConfigPath(), 插件设置文本);
    }
  }
}

export function corePluginList(){
  if(window.require){
  const fs = require("fs");
  const path = require("path"); //解析需要遍历的文件夹
  let 核心插件文件列表 = fs.readdirSync(naive.pathConstructor.corePluginsPath());
  return 核心插件文件列表
  }
}