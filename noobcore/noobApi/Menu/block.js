let {自定义菜单} = window.noobStatus.菜单状态 
const 自定义块标菜单 = {
    注册菜单项目(options){
        let 块类型 = options.块类型
        自定义菜单.块标菜单[块类型].push(options)
    }
}
export default 自定义块标菜单