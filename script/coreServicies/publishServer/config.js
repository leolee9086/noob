import 核心api from "./util/kernelApi.js"
const path = require("path")
const fs = require("fs-extra")

export default {
    首页:"20200812220555-lj3enxa",
    templatePath:path.join(workspaceDir,'data/templates'),
    发布主题:"dark+",
    网站图标:"D:\\newSiyuan\\conf\\appearance\\themes\\naive\\script\\coreServicies\\publishServer\\favicon.png",
    obsidian库地址:"D:\\椽承知识库",
    obsidian主题:"Blue Topaz"
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