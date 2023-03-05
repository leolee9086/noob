export function 生成元素(string, 事件选项) {
    let div = document.createElement("div")
    console.log(事件选项)
    div.innerHTML = string
    if (div.children && div.children.length > 1) {
        div.children.forEach(
            child => {
                if(事件选项 instanceof Function){
                    child.addEventListener("click",事件选项)
                }
                else {
                    for (let 事件名 in  事件选项){
                        子菜单.addEventListener(事件名,事件选项[事件名])
                    }
                }
    
            }
        )
        return div.children
    }
    else {
        if(事件选项 instanceof Function){
            div.firstElementChild.addEventListener("click",事件选项)
        }
        else {
            for (let 事件名 in  事件选项){
                div.firstElementChild.addEventListener(事件名,事件选项[事件名])
            }
        }
        return div.firstElementChild
    }
}
export function 插入元素组(子元素组, 目标元素) {
    子元素组.forEach(
        子元素 => 目标元素.append(子元素)
    )
}