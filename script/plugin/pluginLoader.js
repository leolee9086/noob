//加载插件配置在服务器环境下运行
export function 加载插件配置(环境数组){
    const fs = require("fs")
    const 插件设置内容 = fs.readFileSync(
        `${naive.workspaceDir}/${naive.插件文件夹路径}/config.json`,
        "utf-8"
      );
      let 插件设置 = JSON.parse(插件设置内容);
      let path = require("path"); //解析需要遍历的文件夹
      let 插件路径 = path.resolve(
        `${naive.workspaceDir}${naive.插件文件夹路径}`
      ); //遍历插件文件夹
      //调用文件遍历方法
      let 插件设置文本 = "{}";
      let 当前安装插件列表 = [];
      let 插件文件列表 = fs.readdirSync(naive.workspaceDir+naive.插件文件夹路径);
      for (let 文件名 of 插件文件列表) {
        test(文件名, 插件路径);
      }
      console.log("当前安装插件:",当前安装插件列表);

      for(let 插件名  in 插件设置){
        console.log(插件名,插件文件列表.indexOf(插件名))
        if(!(插件文件列表.indexOf(插件名)>-1)){
          插件设置[插件名]=undefined
        }
        console.log(插件设置)
      }
      插件设置文本 = JSON.stringify(插件设置, undefined, 4);
      保存插件设置(插件设置文本);

      function 保存插件设置(插件设置文本) {
        console.log("当前插件设置:",插件设置文本);
        let 旧插件设置内容 = fs.readFileSync(
          `${naive.workspaceDir}${naive.插件文件夹路径}/config.json`,
          "utf-8"
        );
        if (旧插件设置内容 !== 插件设置文本) {
          const formData = new FormData();
          let data = 插件设置文本;
          let blob = new Blob([data], { type: "text/json" });
          formData.append(
            "path",
            `${naive.插件文件夹路径}/config.json`
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
        }
      }      
}


export async function 加载插件(插件名,环境){
  if(插件名=="configPages"){return}
  try {
    let manifest = await fetch(
      `${naive.插件文件夹url}/${插件名}/plugin.json`
    );
    let menifestJSON = await manifest.json();
    if (menifestJSON && menifestJSON.environment.indexOf(环境)>=0) {
      try {
        let pluginclass =await import(`${naive.插件文件夹url}/${插件名}/index.js`)
        naive.plugins[插件名] = new pluginclass[插件名]({ name: 插件名 });
      } catch (e) {
        console.error("加载插件", 插件名, "失败", e);
      }
    } 
  } catch (e) {
    console.error("加载插件", 插件名, "失败", e);
  }
} 
export async function  加载核心插件(插件名,环境){
  try {
    let manifest = await fetch(
      `${this.核心插件文件夹url}/${插件名}/plugin.json`
    );
    let menifestJSON = await manifest.json();
    if (menifestJSON && menifestJSON.environment.indexOf(环境)>=0) {
      try {
        let pluginclass =await import(`${this.核心插件文件夹url}/${插件名}/index.js`)
        this.corePlugins[插件名] = new pluginclass[插件名]({ name: 插件名 });
      } catch (e) {
        console.error("加载核心插件", 插件名, "失败", e);
      }
    } else {
      console.error("加载核心插件", 插件名, "失败", `非${环境}环境插件`);
    }
  } catch (e) {
    console.error("加载核心插件", 插件名, "失败", e);
  }
}