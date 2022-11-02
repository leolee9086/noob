import 设置 from "../../config.js"
import 核心api from "../../util/kernelApi.js"
const fs =require("fs-extra")
export async function 注入块属性(req, res, 渲染结果) {
    let blockid =渲染结果.head.querySelector('meta').dataset.nodeId
      req.params.blockid ||
      req.query.blockid ||
      req.query.id ||
      设置.首页.思源文档id;
    if (blockid == "unidefined") {
      blockid = ''
    }
    //如果没有设置聚焦模式,那么直接返回整个文档
    if(!req.query.focus){
      let breadcrumb =await 核心api.getBlockBreadcrumb(
          {id:blockid},""
      )
      blockid = breadcrumb[0].id
    }
    let block = await 核心api.getDoc(
      { id: blockid, k: "", size: 102400, mode: 0 },
      ""
    );
  
    if (block) {
      let docInfor = await 核心api.getDocInfo({ id: blockid });
      block.docInfor = docInfor;
      渲染结果.block = block;
      return 渲染结果
    }
    else {
      let emptyPage = fs.readFileSync(设置.templatePath + '/empty.html', 'utf8')
      渲染结果 = emptyPage
      渲染结果.完成 = true
      return 渲染结果
    }
  }
  