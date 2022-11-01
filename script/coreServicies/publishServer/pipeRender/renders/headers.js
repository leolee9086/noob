
import 设置 from "../../config.js"
import 核心api from "../../util/kernelApi.js"
const templateParser = require(`art-template`)

const fs =require("fs-extra")
export async function 生成发布文档头(req, res, 渲染结果) {
    let unAuthedPageTemplate = fs.readFileSync(
      设置.templatePath + "/head.html",
      "utf8"
    );
    let 发布文档头 = templateParser.render(unAuthedPageTemplate, {
      设置: 设置,
    });
    let head = 渲染结果.querySelector("head");
    head.innerHTML += 发布文档头;
    return 渲染结果;
  }
  