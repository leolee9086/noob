import 设置 from "../../config.js"
import 核心api from "../../util/kernelApi.js"
const fs =require("fs-extra")

export async function 生成发布文档内容(req, res, 渲染结果) {
    let blockid = 渲染结果.block.id;
    let block = 渲染结果.block;
    let PageTemplate = fs.readFileSync(
      设置.templatePath + "/defaultPage.html",
      "utf8"
    );
    let html = 渲染结果.querySelector("html");
    html.innerHTML = PageTemplate;
    let content = html.querySelector("[data-doc-type]");
    content.innerHTML = block.content;
    let meta = 渲染结果.head.querySelector("meta");
    meta.dataset.nodeId = blockid;
    content.setAttribute("data-node-id", blockid);
    return 渲染结果;
  }
  