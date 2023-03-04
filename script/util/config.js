import { noob设置文件路径, noob开发设置文件路径, noob文件夹路径 } from "./constants.js"
import { 递归创建文件 } from "./file.js"

export function 默认设置() {
    return {
        npm安装注册表地址: 'https://registry.npmmirror.com/',
        服务超时等待时间: 5,
        开发模式: true,
        冒险模式: false,
        额外设置: {
            开发模式额外设置:{}
        }
    }
}
export async function 初始化设置() {
    let string = 默认设置.toString()
    递归创建文件(noob设置文件路径, string)
}
export async function 解析用户设置() {
    let fs = require("fs-extra")
    let 设置 = {}
    let json
    if(fs.existsSync(noob设置文件路径)){
     json = fs.readJSONSync(noob设置文件路径, 'utf-8')
    }else{
        json = {}
    }
    try {
        设置 = 合并设置(json)
    } catch (e) {
        console.error("设置解析错误", e)
        设置 = 默认设置()
    }
    if (设置.开发模式) {
        try {
            设置 = 合并设置((await import(noob开发设置文件路径)).default())
        } catch (e) {
            console.error("开发设置解析错误", e)
            设置 = 默认设置()
        }
    }
    console.log(设置)
    return 设置
}
export function 合并设置(用户设置) {
    let 设置 = 默认设置()
    let 客户设置项目名称数组 = Object.getOwnPropertyNames(用户设置)
    客户设置项目名称数组.forEach(
        设置名称 => {
            if (设置.hasOwnProperty(设置名称)) {
                设置[设置名称] = 用户设置[设置名称]
            }
            else {
                设置["额外设置"][设置名称] = 用户设置[设置名称]
            }
        }
    )
    return 设置
}