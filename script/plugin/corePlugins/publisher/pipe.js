import {注入块属性} from "./renders/attributes.js"
import {生成发布文档头} from "./renders/headers.js"
import {生成发布文档内容} from "./renders/content.js"
import {生成文档标题} from "./renders/title.js"
import { 修改嵌入块,修改块链接,修改私有块 } from "./renders/modifiers.js"
export const pipe = [
  注入块属性,
  生成发布文档头,
  生成发布文档内容,
  生成文档标题,
  修改嵌入块,
  修改块链接,
  修改私有块,
]



