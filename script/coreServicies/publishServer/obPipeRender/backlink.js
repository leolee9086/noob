export default  function 生成反向链接(req, res, 渲染结果){
    let backlinkContainer = 渲染结果.querySelector(".backlink")
    if (backlinkContainer) {
        backlinkContainer.innerHTML += `
    <div class="block__icons">
<div class="block__logo">
<svg><use xlink:href="#iconLink"></use></svg>
反向链接
</div>
</div>
<ul id="backlinks"></ul>
    <div class="block__icons">
<div class="block__logo">
<svg><use xlink:href="#iconLink"></use></svg>
提及
</div>
</div>
<ul id="backmentions"></ul>
    `
    }
    let backlinks = 渲染结果.querySelector("#backlinks");
    let backmentions = 渲染结果.querySelector("#backmentions")
    window.obsidianFileList.map(
        file=>{
              file.lines&&file.lines.map(
                line=>{
                    line.links&&line.links.map(
                        link=>{
                            if(link.href&&link.href.startsWith(渲染结果.metadata.path)){
                                backlinks.innerHTML = `<div>
                                    <div><a href="/obsidian/${file.path}">${file.name}</a></div>
                                    <div>${window.lute.Md2BlockDOM(line.markdown)} </div>
                                </div>`+backlinks.innerHTML
                            }
                        }
                    )
                    if(line.markdown.indexOf(渲染结果.metadata.name.split('\.')[0])!==-1){
                        backmentions.innerHTML = `<div>
                        <div><a style="color:red" href="/obsidian/${file.path}">${file.name}</a></div>
                        <div>${window.lute.Md2BlockDOM(line.markdown)} </div>
                        </div>`+backmentions.innerHTML
                    }
                }
            )
        }
    )
    return 渲染结果
}