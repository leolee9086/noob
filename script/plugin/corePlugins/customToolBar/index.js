import { DOM监听器 } from "/script/public/DOMwatcher.js";

let 通用菜单监听器选项 = {
  监听目标: ".protyle-toolbar",
  监听器回调: 工具条回调,
};


new DOM监听器(通用菜单监听器选项);

function 工具条回调(mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.target) {
        if (mutation.target.getAttribute("class") == "protyle-toolbar") {
          naive.事件总线.emit("工具条显示", mutation.target);
        } 
      }
    }
  }
function 注入工具条按钮(target){
    console.log(target)
    for(let 按钮名称 in naive.自定义工具条){
        let 按钮设置 = naive.自定义工具条[按钮名称]
        let button = document.createElement("button");
        button.setAttribute('class',"protyle-toolbar__item b3-tooltips b3-tooltips__n")
        button.setAttribute('data-type',按钮设置.类型)
        button.setAttribute('aria-label',按钮设置.提示)
        button.addEventListener('click',按钮设置.回调函数)
        button.innerHTML=`<svg>
        <use xlink:href='#${按钮设置.图标}'></use>
        </svg>`
        if(!target.querySelector(`[aria-label="${按钮设置.提示}"]`)){
            if(按钮设置.after){
                let 插入位置  = target.querySelector(按钮设置.after).nextSibling  
                target.insertBefore(button,插入位置)
            }
            else{
                target.appendChild(button)
            }
        }
    }  
}

function 注册工具条按钮(option) {
    let { 提示, 图标, 回调函数 } = option;
    if(!naive.自定义工具条){
        naive.自定义工具条 = {}
    }
    naive.自定义工具条[提示] =option
  }

  naive.事件总线.on('工具条显示',注入工具条按钮)

export class  customToolBar extends naive.plugin{
    constructor( ){
        super({name:"customToolBar"})
        this.setPluginsProp({中文:'注册工具条按钮'},注册工具条按钮)
    }
    
}