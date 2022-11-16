import { 生成元素 } from "../../util/DOMGeneretor.js"
function 生成条目(options) {
    let { 菜单文字, 菜单图标, 回调函数 } = options
    let 菜单 = 生成元素(`
<button class="b3-menu__item">
    <svg class="b3-menu__icon" style="">
    <use xlink:href="${菜单图标}"></use>
    </svg>
    <span class="b3-menu__label">${菜单文字}</span>
    <span class="b3-menu__accelerator"></span>
</button>
`, 回调函数)

    if (options.children) {
        let 箭头 = 生成元素(
            `
        <svg class="b3-menu__icon b3-menu__icon--arrow">
            <use xlink:href="#iconRight"></use>
        </svg>
        `
        )
        菜单.appendChild(箭头)

        let div = 生成元素(
            `<div class="b3-menu__submenu"></div>`
        )
        options.children.forEach(item => {
            let { 菜单文字, 菜单图标, 回调函数 } = item
            let 子菜单 = 生成元素(`
        <button class="b3-menu__item">
            <svg class="b3-menu__icon" style="">
            <use xlink:href="${菜单图标}"></use>
            </svg>
            <span class="b3-menu__label">${菜单文字}</span>
            <span class="b3-menu__accelerator"></span>
        </button>
        `, 回调函数)
            div.appendChild(子菜单)
        });

        菜单.appendChild(div)
    }
    return 菜单
}

export function 生成通用菜单条目(options) {
    let 菜单 = []
    if (options instanceof Array) {
        options.forEach(
            item => 菜单.push(生成条目(item))

        )
    } else {
        菜单.push(生成条目(options))
    }
    return 菜单
}
