//判定是否在app内运行
import {生成默认设置} from "./public/configer.js"
naive.isApp=window.require?true:false
naive.加载js({src: `${naive.根目录}/script/app/index.js`, type: "module"})

console.log(naive)
if(naive.isApp){
  //加载后台服务
  naive.加载js({src: `${naive.根目录}/script/server/index.js`, type: "module"})
}
