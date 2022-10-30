export  function 获取文件扩展名(filename) {
    return filename.split(".").pop()
  }
export function   mkfilep(filePath, data) {
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