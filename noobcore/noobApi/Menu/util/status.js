function setMenuStatu(key, value) {
    let menu = window.noobStatus.菜单状态
    if(key=="当前菜单类型"){
    menu[key] = value
    }
    else{
        !menu["当前菜单状态"]?menu["当前菜单状态"]={}:null
        menu["当前菜单状态"][key] = value
    }
    console.log(menu)
}

function checkMenu(target=window.noobStatus.最后鼠标点击元素,event=window.noobStatus.最后鼠标点击事件) {
    //这里应该需要处理嵌入块
    console.log(target,event)
    switch(target.tagName){
        case "use":
        checkMenu(target.parentElement, event)
        return
        case "svg":
        checkMenu(target.parentElement, event)
        return
        case "SPAN":
        checkMenu(target.parentElement, event)
        return
        case "DIV":
            if (target.getAttribute("data-node-id") && target.getAttribute("data-type") && target.querySelector(".protyle-attr")) {
                setMenuStatu("当前菜单类型", "块标菜单")
                setMenuStatu("块id", target.getAttribute("data-node-id"))
                setMenuStatu("块类型", target.getAttribute("data-type"))
                setMenuStatu("触发位置", "块内容")
                return
            }
            if (target.getAttribute("contenteditable")) {
                checkMenu(target.parentElement, event)
                return
            }
            if (target.getAttribute("class")=="protyle-title protyle-wysiwyg--attr") {
                setMenuStatu("当前菜单类型", "块标菜单")
                setMenuStatu("块类型", "NodeDocument")
                setMenuStatu("块id", target.previousElementSibling.getAttribute("data-node-id"))
                setMenuStatu("文档id", target.previousElementSibling.getAttribute("data-node-id"))

                setMenuStatu("触发位置", "编辑器标题")

                return
            }
        return
        case "BUTTON":
            if (target.getAttribute("data-node-id") && target.getAttribute("data-type")) {
                setMenuStatu("当前菜单类型", "块标菜单")
                setMenuStatu("块id", target.getAttribute("data-node-id"))
                setMenuStatu("块类型", target.getAttribute("data-type"))
                setMenuStatu("触发位置", "块标")
                return
            }
            if (target.getAttribute("aria-label")=="更多" && target.parentElement.getAttribute("class")=="protyle-breadcrumb") {
                setMenuStatu("当前菜单类型", "面包屑菜单")
                setMenuStatu("文档id", target.parentElement.querySelector("span[data-node-id]").getAttribute("data-node-id"))
                setMenuStatu("触发位置", "面包屑")
                return
            }
        return
        case "UL":
            if(target.getAttribute("data-url")){
                setMenuStatu("当前菜单类型", "文档树笔记本菜单")
                setMenuStatu("笔记本id", target.getAttribute("data-url"))
                setMenuStatu("触发位置", "文档树")
                return
            }
        return
        case "LI":
            if (target.getAttribute("data-node-id") && target.getAttribute("data-type")=="navigation-file") {
                setMenuStatu("当前菜单类型", "文档树菜单")
                setMenuStatu("文档id", target.getAttribute("data-node-id"))
                setMenuStatu("文档名", target.getAttribute("data-name"))
                setMenuStatu("触发位置", "文档树")
                return
            }
            if ( target.getAttribute("data-type")=="navigation-root") {
                checkMenu(target.parentElement, event)
                return
            }
        return
        default:
            checkMenu(target.parentElement, event)
        return
    }


}

export function 获取当前自定义菜单配置(){
    let 当前菜单类型 = window.noobStatus.菜单状态.当前菜单类型
    return window.noobStatus.菜单状态.自定义菜单[当前菜单类型]
}
export function 获取当前菜单条目配置(){
    checkMenu()
    let 当前菜单类型 = window.noobStatus.菜单状态.当前菜单类型
    console.log(当前菜单类型)
    switch (当前菜单类型){
        case "块标菜单":
            let 当前块类型 = window.noobStatus.菜单状态.当前菜单状态.块类型
            console.log(当前块类型)
        return  window.window.noobStatus.菜单状态.自定义菜单.块标菜单[当前块类型]
    }
}
