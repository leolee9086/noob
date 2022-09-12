export const iframeTab = (Tab, option) => {
    let customTab = new Tab({
        panel: `
            <div class="fn__flex fn__flex-1  fn__flex-column">    
                <div class="fn__flex" style="padding: 4px 8px;position: relative">
                    <span style="opacity: 1" class="block__icon fn__flex-center" id="searchHistoryBtn" data-menu="true">
                        <svg><use xlink:href="#iconLeft"></use></svg>
                    </span>
                    <span style="opacity: 1" class="block__icon fn__flex-center" id="searchHistoryBtn" data-menu="true">                 
                    <svg ><use xlink:href="#iconRight"></use></svg>
                    </span>
                    <div class="fn__space"></div>
                    <input class="b3-text-field fn__flex-1">
                    <span class="fn__space"></span>
                    <span 
                    style="opacity: 1" 
                    class="block__icon fn__flex-center b3-tooltips b3-tooltips__w reload" 
                    aria-label="刷新">
                        <svg><use xlink:href="#iconRefresh"></use></svg>
                    </span>
                    <span 
                    style="opacity: 1" 
                    class="block__icon fn__flex-center b3-tooltips b3-tooltips__w debug fn__none" 
                    aria-label="反向链接">
                        <svg><use xlink:href="#iconLink"></use></svg>
                    </span>
                    <div id="searchHistoryList" data-close="false" class="fn__none b3-menu b3-list b3-list--background" style="position: absolute;top: 30px;max-height: 50vh;overflow: auto"></div>
                </div>   

                <div class="fn__flex fn__flex-1  naive_ifrmeContainer" style="max-height:100%" >
                <webview   
                    class="fn__flex-1" 
                    style="width:100% ;max-height:calc(100% - 200px)" 
                    src="${option.url}" data-src="" border="0" 
                    frameborder="no" 
                    framespacing="0" 
                    allowfullscreen="true"
                    allowpopups="true"
                preload:file://D:/newSiyuan/conf/appearance/themes/naive/script/plugin/corePlugins/customTab/preload.js
                    ></webview  >   
                    <div class="fn__flex fn__flex-column browserBakclink" style="width:20%">
                    <div class="block__icons block__icons--active">
    <div class="block__logo">
        <svg><use xlink:href="#iconLink"></use></svg>
        反向链接
    </div>
    <span class="counter listCount fn__none">1</span>
    <span class="fn__space"></span>
    <label class="b3-form__icon b3-form__icon--small search__label">
        <svg class="b3-form__icon-icon"><use xlink:href="#iconSearch"></use></svg>
        <input class="b3-text-field b3-text-field--small b3-form__icon-input" placeholder="Enter 搜索">
    </label>
    <span class="fn__space"></span>
    <span data-type="refresh" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="刷新"><svg class=""><use xlink:href="#iconRefresh"></use></svg></span>
    <span class="fn__space"></span>
    <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="最小化 Ctrl+W"><svg><use xlink:href="#iconMin"></use></svg></span>
</div>
                        <div class="backlinkList fn__flex-1">
                            <ul class="b3-list b3-list--background">
                                <li class="b3-list--empty">暂无相关内容</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `,
        title: option.title,
        icon: "naiveBrowser",
        docIcon: JSON.stringify({ "type": "naiveBrowser", "url": option.url })
    });
    customTab.urlInputter = customTab.panelElement.querySelector("input")
    customTab.urlInputter.value = option.url
    customTab.frame = customTab.panelElement.querySelector("webview")
    customTab.devButton = customTab.panelElement.querySelector(".debug")
    customTab.minimalButton = customTab.panelElement.querySelector('[data-type="min"]')

    customTab.backlinkListElement = customTab.panelElement.querySelector(".backlinkList .b3-list--background")
    bindInputEvent(customTab)
    bindframeEvent(customTab)
    bindButtonEvent(customTab)
    customTab.siyuanNaiveChannel = new BroadcastChannel("siyuanNaiveChannel")
    customTab.siyuanNaiveChannel.addEventListener("message", (msg) => { console.log(msg) })
    customTab.frame.preload = "file://D:/newSiyuan/conf/appearance/themes/naive/script/plugin/corePlugins/customTab/preload.js"
    return customTab
}
function bindInputEvent(customTab) {
    let { urlInputter, frame } = customTab
    urlInputter.onchange = () => {
        if (!urlInputter.value.startsWith("http://") && !urlInputter.value.startsWith("https://") && !urlInputter.value.startsWith("/")) {
            urlInputter.value = "https://" + urlInputter.value
        }
        customTab.tilte = ""
        frame.setAttribute("src", urlInputter.value)
        customTab.tilte = urlInputter.value
        document.querySelector(`li[data-id="${customTab.id}"] span.item__text`).innerHTML = urlInputter.value
        customTab.docIcon = JSON.stringify({ "type": "naiveBrowser", "url": urlInputter.value })
        findBacklinks(customTab)
    }
}
function findBacklinks(customTab) {
    let url = customTab.urlInputter.value
    let { backlinkListElement } = customTab
    let stmt = `select * from spans`
    naive.kernelApi.sql({ stmt: stmt }, '', (data) => {
        console.log(data)
        let backlinkList = data.filter(item => {
            return /\[[\s\S]*?\]\([\s\S]*?\)/gm.test(item.markdown) && item.markdown.indexOf(`(${url})`) > 0
        })
        console.log(backlinkList)
        backlinkListElement.innerHTML = ""
        backlinkList.forEach(
            item => {
                backlinkListElement.innerHTML += `<li class="b3-list-item" draggable="true" data-node-id="20201225220955-bdl9x01" data-treetype="backlink" data-type="NodeListItem" data-subtype="u">
                <span style="padding-left: 16px" class="b3-list-item__toggle">
                    <svg data-id="%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%981" class="b3-list-item__arrow fn__hidden"><use xlink:href="#iconRight"></use></svg>
                </span>
                <svg class="b3-list-item__graphic popover__block" data-id="20201225220955-bdl9x01"><use xlink:href="#iconListItem"></use></svg>
                <span class="b3-list-item__text"><a href="siyuan://blocks/${item.block_id}/">${item.content}</a></span>
                
            </li>`
            }
        )
    })
}
function bindButtonEvent(customTab) {
    customTab.devButton.addEventListener('click', () => {
        customTab.panelElement.querySelector(".browserBakclink").classList.remove("fn__none")
        customTab.devButton.classList.add("fn__none")
    })
    customTab.panelElement.querySelector('.reload').addEventListener('click', () => {
        frame.reload()
    })
    customTab.minimalButton.addEventListener('click',()=>{
        customTab.panelElement.querySelector(".browserBakclink").classList.add("fn__none")
        customTab.devButton.classList.remove("fn__none")
    })
}
function bindframeEvent(customTab) {
    let { frame, urlInputter } = customTab
    findBacklinks(customTab)

    frame.addEventListener("dom-ready", () => {
        console.error(frame.getWebContentsId())
        fetch(urlInputter.value).then(
            res => {
                return res.text()
            }
        ).then(
            text => {
                let tilte = text.match(/<title>(.*?)<\/title>/);
                if (tilte) {
                    customTab.tilte = tilte
                    document.querySelector(`li[data-id="${customTab.id}"] span.item__text`).innerHTML = tilte
                }
            }
        )
    })
    //主进程里已经定义了在外部打开，所以就别纠结了
    frame.addEventListener('new-window', (e) => {
        e.preventDefault()
        const protocol = (new URL(e.url)).protocol
        let url = e.url + ""
        console.log(e.url)
        if (protocol === 'http:' || protocol === 'https:') {
            let newtab = iframeTab(customTab.constructor,
                {
                    title: "newtab",
                    icon: "naiveBrowser",
                    docIcon: JSON.stringify({ "type": "naiveBrowser", "url": url }),
                    url: url
                }
            )
            customTab.parent.addTab(newtab)
        }
    })


    frame.addEventListener('will-navigate', (e) => {
        e.preventDefault()
        const protocol = (new URL(e.url)).protocol
        if (protocol === 'http:' || protocol === 'https:') {
            frame.src = (e.url)
        }
    })

    frame.addEventListener('page-title-updated', async (e) => {
        customTab.tilte = e.title
        document.querySelector(`li[data-id="${customTab.id}"] span.item__text`).innerHTML = e.title
    })
}
