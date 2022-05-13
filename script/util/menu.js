export function 打开urlid(){
    let url参数 = 解析url参数(window.location.href)
    if(url参数){
      let id =url参数.id
      if(id){
        this.窗口内打开思源块(id)
      }
    }
}