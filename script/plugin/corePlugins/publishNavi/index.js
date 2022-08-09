export class publishNavi extends naive.plugin {
    constructor() {
        super({ name: "publishNavi"});
    }
    pipe = [
        this.生成导航栏
    ]
    async 生成导航栏(req,res,渲染结果){
        let 导航栏容器 = 渲染结果.querySelector('.publishNavi')
        let html = `<li data-type="tab-header" data-position="center" class="item">
        <span class="item__icon favicon" style="width: 30px;height: 30px;">
            <img src="/stage/favicon.png">
        </span>
        <a href="/block/${naive.设置.首页.思源文档id}">
            ${naive.设置.首页.显示名称||'首页'}
        </a>
    </li>`
        let stmt = `select * from blocks where id in (select block_id from attributes where name ="custom-publish-slot" and value="navi" )`
        let naviBlocks = await this.核心api.sql({stmt:stmt},'')
        naviBlocks.forEach(
            block=>{
                html += `<li data-type="tab-header" data-position="center" class="item">
                <span>
                    <span class="item__text"><a href="/block/${block.id}">${block.name||block.content.slice(0,6)}</a></span>
                </span>
            </li>`
            }
        )
        导航栏容器.querySelector('.toolbarCenter .layout-tab-bar').innerHTML=html
        return 渲染结果
    }
}
export const dependencies= ['publishContent']