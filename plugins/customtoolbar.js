
const 注册自定义工具条项目 =  function(类型,工具提示,图标,回调函数){
    let 工具条 = document.querySelector(".protyle-toolbar")
    let 分割线 = document.createElement("div")
    分割线.className="protyle-toolbar__divider"
    工具条.appendChild(分割线)
    console.log(工具条)
    domWatcher(document,"childList",测试)
    domWatcher(document,"attributes",测试)
    domWatcher(document,"subtree",测试)
}
const 测试 =  function(mutation){
    console.log(mutation)
}
注册自定义工具条项目()