import { DOM监听器 } from "/script/public/DOMwatcher.js";
function 注入全部预览按钮() {
    let 预览按钮组序列 = document.querySelectorAll(".protyle-preview__action");
    预览按钮组序列.forEach((预览按钮组) => {
      for (let 预览按钮名称 in naive.自定义预览按钮) {
        let 预览按钮项目 = naive.自定义预览按钮[预览按钮名称];
        let 预览按钮 = 生成导出栏项目(预览按钮项目);
        if (
          预览按钮组 &&
          !预览按钮组.querySelector(
            `.b3-tooltips.b3-tooltips__w.custom[custom-type="${预览按钮项目.按钮文字}"]`
          )
        ) {
          预览按钮组.appendChild(预览按钮);
        }
      }
  
    });
  }
  setTimeout(注入全部预览按钮, 1000)
  function 生成导出栏项目(按钮配置) {
    let 预览按钮 = document.createElement("button");
    预览按钮.dataset.type = "custom-export";
    预览按钮.setAttribute("class", "b3-tooltips b3-tooltips__w custom");
    预览按钮.setAttribute("type", "button");
    预览按钮.setAttribute("custom-type", 按钮配置.按钮文字);
    预览按钮.setAttribute("aria-label", 按钮配置.label || 按钮配置.按钮提示);
    预览按钮.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#${按钮配置.按钮图标}"></use></svg><span class="b3-menu__label">${按钮配置.按钮文字}</span>`;
    预览按钮.addEventListener("click", (event) => 按钮配置.回调函数(event));
    return 预览按钮;
  }
  let 预览按钮监听选项 = {
    监听目标: ".protyle-preview",
    监听器回调: 预览按钮监听回调,
  };
  new DOM监听器(预览按钮监听选项);
  
  
  function 预览按钮监听回调(mutationsList, observer) {
    for (let mutation of mutationsList) {
      console.log(mutation.target);
      if (mutation.target) {
        let 预览按钮组 = mutation.target.querySelector(
          ".protyle-preview__action"
        );
        console.log(mutation.target);
        for (let 预览按钮名称 in naive.自定义预览按钮) {
          let 预览按钮项目 = naive.自定义预览按钮[预览按钮名称];
          let 预览按钮 = 生成导出栏项目(预览按钮项目);
          if (
            预览按钮组 &&
            !预览按钮组.querySelector(
              `.b3-tooltips.b3-tooltips__w.custom[custom-type="${预览按钮项目.按钮文字}"]`
            )
          ) {
            预览按钮组.appendChild(预览按钮);
          }
        }
      }
    }
  }
  
  export class cutomPreviewerButton extends naive.plugin {
    constructor() {
      super({name:"cutomPreviewerButton"})
      this.setPluginsProp("注册预览按钮",this.注册预览按钮)
    }
    注册预览按钮(option){
        naive.自定义预览按钮?null:naive.自定义预览按钮=[]
        naive.自定义预览按钮.push(option)
    }
  }