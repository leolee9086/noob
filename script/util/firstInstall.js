import {工作空间路径,递归创建文件,递归创建文件夹} from  "./file.js"
import {noob设置文件路径,noob开发设置文件路径,noob文件夹路径,核心依赖列表} from "./constants.js"
import {默认设置}  from "./config.js"
import { npmCmd } from "./shell.js"
export function 创建设置文件夹(){
    递归创建文件夹(工作空间路径,'conf','noobConf')
    递归创建文件(noob设置文件路径,JSON.stringify(默认设置(),null,2))
    递归创建文件(noob开发设置文件路径,"export default " + 默认设置.toString())
}
export function 创建服务文件夹(){
    递归创建文件夹(noob文件夹路径,'servicies')
}
export function 安装基础依赖(){
    递归创建文件夹(工作空间路径,"temp",'noobtemp','deps')
}