export  function 获取文件扩展名(filename) {
    return filename.split(".").pop()
  }
export function   mkfilep(filePath, data) {
  let fs = require("fs");
  let mkdirp = require("mkdirp");
  let path = require("path")
  mkdirp.sync(path.dirname(filePath));
  if (data) {
    fs.writeFileSync(filePath, data);
  } else {
    fs.writeFileSync(filePath, "");
  }
}
export function 递归创建文件夹(){
  let path = require("path")
  let dirpath = path.join(...arguments)
  console.log(dirpath)
  let mkdirp = require("mkdirp");
  mkdirp(dirpath)
}
export function  递归创建文件(...args){
  let path = require("path")
  Array.from(args.slice(0,args.length-1))
  let dirpath = path.join(...Array.from(args.slice(0,args.length-1)))
  console.log(dirpath)

  let data = args.pop()
  mkfilep(dirpath,data)
}
function pop(...args){
  return args.pop()
}
let workspaceDir = window.siyuan?window.siyuan.config.system.workspaceDir:window.workspaceDir
export {workspaceDir as workspaceDir}
export {workspaceDir as 工作空间路径}
