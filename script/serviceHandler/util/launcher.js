import { 核心服务列表, noob服务文件夹路径 } from "../../util/constants.js";
import noobService from "../index.js";
import { 解析用户设置 } from "../../util/config.js";
import { workspaceDir } from "../../util/file.js";
export async function 启动核心服务() {
    let obj = {}
    for (let i = 0, len = 核心服务列表.length; i < len; i++) {
        obj[核心服务列表[i]] = await 启动服务(
            核心服务列表[i], {
            show: false,
            stayAlive: true,
            widget: false,
            preload: "",
        }
        )
    }
    return obj
}

export async function 启动服务(服务名, option) {
    let 设置 = await 解析用户设置()
    let 真实服务文件夹路径 = noob服务文件夹路径
    //开发模式下如果提供了核心服务的加载位置的话,从这个位置加载核心服务
    if (设置.额外设置.开发模式额外设置 && 设置.额外设置.开发模式额外设置.核心服务解析路径 && 核心服务列表.indexOf(服务名) >= 0) {
        真实服务文件夹路径 = 设置.额外设置.开发模式额外设置.核心服务解析路径
    }
    if (设置.额外设置.开发模式额外设置 && 设置.额外设置.开发模式额外设置.第三方服务解析路径 && 核心服务列表.indexOf(服务名) < 0) {
        真实服务文件夹路径 = 设置.额外设置.开发模式额外设置.第三方服务解析路径
    }
    console.log(option)
    if (!option) {
        option = {
            show: true,
            stayAlive: false,
            widget: false,
            preload: "",
        }
    }

    return new noobService(require("path").join(真实服务文件夹路径, 服务名), option)
}
export async function 启动配置服务() {
    let 设置 = await 解析用户设置()
    let 配置服务路径 = require("path").join(workspaceDir, "conf", "appearance", 'themes', 'noob', 'script', "noob-service-configer")
    let option = {
        show: true,
        stayAlive: false,
        widget: false,
        preload: "",
    }
    new noobService(配置服务路径, option)
}
export function 监听服务添加(信道, 注册表) {
    let { ipcMain } = require("@electron/remote")
    ipcMain.on(信道,async (event, msg) => {
        if (msg && msg.端口号 && msg.服务名) {
            注册表.filter(
                已注册服务 => {
                    if (已注册服务) {
                        console.log(已注册服务)
                        let id = 已注册服务.id
                        let 消息id = msg.服务名
                        return id.indexOf(消息id)>=0
                    }
                }
            ).forEach(
                待停止服务 => {
                    待停止服务.销毁服务()
                    待停止服务=undefined 
                }
            )
            let 服务 =await 启动服务(msg.服务名, {
                show: true,
                stayAlive: false,
                widget: false,
                preload: "",
                url: `http://127.0.0.1:${msg.端口号}`
            })
            注册表.push(服务)
        }
    })
}

export async function 启动挂件服务(){
    const fs = require("fs")
    const path = require('path')
    fetch("/api/search/searchWidget", { method: "POST", body: JSON.stringify({ k: "" }) }).then(res => {
        return res.json()
    }).then(
        json => {
            console.log(json.data)
            json.data.blocks.forEach(widget => {
                let widgetPath = path.join(workspaceDir, 'data', "widgets", widget.content, 'index.html')
                let preloadPath = path.join(workspaceDir, 'data', "widgets", widget.content, 'preload.js')
                if (fs.existsSync(widgetPath) && fs.existsSync(preloadPath)) {
                    import("../index.js").then(
                        module => {
                            new module["default"](
                                widgetPath,
                                {
                                    show: false,
                                    stayAlive: false,
                                    widget: true,
                                    preload: preloadPath
                                }
                            )
                        }
                    )
                }
            });
        }
    )

}