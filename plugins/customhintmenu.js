const 判断键盘目标=function(event){
  let node = getSelection().getRangeAt(0).commonAncestorContainer;
  let el = null
  el=(  node.nodeType === 1 ? node : node.parentElement);
  console.log(el)  
  渲染竖线菜单(event,el,node)  
}
const 生成竖线菜单项=function(菜单项目){
    let 菜单项目元素 = document.createElement("button")
    菜单项目元素.setAttribute("class", 'b3-list-item b3-list-item--two fn__block')
    菜单项目元素.setAttribute("data-value",菜单项目.数据值)
    菜单项目元素.setAttribute("style","width:100%;display:block")
    菜单项目元素.innerHTML=`
    <div class="b3-list-item__first" style="display:flex;align-items:center" >
    <svg class="b3-list-item__graphic">
    <use xlink:href="${菜单项目.菜单图标||"#iconFile"}">
    </use></svg>
    <span class="b3-list-item__text">
    ${菜单项目.菜单文字}
    </span>
    <span class="b3-menu__accelerator">${菜单项目.唤起词列表[0]}</span>
    </div>
    `
    菜单项目元素.addEventListener("click",()=>菜单项目.回调函数())
    菜单项目元素.addEventListener("focus",()=>菜单项目元素.setAttribute("class","b3-list-item b3-list-item--two fn__block b3-list-item--focus"))
    return 菜单项目元素
}
window.竖线菜单设置={"菜单项目列表":[],"唤起词最大长度":0}
const 注册竖线菜单项目 = function(数据值,菜单图标,菜单文字,回调函数,唤起词列表){
  window.竖线菜单设置.菜单项目列表.push({
    '数据值':数据值,
    '菜单图标':菜单图标,
    '菜单文字':菜单文字,
    '回调函数':回调函数,
    '唤起词列表':唤起词列表,
  })
  唤起词列表.forEach(
    唤起词=>  {let 唤起词最大长度=Math.max(唤起词.length,window.竖线菜单设置.唤起词最大长度)
    // console.log(唤起词最大长度)
     window.竖线菜单设置['唤起词最大长度']=唤起词最大长度
    }
  )
}
const 填充菜单内容 = function(菜单容器元素,菜单项目列表){
  菜单项目列表.forEach(
    菜单项目=>菜单项目?菜单容器元素.appendChild(生成竖线菜单项(菜单项目)):null
  )
  菜单容器元素.addEventListener("click",()=>菜单容器元素.remove())
  window.addEventListener("click",()=>菜单容器元素.remove(),{once:true})
}
const 判断唤起词 = function(event){
  let 唤起词最大长度 = window.竖线菜单设置['唤起词最大长度']
  let node = getSelection().getRangeAt(0).commonAncestorContainer 
  window.竖线菜单设置.菜单项目列表.forEach(
  菜单项目=>{
      if(菜单项目.唤起词列表.indexOf(node.nodeValue.substring(node.nodeValue.lastIndexOf("|")+1))>=0){
        菜单项目.回调函数()
        window.removeEventListener("keyup", 判断唤起词)
      }
      }
  )
  if (node.nodeValue.substring(node.nodeValue.lastIndexOf("|")+1).length<唤起词最大长度){
      let el = null
      el=(  node.nodeType === 1 ? node : node.parentElement);
      let 旧竖线菜单 =  document.getElementById('custom-hint-menu')
      旧竖线菜单?旧竖线菜单.remove():null
      渲染竖线菜单(event,el,node,true)
  }
  else{
    window.removeEventListener("keyup", 判断唤起词)

  }
}
const 渲染竖线菜单 = function(event,el,node,force){
  //console.log(event,el,getSelection().getRangeAt(0))
  let range = getSelection().getRangeAt(0)
  let 旧竖线菜单 =  document.getElementById('custom-hint-menu')
  旧竖线菜单?旧竖线菜单.remove():null
  竖线菜单设置.当前节点 = node
  竖线菜单设置.当前元素 = el
  //console.log(node.nodeValue.lastIndexOf('|'),node.nodeValue.length)
  if(node.nodeValue.lastIndexOf('|')!==node.nodeValue.length-1&&!force) return null;
  let rect =  range.getBoundingClientRect()
  //console.log(rect.left,rect.top)  
  const 竖线菜单 = 生成悬浮菜单("custom-hint-menu","b3-menu b3-list b3-list--background custom-hint-menu",rect)
  填充菜单内容(竖线菜单,竖线菜单设置.菜单项目列表)
  document.body.appendChild(竖线菜单)  
  window.addEventListener("keyup", 判断唤起词)
}

const 生成悬浮菜单 =  function(id="custom-hint-menu",classname="b3-menu b3-list b3-list--background custom-hint-menu",position){
  let 悬浮菜单 = document.createElement('div')
  悬浮菜单.setAttribute("id",id)
  悬浮菜单.setAttribute("class",classname)
  悬浮菜单.setAttribute("style",`max-height: 402px; width: 200px;top:${position.top-28+'px'};left:${position.left+28+'px'}`)
  return 悬浮菜单
}
const 光标位置插入字符串 = function(字符串){
  let node =   getSelection().getRangeAt(0).commonAncestorContainer
  //console.log(node)
  node?node.nodeValue=node.nodeValue.substring(0,node.nodeValue.lastIndexOf("|"))+字符串:null
  let range = getSelection().getRangeAt(0)
  range.setStart(node,node.length)
  range.setEnd(node,node.length)
}
const 插入当前时间 =  function(){
  let 当前时间 = new Date()
  let 当前时间字符串 =  当前时间.toLocaleTimeString()
 光标位置插入字符串(当前时间字符串)
}
const 插入块id = function(){
  let 块id  =  竖线菜单设置.当前元素.getAttribute("data-node-id")
  光标位置插入字符串(块id)
} 
注册竖线菜单项目(0,"#iconCalendar","当前时间",插入当前时间,["shijian","sj","时间"])
注册竖线菜单项目(0,"#iconCalendar","当前时间",插入当前时间,["测试","cs"])
注册竖线菜单项目(0,"#iconDoc","文档id",插入块id,["块id","block.id","id"])

window.addEventListener("keyup", 判断键盘目标);
