import 窗口状态 from "./status.js"

import 自定义块标菜单 from "./Menu/block.js"

import 自定义菜单 from "./Menu/index.js"
export class noobApi {
    constructor() {

    }
    自定义块标菜单=自定义块标菜单
    显示消息(msg){
     let    noob状态元素 = document.querySelector(".status__msg__noob")
     noob状态元素.innerHTML=msg
    }
}
window.noobApi = new noobApi()