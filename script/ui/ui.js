export {主题界面 as 主题界面}
const 主题界面  = {
    注册顶栏按钮:function (提示,图标,回调函数){
        let button = document.createElement("div");
        button.innerHTML = `<div class="toolbar__item toolbar__item--action b3-tooltips b3-tooltips__sw" aria-label="${提示}" id="minWindow">
      <svg>
          <use xlink:href="#${图标}"></use>
      </svg>
      </div>`;
        button.setAttribute("class", "fn__flex");
        let toolbar = document.getElementById("toolbar");
        let windowControls = document.getElementById("windowControls");
        setTimeout(() => toolbar.insertBefore(button, windowControls), 0);
        console.log(button);
        button.addEventListener("click", 回调函数);
      }
      
    
}