function 注册顶栏按钮(option) {
    let { 提示, 图标, 回调函数 } = option;
    let button = document.createElement("div");
    button.innerHTML = this.dom模板.顶栏按钮(提示, 图标);
    button.setAttribute("class", "fn__flex");
    let toolbar = document.getElementById("toolbar");
    let windowControls = document.getElementById("windowControls");
    setTimeout(() => toolbar.insertBefore(button, windowControls), 0);
    console.log(button);
    button.addEventListener("click", 回调函数.bind(this));
}
export class toolbarItem extends naive.plugin{
    constructor() {
        super({ name: "toolbarItem" });
        this.setPluginsProp({中文:'注册顶栏按钮'},注册顶栏按钮)
    }
}
export const dependencies = ['template']
export const environments =['APP',"BROWSER"]