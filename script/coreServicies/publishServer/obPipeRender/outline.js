export default function 生成大纲(req,res,渲染结果){
    let 大纲 = 渲染结果.querySelector('#panelLeft [data-type="outline"]');
    let content = 渲染结果.querySelector("[data-doc-type]");
    let toc = ""
    content.querySelectorAll("[data-type='NodeHeading']").forEach(
        h=>toc+=`<div>${h.innerText.substring(0,16)}</div>`
    )
    大纲.innerHTML=toc
    return 渲染结果
}