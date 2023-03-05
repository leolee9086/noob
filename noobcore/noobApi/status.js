import {DOM监听器} from "./util/DOMwatcher.js"
(new DOM监听器(
    {
        监听目标:'div[data-node-id] [contenteditable="true"]',
        监听器回调:(mutationsList, observer)=>{
            console.log(mutationsList, observer)
        }
    }
)).开始监听()
window.noobStatus = {
    最后鼠标点击元素: '',
    最后输入元素: '',
    菜单状态:{
        自定义菜单:{
            块标菜单:{
                NodeDocument:[],
                NodeHeading:[],
                NodeParagraph:[],
                NodeListItem:[],
                NodeList:[],
                NodeTable:[],
            },
            文档树菜单:{
                
            }
        },
        当前菜单类型:"",
        当前菜单状态:""
    },
}
document.addEventListener(
    "click", (event) => {
        onClick(event.target, event)
    }, true
)
document.addEventListener(
    "keyup", (event) => {
        onInput(event.target, event)
    }
)

function onInput(target, event) {
    window.noobStatus.最后输入元素 = event.path[0]
    window.noobStatus.最后输入事件 = event
    console.log(window.noobStatus)

}
function onClick(target, event) {
    window.noobStatus.最后鼠标点击元素 = target
    window.noobStatus.最后鼠标点击事件 = event

    console.log(window.noobStatus)
}

export default window.noobStatus