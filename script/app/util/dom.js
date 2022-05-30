export { 生成dom元素 };
function 生成dom元素(元素对象) {
  let { 标签名, 属性对象, 插入目标, 插入选项,监听器选项 } = 元素对象;
  let 临时元素 = document.createElement(标签名);
  for (let 属性名 in 属性对象) {
    临时元素.setAttribute(属性名, 属性值);
  }
  if (元素对象.innerHTML) {
    临时元素.innerHTML = 元素对象.innerHTML;
  }
  if (插入目标) {
    switch (插入选项) {
      case "末尾":
        插入目标.appendChild(临时元素);
        break;
      case "开头":
        let 兄弟元素 = 插入目标.children[1];
        if (兄弟元素) {
          插入目标.insertBefor(兄弟元素, 临时元素);
        } else {
          插入目标.appendChild(临时元素);
        }
    }
    for(let 监听器名 in 监听器选项){
        let 回调函数  =  监听器选项[监听器名]
        临时元素.addEventListener(监听器名,回调函数)
    }
    return 临时元素
  }
}
function 获取块元素(id){
  
}
