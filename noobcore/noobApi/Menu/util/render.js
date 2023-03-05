import { 生成通用菜单条目 } from "./dom.js"
import { 获取当前菜单条目配置 } from "./status.js"
export default function renderCustom(element) {
    let customMenu = window.siyuan.menus.menu
    let 当前菜单条目配置 = 获取当前菜单条目配置()

    console.log(当前菜单条目配置)
    let 当前菜单条目DOM = 生成通用菜单条目(当前菜单条目配置)
    console.log("aaa", 当前菜单条目DOM)
    当前菜单条目DOM.forEach(
        item => { customMenu.append(item) }
    )
}