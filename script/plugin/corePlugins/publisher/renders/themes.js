export function     修改发布主题(req,res,渲染结果){
    if(渲染结果.block&&渲染结果.block.docInfor&&渲染结果.block.docInfor.ial){
    let theme = 渲染结果.block.docInfor.ial['custom-publish-theme']
    let themeStyle = 渲染结果.head.querySelector("#themeStyle")
    let themeDefaultStyle = 渲染结果.head.querySelector("#themeDefaultStyle")

    if(theme){
        themeStyle.setAttribute('href',`/appearance/themes/${theme}/theme.css`)
        themeDefaultStyle.setAttribute('href',`/appearance/themes/${theme}/theme.css`)

    }
    }
    return 渲染结果
}
