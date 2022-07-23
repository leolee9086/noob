import {ifdefParser} from "./util/ifdef/index.js"
let options = {
  defs:{"BROWSER":false}, verbose:true, tripleSlash:true,fillWithBlanks:true, uncommentPrefixString:""
}
options.defs= {
  "BROWSER":window.require?false:true,
  "APP":window.require?true:false,
  "PUBLISH":!window.siyuan,
  "MOBILE":!window.siyuan.mobileEditor?false:true,
  "DEBUG":true
}
naive.parserOptions=options
naive.ifdefParser=ifdefParser
naive.scriptParser = new ifdefParser(options)

if(naive.isApp){
  //加载后台服务
  naive.加载js({src: `${naive.根目录}/script/server/severIndex.js`, type: "module"})
}
await naive.scriptParser.Babelimport(`${naive.根目录}/script/app/appIndex.js`,true)
