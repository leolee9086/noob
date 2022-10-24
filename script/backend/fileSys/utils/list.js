const fg  = require('fast-glob')
export default function list(filePath){
    let list = fg.sync(`**`, { dot: true, stats: true, cwd:filePath })
    console.log(list)
    return list 
}