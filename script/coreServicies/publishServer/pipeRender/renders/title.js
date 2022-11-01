import 设置 from "../../config.js"
import 核心api from "../../util/kernelApi.js"
const fs =require("fs-extra")

export async function 生成文档标题(req, res, 渲染结果) {
    let 标题元素 = 渲染结果.querySelector(".protyle-title__input");
    let 标题内容 = 渲染结果.block.docInfor.ial.title;
    let 文档图标 = 渲染结果.querySelector(".protyle-title__icon")
    文档图标.setAttribute('data-href', 'block/' + 渲染结果.block.id)
    标题元素.innerHTML = 标题内容;
    let titleEL = 渲染结果.querySelector('title')
    if (!titleEL) {
      titleEL = document.createElement('title')
      titleEL.innerHTML = 标题内容
      渲染结果.head.appendChild(titleEL)
    } else {
      titleEL.innerHTML = 标题内容
    }
    if (req.session && req.session.user_group == 'admin') {
      标题元素.innerHTML += `<div><a style="font-size:16px;font-weight:lighter" href="/editor/stage/build/desktop/?id=${渲染结果.block.id}">开始编辑</a></div>`
    }
    return 渲染结果;
  }
  