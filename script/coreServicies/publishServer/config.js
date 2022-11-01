import 核心api from "./util/kernelApi.js"
const path = require("path")
const fs = require("fs-extra")

export default {
    首页:"20200812220555-lj3enxa",
    templatePath:path.join(workspaceDir,'data/templates'),
    发布主题:"notion-theme"
}
let langs  ={
    en_US:{},
    es_ES:{},
    fr_FR:{},
    zh_CHT:{},
    zh_CN:{},
}
for (  let lang in langs ){
    langs[lang] = fs.readJSONSync(path.join(workspaceDir,"conf","appearance","langs",`${lang}.json`))
}
let conf = await 核心api.getConf({},"")
console.log(conf.lang)
let i18n = langs[conf.lang||"zh_CN"]

export {i18n as i18n}