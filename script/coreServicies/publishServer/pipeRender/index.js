import {注入块属性} from "./renders/attributes.js"
import {生成发布文档头} from "./renders/headers.js"
import {生成发布文档内容} from "./renders/content.js"
import {生成文档标题} from "./renders/title.js"
import { 修改嵌入块,修改块链接,修改私有块 } from "./renders/modifiers.js"
import {生成文档背景图} from "./renders/background.js"
import {生成面包屑} from "./renders/breadcrumb.js"
import {修改发布主题} from "./renders/themes.js"
import {生成文档树} from "./renders/fileTree.js"
import {生成文档大纲} from "./renders/outline.js"
import {生成导航栏,生成脚注} from "./renders/slots.js"
import 设置 from "../config.js"
function 注入文档元数据(req,res,渲染结果){
  if(req.headers["user-agent"]){
    渲染结果.reqHeaders= req.headers
}
let id = req.params.blockid || req.query.blockid || req.query.id;
let meta = 渲染结果.createElement("meta");
if (id) {
  meta.setAttribute("data-node-id", id);
} else if (req.url == "/") {
  meta.setAttribute(
    "data-node-id",
    设置.首页.id || 设置.首页.思源文档id || 设置.首页
  );
}
meta.setAttribute("charset", "UTF-8");
渲染结果.head.appendChild(meta);
return 渲染结果;
}
function 鉴权(req,res,渲染结果){
  let meta = 渲染结果.head.querySelector("meta");
  let id = meta.getAttribute("data-node-id");
  let id鉴权结果 = false;
  if (id == null) {
    return 渲染结果;
  } else {
    id鉴权结果 = require('../backend/middlewares/jsonReq').判定id权限(id, req.query);
  }
  meta.setAttribute("data-access", id鉴权结果);
  return 渲染结果;

}
function 重写资源链接(req,res,渲染结果){
  let assets =渲染结果.body.querySelectorAll('[src]')
  assets.forEach(
    asset=>{
      if(asset.getAttribute("src").startsWith('assets')){
        //将相对地址的assets链接替换为绝对地址
        asset.setAttribute("src","/"+asset.getAttribute("src"))
      }
    }
  )
  return 渲染结果;

}
export default  [
  注入文档元数据,
  注入块属性,
  生成发布文档头,
  生成发布文档内容,
  生成文档标题,
  修改嵌入块,
  修改块链接,
  修改私有块,
  生成文档背景图,
  生成面包屑,
  修改发布主题,
  生成文档树,
  生成文档大纲,
  生成导航栏,
  生成脚注,
  重写资源链接
]

