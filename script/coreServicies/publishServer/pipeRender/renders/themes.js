
import 设置 from "../../config.js"
import 核心api from "../../util/kernelApi.js"
const fs = require("fs-extra")
export function 修改发布主题(req, res, 渲染结果) {
    let theme
    let themeDefault
    theme = 设置.发布主题
    themeDefault = 设置.发布模式=="明亮"?"daylight":"midnight"
    if (渲染结果.block && 渲染结果.block.docInfor && 渲染结果.block.docInfor.ial) {
        theme = 渲染结果.block.docInfor.ial['custom-publish-theme'] || theme
    }
    if (!theme) {
        theme = "daylight"
    }
    if (!themeDefault) {
        themeDefault = "daylight"
    }
    let themeStyle = 渲染结果.head.querySelector("#themeStyle")
    let themeDefaultStyle = 渲染结果.head.querySelector("#themeDefaultStyle")
    themeStyle.setAttribute('href', `/appearance/themes/${theme}/theme.css`)
    themeDefaultStyle.setAttribute('href', `/appearance/themes/${themeDefault}/theme.css`)
    let publishFixStyle = 渲染结果.head.querySelector("#publishFixStyle")
    publishFixStyle.setAttribute('href', `/appearance/themes/${theme}/publishFix.css`)
    渲染结果.currentTheme = theme

    return 渲染结果
}
export default 修改发布主题
