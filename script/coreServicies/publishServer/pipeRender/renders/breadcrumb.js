import {getIconByType} from "../../util/icons.js"
import 设置 from "../../config.js"
import 核心api from "../../util/kernelApi.js"
const fs =require("fs-extra")

export async function 生成面包屑(req, res, 渲染结果) {
    let 面包屑元素 = 渲染结果.querySelector(".protyle-breadcrumb");
    let 块id = 渲染结果.block.id;
    let 面包屑内容 = await 核心api.getBlockBreadcrumb({ id: 块id });
    let html = "";
    面包屑内容.forEach((面包屑条目) => {
        html += 生成面包屑条目(面包屑条目, 渲染结果);
    });
    面包屑元素.innerHTML = html
    return 渲染结果;
}
export function 生成面包屑条目(面包屑条目, 渲染结果) {
    let div = 渲染结果.createElement("div");
    let 元素 = 渲染结果.querySelector(
        '.protyle-wysiwyg div[data-node-id="' + 面包屑条目.id + '"]'
    );
    if (元素) {
        if (元素.querySelector("[data-type='customAuthToken']")) {
            面包屑条目.name = "私有块不可访问"
        }
    }

    div.className = "protyle-breadcrumb__bar protyle-breadcrumb__bar--nowrap";
    div.innerHTML = `<span class="protyle-breadcrumb__item" data-node-id="${面包屑条目.id}">
    <svg class="popover__block" data-id="${面包屑条目.id}">
    <use xlink:href="#${getIconByType(面包屑条目.type, 面包屑条目.subType)}"></use>
    </svg>
    <span class="protyle-breadcrumb__text" title="${面包屑条目.name}"><a href="/block/${面包屑条目.id}">${面包屑条目.name}</a></span>
</span>`;
    return div.innerHTML
}
