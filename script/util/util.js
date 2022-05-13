function 解析url参数(url){
    url = url || '';
          const queryObj = {};
          const reg = /[?&]([^=&#]+)=([^&#]*)/g;
          const queryArr = url.match(reg) || [];
          console.log(queryArr)
          for (const i in queryArr) {
              if (Object.hasOwnProperty.call(queryArr, i)) {
                  const query = queryArr[i].split('=');
                  const key = query[0].substr(1);
                  const value = decodeURIComponent(query[1]);
                  queryObj[key] ? queryObj[key] = [].concat(queryObj[key], value) : queryObj[key] = value;
              }
          }
          console.log(queryObj)
          return queryObj;
  }
  function 窗口内打开思源块 (id){
    let 主界面=window.document
        console.log(主界面)
        let 虚拟链接 =  主界面.createElement("span")
        虚拟链接.setAttribute("data-type","block-ref")
        虚拟链接.setAttribute("data-id",id)
        let 临时目标 = 主界面.querySelector(".protyle-wysiwyg div[data-node-id] div[contenteditable]")
        if(临时目标){
          临时目标.appendChild(虚拟链接)
          let 点击事件 =  主界面.createEvent('MouseEvents')
          点击事件.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          虚拟链接.dispatchEvent(点击事件);
          虚拟链接.remove()
        }
        else{
          setTimeout(async ()=> 窗口内打开思源块(id),100)
        }
  }
  async function 打开urlid(){
    let url参数 = 解析url参数(window.location.href)
    if(url参数){
      let id =url参数.id
      if(id){
        this.窗口内打开思源块(id)
      }
    }
  }
  window.onload=setTimeout(打开urlid(),0)
  //这里只能用mouseup 其他的被阻止冒泡了  
  window.addEventListener('mouseup',获取块id与时间戳)
  function 获取块id与时间戳(event){
    let el = event.target
  
    console.log(event)
    if(el.getAttribute('data-type')!=='block-ref'){
      return null
    }
    let 块id = el.getAttribute('data-id')
    let 锚文本 =el.innerText
    let 文本时间戳 = 锚文本.split('@')
    文本时间戳 = 文本时间戳[文本时间戳.length-1]
    let 数字时间戳 = parseInt(文本时间戳)
    setTimeout(async ()=> 设定音视频块时间(块id,数字时间戳),100)
  }
  
  var 音视频尝试计数=0
   function   设定音视频块时间(块id,时间戳){
    if(音视频尝试计数>=200){
      音视频尝试计数=0
      clearTimeout(设定音视频块时间) 
      return null
    }
    let 块元素数组 = document.querySelectorAll(`.protyle-wysiwyg div[data-node-id="${块id}"]`)
    if (块元素数组&&块元素数组[0]){
      音视频尝试计数=0
      console.log(块元素数组)
      块元素数组.forEach(
        块元素=>{
          let 音视频元素 = 块元素.firstElementChild.firstElementChild
          let 视频源 =  音视频元素.getAttribute("src")
  
          if(视频源&&视频源.indexOf("player.bilibili.com")){
            let 视频源参数 = 解析url参数(视频源)||{}
            let 视频时间戳 =  视频源参数.t+''
            let 真实时间戳 = 时间戳+'s'
            视频源 = 视频源.replace(`&t=${视频时间戳}`,'')
            视频源 = 视频源+ `&t=${真实时间戳}`
            音视频元素.setAttribute("src",视频源)
          }
          else{音视频元素.currentTime = 时间戳;}
        }
        )
  
      clearTimeout(设定音视频块时间)
    }
    else{
      音视频尝试计数+=1
      setTimeout(async ()=> 设定音视频块时间(块id,时间戳),100)
    }
  }
  
  function 获取类型块列表(){
    let 块标 =null
    块标 = document.querySelector(`button[draggable="true"]`)
    块标?扩展菜单(块标):null
  }
  window.setInterval(获取类型块列表,10)
  
  function 扩展菜单(块标){
    let 块id = 块标.getAttribute("data-node-id")
    let 块标菜单 = document.querySelector(`#commonMenu`)
    if(块标菜单){
      let 菜单时间项 =块标菜单.querySelector(".b3-menu__item--readonly")
      if(菜单时间项){
        let 视图按钮 = 菜单时间项.querySelector(".cc-view-button")
        !视图按钮?菜单时间项.appendChild(生成视图按钮(块id)):null
        视图按钮 = 菜单时间项.querySelector(".cc-view-button")
        视图按钮.addEventListener("click",()=>修改块视图(视图按钮))
  
      }
    }
  }
  
  function 生成视图按钮(块id){
    let 按钮 = document.createElement("div")
    按钮.setAttribute("class","cc-view-button")
    按钮.setAttribute("data-node-id",块id)
    按钮.innerText="显示为表格"
    return 按钮
  }
  function 修改块视图(视图按钮){
    let 块id = 视图按钮.getAttribute("data-node-id")
    let 块元素 =  document.querySelector(`div[data-node-id="${块id}"]`)
    视图属性 = "custom-ccstyle"
    let 视图 = 块元素.getAttribute(视图属性)
    if(视图!=="列表表格"){
    块元素.setAttribute("custom-ccstyle","列表表格")
    }
    else{块元素.setAttribute(视图属性,"")}
  }
export function 注册竖线菜单(option){
  let {id,数据值,菜单图标,菜单文字,回调函数,唤起词列表} = option
  window.naive.竖线菜单配置.id = option
  
}