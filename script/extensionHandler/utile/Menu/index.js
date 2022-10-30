//劫持思源的菜单
window.siyuan.menus.menu.element =new Proxy(
    window.siyuan.menus.menu.element,{
      get(target,key){
        if(target[key] instanceof Function){
          if(key == 'append'){
            return function(...args){
               args.forEach(
                el=>{console.log(el)}
               )
               target.append(...args)
            }
          }
          return target[key].bind(target)
        }
        else{
          return target[key]
        }
      },
      set(target,key,value){
        target[key]=value
        console.log(key,value)
        return true
      }
    }
)

let _popup = window.siyuan.menus.menu.popup
window.siyuan.menus.menu.popup={}
window.siyuan.menus.menu.popup=(...args)=>{
    console.log(args)
    _popup.bind(window.siyuan.menus.menu)(...args)
}
export default window.siyuan.menus.menu