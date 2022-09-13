import {注入块属性} from "./renders/attributes.js"
import {生成发布文档头} from "./renders/headers.js"
import {生成发布文档内容} from "./renders/content.js"
import {生成文档标题} from "./renders/title.js"
import { 修改嵌入块 } from "./renders/modifiers.js"
import { 修改块链接 } from "./修改块链接"
export const pipe = [
  注入块属性,
  生成发布文档头,
  生成发布文档内容,
  生成文档标题,
  修改嵌入块,
  修改块链接,
  修改私有块,
]



async function 修改私有块(req, res, 渲染结果) {
  if (!naive.私有块字典) {
    naive.私有块字典 = {}
  }

  let 私有块数组 = 渲染结果.querySelectorAll('[custom-publish-token]')
  私有块数组.forEach(
    私有块 => {
      if (!naive.私有块字典) {
        naive.私有块字典 = {}
      }
      naive.私有块字典[私有块.getAttribute('data-node-id')] = { content: 私有块.innerHTML, token: 私有块.getAttribute("custom-publish-token") }
      私有块.innerHTML = `<div>请输入块token<input/><button data-type="customAuthToken" data-node-id='${私有块.getAttribute('data-node-id')}'>确认</button></div>`
      私有块.setAttribute("custom-publish-token", '')
    }
  )
  return 渲染结果
}
