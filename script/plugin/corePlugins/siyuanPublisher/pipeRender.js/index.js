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
export const pipe = [
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
  生成脚注
]

