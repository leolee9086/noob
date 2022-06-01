
function 获取url参数 (参数名) {
    const search = location.search; // 返回类似于 ?a=10&b=20&c=30
    const obj = new URLSearchParams(search);
    return obj.get(参数名)
  }
  function 打开块id(块id){
    let 临时目标 = document.querySelector('div.protyle-wysiwyg div[data-node-id] div[contenteditable][spellcheck]');
    if (临时目标) {
        let 临时链接 = document.createElement("span");
        临时链接.setAttribute("data-type", "block-ref");
        临时链接.setAttribute("data-id", 块id);
        临时目标.appendChild(临时链接);
        临时链接.click();
        临时链接.remove();
    }
  }
  function 打开到url块id(){
    let 窗口块id =  获取url参数('blockid')||获取url参数('id')
    if(窗口块id){
    console.log("跳转到",窗口块id)
    打开块id(窗口块id)
   }
  }

  