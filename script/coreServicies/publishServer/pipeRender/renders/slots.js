import 设置 from "../../config.js"
import 核心api from "../../util/kernelApi.js"
const fs =require("fs-extra")

export async function 生成导航栏(req,res,渲染结果){
    let 导航栏容器 = 渲染结果.querySelector('.publishNavi')
    let html = `<li data-type="tab-header" data-position="center" class="item">
    <span class="item__icon favicon" style="width: 30px;height: 30px;">
        <img src="/favicon/">
    </span>
    <a href="/block/${设置.首页.思源文档id}">
        ${设置.首页.显示名称||'首页'}
    </a>
</li>
<li data-type="tab-header" data-position="center" class="item" data-type="搜索">



<span class="item__icon" data-type="navi-searcher">

    <input />
</span>
<span class="item__icon">
    <svg>
        <use xlink:href="#iconSearch"></use>
    </svg>
</span>

</li>

`
    let stmt = `select * from blocks where id in (select block_id from attributes where name ="custom-publish-slot" and value="navi" )`
    let naviBlocks = await 核心api.sql({stmt:stmt},'')
    naviBlocks.forEach(
        block=>{
            html += `<li data-type="tab-header" data-position="center" class="item">
            <span>
                <span class="item__text"><a href="/siyuanPublisher/block/${block.id}">${block.name||block.content.slice(0,6)}</a></span>
            </span>
        </li>`
        }
    )
    导航栏容器.querySelector('.toolbarCenter .layout-tab-bar').innerHTML=html
    return 渲染结果
}
export  async function 生成脚注(req,res,渲染结果){
    let 文档容器 = 渲染结果.querySelector('.protyle-wysiwyg.protyle-wysiwyg--attr[data-doc-type="NodeDocument"]')
    let html = `
        <div class="fn__flex fn__flex-1 fn__flex-column" id="publishFooter" style="text-align:center;min-height:0.1px !important;position: absolute;justify-content: center;min-width: 100%;bottom: 0;padding:16px;background-color:var(--b3-theme-background)">
    `
    let stmt = `select * from blocks where id in (select block_id from attributes where name ="custom-publish-slot" and value="footer" )`
    if(req.session&&req.session.user_group=='admin'){
        html+=`<div>管理员${req.session.user},欢迎回来,当前块从<a href="/siyuanPublisher/editor/stage/build/desktop/?id=${渲染结果.block.id}">这里</a>开始编辑</div>`
    }
    let footBlocks = await 核心api.sql({stmt:stmt},'')
    footBlocks.forEach(
        block=>{
            if(block.type!=='html'){
            html += `<div data-type="footer-item" data-position="center" class="item">
            <span>
                <span class="item__text"><a href="/siyuanPublisher/block/${block.id}">${block.name||block.content.slice(0,6)}</a></span>
            </span>
        </div>`}
        else{
            html+=block.markdown
        }
        }
    )
    let footer = fs.readFileSync(设置.templatePath+'/footer.html','utf8')
    html+=footer
    let theme = 渲染结果.currentTheme
    let themeURL = fs.readJSONSync(workspaceDir+`/conf/appearance/themes/${theme}/theme.json`).url
    html+= `<div data-type="footer-item" data-position="center" class="item">
    <span>
        <span class="item__text"><a href="${themeURL}">当前外观主题为${theme},如果喜欢的话,去给作者一点支持吧♥</a></span>
    </span>
</div>`
    文档容器.parentElement.innerHTML+=html+"</div>"
    return 渲染结果
}
