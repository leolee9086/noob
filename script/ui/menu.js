export function 注册顶栏按钮(option) {
  let { 提示, 图标, 回调函数 } = option;
  let button = document.createElement("div");
  button.innerHTML = window.naive.dom模板.顶栏按钮(提示, 图标);
  button.setAttribute("class", "fn__flex");
  let toolbar = document.getElementById("toolbar");
  let windowControls = document.getElementById("windowControls");
  setTimeout(() => toolbar.insertBefore(button, windowControls), 0);
  console.log(button);
  button.addEventListener("click", 回调函数.bind(this));
}
export function 注册竖线菜单项目(
  数据值,
  菜单图标,
  菜单文字,
  回调函数,
  唤起词列表
) {
  naive.竖线菜单设置.菜单项目列表.push({
    数据值: 数据值,
    菜单图标: 菜单图标,
    菜单文字: 菜单文字,
    回调函数: 回调函数,
    唤起词列表: 唤起词列表,
    注册插件: this,
  });
  唤起词列表.forEach((唤起词) => {
    let 唤起词最大长度 = Math.max(
      唤起词.length,
      naive.竖线菜单设置.唤起词最大长度
    );
    // console.log(唤起词最大长度)
    naive.竖线菜单设置["唤起词最大长度"] = 唤起词最大长度;
  });
}
export function 注册块标菜单(option) {
    let 自定义块标菜单 = this.app.自定义块标菜单;
    let { 块类型, 菜单文字, 菜单图标, 回调函数, 显示判断函数 } = option;
    自定义块标菜单[块类型] ? null : (自定义块标菜单[块类型] = {});
    自定义块标菜单[块类型][菜单文字]
      ? null
      : (自定义块标菜单[块类型][菜单文字] = {});
    自定义块标菜单[块类型][菜单文字]["回调函数"] = 回调函数;
    自定义块标菜单[块类型][菜单文字]["菜单文字"] = 菜单文字;
    自定义块标菜单[块类型][菜单文字]["菜单图标"] = 菜单图标;
    自定义块标菜单[块类型][菜单文字]["注册插件"] = this;
    自定义块标菜单[块类型][菜单文字]["显示判断函数"] = 显示判断函数;
  }
