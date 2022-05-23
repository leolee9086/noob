const naive = {
    注册自定义块标菜单(option){
        let {块类型, 菜单文字,菜单图标, 回调函数}  = option
        naive.自定义块标菜单[块类型] ? null : (自定义块标菜单[块类型] = {});
        naive.自定义块标菜单[块类型][菜单文字]
        ? null
        : (自定义块标菜单[块类型][菜单文字] = {});
        naive.自定义块标菜单[块类型][菜单文字]["回调函数"] = 回调函数;
        naive.自定义块标菜单[块类型][菜单文字]["菜单文字"] = 菜单文字;
        naive.自定义块标菜单[块类型][菜单文字]["菜单图标"] = 菜单图标;
    },
    判定目标并添加菜单项目(event){
        let 父元素 = event.target.parentElement;
        if (父元素.getAttribute("draggable") == "true") {
          扩展菜单(父元素);
        } else if (父元素.parentElement.getAttribute("draggable") == "true") {
          扩展菜单(父元素.parentElement);
        }
    },
    当前文档id(){
        
    }
}