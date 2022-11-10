
import { npmCmd } from "../../util/shell.js";
import { 核心服务列表 } from "../../util/constants.js"
import { noob文件夹路径, noob缓存路径 } from "../../util/constants.js";
import {  解析用户设置 } from "../../util/config.js";
import { 递归创建文件夹 } from "../../util/file.js"
const fs = require("fs-extra")
const path = require("path")
let node缓存路径 = path.join(noob缓存路径, "node")
递归创建文件夹(node缓存路径)
export async function 升级核心服务() {
    let 设置 =await 解析用户设置()
    //开发设置下如果提供了核心服务路径则取消安装服务
    if (!设置.额外设置.开发模式额外设置.核心服务解析路径) {
        for (let i = 0, len = 核心服务列表.length; i < len; i++) {
            await 升级服务(核心服务列表[i])
        }
    }
}
export async function 升级服务(服务名称) {
    await 安装服务(服务名称)
}
export async function 安装服务(服务名称) {
    let 设置 = await 解析用户设置()

    try {
        await npmCmd(`--registry=${设置.npm安装注册表地址} install ${服务名称}`, node缓存路径)
        转移服务文件(服务名称)
    } catch (e) {
        console.log("服务安装失败", e)
    }
}
export function 转移服务文件(服务名称) {
    let noob服务路径 = path.join(noob文件夹路径, 'servicies')
    let 目标文件夹路径 = path.join(noob服务路径, 服务名称)
    let 服务文件包路径 = path.join(node缓存路径, 'node_modules', 服务名称)
    if (fs.existsSync(目标文件夹路径)) {
        fs.removeSync(目标文件夹路径)
    }
    require("fs").renameSync(服务文件包路径, 目标文件夹路径)
}