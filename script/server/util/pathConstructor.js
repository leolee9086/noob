import { 生成默认设置 } from "../../public/configer.js";
const fs = require("fs")

const realRequire = window.require
if(realRequire){
  const path =require("path")
function re(moduleName,base){
  let that =window
  if(base){
    moduleName = path.resolve(base,moduleName)
    console.log(moduleName)
  }
  if(this){
    that =this
  }
  try {
    if(that.realRequire){
    return that.realRequire(moduleName)}
    else{
      return window.require(moduleName)
    }
  } catch (e) {
    if (e.message.indexOf('Cannot find module')>=0) {
      if (!(moduleName.startsWith("/") || moduleName.startsWith("./") || moduleName.startsWith("../"))) {
        console.warn(`模块${moduleName}未找到,重定向到naive设置文件deps/node_modules`)
        let  realModuleName = moduleName
        moduleName = naive.workspaceDir + `/conf/naiveConf/deps/node_modules/${moduleName}`
        if(!fs.existsSync(moduleName)){
          try{
          npm(`i ${realModuleName}`,naive.workspaceDir + `/conf/naiveConf/deps`)
          }catch(e){

          }
        }
      }
      else if(that && naive.plugin &&that instanceof naive.plugin){
        try{
          moduleName = path.resolve(that.selfPath,moduleName)
          return window.require(moduleName)
        }
        catch(e){
          throw e
        }
      }
      try{ 
        let module =  that.realRequire(moduleName)
        return module 
      }
      catch (e){
        throw e
      }
    }
    else {
      console.error(e)
    }
  }
}
console.log(realRequire.cache.electron.__proto__.require)
realRequire.cache.electron.__proto__.realRequire=realRequire.cache.electron.__proto__.require
realRequire.cache.electron.__proto__.require=re
window.realRequire = realRequire
window.require = re
}
export default class pathConstructor {
  constructor(workspaceDir, themeName) {
    this.workspaceDir = workspaceDir;
    this.themeName = "naive";
    this.思源工作空间路径 = workspaceDir;
    this.主题根目录思源URL = ``;
    if (window.require) {
      this.cusoptionPath();
      this.pluginsPath();
      this.pluginConfigPath();
      this.sslPath();
      this.templatePath();
      this.cachePath();
    }
  }
  requireScript(filepath) {
    let path = require("path");
    console.log(path.join(this.naivePath() + "/script", filepath))
    return require(path.join(this.naivePath() + "/script", filepath));
  }
  cusoptionPath() {
    let filePath = `${this.workspaceDir}/conf/naiveConf/config/publish.json`;
    this.initFilep(
      filePath,
      JSON.stringify(生成默认设置({}, this.workspaceDir), undefined, 4)
    );
    return filePath;
  }
  themePath() {
    return `${this.workspaceDir}/conf/appearance/themes/${this.themeName}`;
  }
  naivePath() {
    return `${this.workspaceDir}/conf/appearance/themes/${this.themeName}`;
  }
  pluginsPath() {
    this.initDirp(`${this.workspaceDir}/conf/naiveConf/plugins`);
    return `${this.workspaceDir}/conf/naiveConf/plugins`;
  }
  pluginConfigPath() {
    let filePath = `${this.workspaceDir}/conf/naiveConf/config/pluginsConfig.json`;
    this.initFilep(filePath, "{}");
    return filePath;
  }
  corePluginsPath() {
    return `${this.workspaceDir}/conf/appearance/themes/${this.themeName}/script/plugin/corePlugins`;
  }
  sslPath() {
    let fs = require("fs");
    let path = require("path");
    let mkdirp = require("mkdirp");
    let filePath = `${this.workspaceDir}/conf/naiveConf/ssl`;
    let e = fs.existsSync(filePath);
    fs.existsSync(filePath);
    if (e) {
    } else {
      mkdirp.sync(filePath);
    }
    return filePath;
  }
  templatePath() {
    let filePath = `${this.workspaceDir}/conf/naiveConf/template`;
    this.initDirp(filePath);
    this.initFilep(`${filePath}/empty.html`, "");
    this.initFilep(`${filePath}/footer.html`, "");
    this.initFilep(`${filePath}/private.html`, "");
    this.initFilep(`${filePath}/unAuthedPage.html`, "");
    this.initFilep(`${filePath}/defaultPage.html`, "");

    return filePath;
  }
  cachePath() {
    let fs = require("fs");
    let path = require("path");
    let mkdirp = require("mkdirp");
    let filePath = `${this.workspaceDir}/temp/naiveCache`;
    let e = fs.existsSync(filePath);
    if (e) {
    } else {
      mkdirp(filePath);
    }
    return filePath;
  }
  uploadCachePath(){
    let fs = require("fs");
    let path = require("path");
    let mkdirp = require("mkdirp");
    let filePath = `${this.workspaceDir}/temp/naiveCache/uploadFiles`;
    let e = fs.existsSync(filePath);
    if (e) {
    } else {
      mkdirp(filePath);
    }
    return filePath;

  }
  downloadCachePath(){
    let fs = require("fs");
    let path = require("path");
    let mkdirp = require("mkdirp");
    let filePath = `${this.workspaceDir}/temp/naiveCache/downloadFiles`;
    let e = fs.existsSync(filePath);
    if (e) {
    } else {
      mkdirp(filePath);
    }
    return filePath;


  }
  mkfilep(filePath, data) {
    let fs = require("fs");
    let mkdirp = require("mkdirp");
    let lastSlashIndex = filePath.lastIndexOf("/");
    let dirPath = filePath.slice(0, lastSlashIndex);
    mkdirp.sync(dirPath);
    if (data) {
      fs.writeFileSync(filePath, data);
    } else {
      fs.writeFileSync(filePath, "");
    }
  }
  initFilep(filePath, data) {
    let fs = require("fs");
    let e = fs.existsSync(filePath);
    if (!e) {
      this.mkfilep(filePath, data);
      data
        ? console.log(`${filePath} 不存在 初始化为${data}`)
        : console.log(`${filePath} 不存在 初始化为空值`);
      return filePath
    }
    else return filePath
  }
  initDirp(dirpath) {
    let fs = require("fs");
    let mkdirp = require("mkdirp");
    let e = fs.existsSync(dirpath);
    if (!e) {
      mkdirp.sync(dirpath);
      console.log(`${dirpath} 不存在 初始化为空`);
      return dirpath
    }
    else return dirpath

  }
}
