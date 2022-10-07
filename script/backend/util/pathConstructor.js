import { 生成默认设置 } from "../../public/configer.js";
export default class pathConstructor {
  constructor(naive) {
    let config = naive.public.config
    this.workspaceDir = config.backend.filesys.workspaceDir
    this.主题根目录思源URL = ``;
    this.themeName = "naive"
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
  uploadCachePath() {
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
  downloadCachePath() {
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
