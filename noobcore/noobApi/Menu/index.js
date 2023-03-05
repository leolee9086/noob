
import renderCustom from "./util/render.js"
//劫持思源的菜单
let customMenu = window.siyuan.menus.menu
customMenu.append = (element) => {
  if (!element) {
    return;
  }
  customMenu.element.append(element);
}
let fun =customMenu.popup
customMenu.popup =(...args)=>{
  renderCustom(customMenu.element)
  fun.bind(customMenu)(...args)
  console.log(customMenu.element)

}

export default customMenu