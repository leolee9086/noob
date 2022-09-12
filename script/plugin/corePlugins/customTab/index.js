
import {iframeTab} from "./browserTab.js"
const updateHotkeyTip = (hotkey) => {
    if (/Mac/.test(navigator.platform) || navigator.platform === "iPhone") {
        return hotkey;
    }
    if (hotkey.startsWith("⌘")) {
        hotkey = hotkey.replace("⌘", "⌘+");
    } else if (hotkey.startsWith("⌥") && hotkey.substr(1, 1) !== "⌘") {
        hotkey = hotkey.replace("⌥", "⌥+");
    } else if (hotkey.startsWith("⇧⌘") || hotkey.startsWith("⌥⌘")) {
        hotkey = hotkey.replace("⇧⌘", "⌘+⇧+").replace("⌥⌘", "⌘+⌥+");
    } else if (hotkey.startsWith("⇧")) {
        hotkey = hotkey.replace("⇧", "⇧+");
    }
    hotkey = hotkey.replace("⌘", "Ctrl").replace("⇧", "Shift")
        .replace("⌥", "Alt").replace("⇥", "Tab")
        .replace("⌫", "Backspace").replace("⌦", "Delete")
        .replace("↩", "Enter");
    if (hotkey.indexOf("Shift") > -1) {
        hotkey = hotkey.replace(";", ":").replace("=", "+").replace("-", "_").replace(".", ">");
    }
    return hotkey;
};
export const newCenterEmptyTab = (Tab) => {
    let customTab = new Tab({
        panel: `<div class="layout__empty b3-list">
    <div class="${!window.siyuan.config.readonly ? " fn__none" : ""}">
        <div class="config-about__logo">
            <img src="/stage/icon.png">
            ${window.siyuan.languages.siyuanNote}
        </div>
        <div class="b3-label__text">${window.siyuan.languages.slogan}</div>
    </div>
    <h1>${window.siyuan.languages.noOpenFile}</h1>
    <div class="fn__hr"></div>
    <div class="fn__hr"></div>
    <div class="b3-list-item" id="editorEmptySearch"><svg class="b3-list-item__graphic"><use xlink:href="#iconSearch"></use></svg><span>${window.siyuan.languages.search}</span><span class="b3-list-item__meta">${updateHotkeyTip(window.siyuan.config.keymap.general.globalSearch.custom)}</span></div>
    <div class="b3-list-item${window.siyuan.config.readonly ? " fn__none" : ""}" id="editorEmptyFile"><svg class="b3-list-item__graphic"><use xlink:href="#iconFile"></use></svg><span>${window.siyuan.languages.newFile}</span><span class="b3-list-item__meta">${updateHotkeyTip(window.siyuan.config.keymap.general.newFile.custom)}</span></div>
    <div class="b3-list-item${window.siyuan.config.readonly ? " fn__none" : ""}" id="editorEmptyNewNotebook"><svg class="b3-list-item__graphic"><use xlink:href="#iconFilesRoot"></use></svg><span>${window.siyuan.languages.newNotebook}</span></div>
    <div class="b3-list-item" id="editorEmptyHelp"><svg class="b3-list-item__graphic"><use xlink:href="#iconHelp"></use></svg><span>${window.siyuan.languages.help}</span></div>
</div>`,
        callback(tab) {
            tab.panelElement.querySelector("#editorEmptyHelp").addEventListener("click", () => {
                mountHelp();
            });
            tab.panelElement.querySelector("#editorEmptySearch").addEventListener("click", () => {
                openSearch(window.siyuan.config.keymap.general.globalSearch.custom);
            });
            if (!window.siyuan.config.readonly) {
                tab.panelElement.querySelector("#editorEmptyNewNotebook").addEventListener("click", () => {
                    newNotebook();
                });
                tab.panelElement.querySelector("#editorEmptyFile").addEventListener("click", () => {
                    newFile(undefined, undefined, true);
                });
            }
        },
        title: "开始"
    });
    customTab.siyuanNaiveChannel =  new BroadcastChannel("siyuanNaiveChannel")
    siyuanNaiveChannel.addEventListener("message",(msg)=>{console.log(msg)})
    return customTab
};


export class customTab extends naive.plugin {
    constructor() {
        super({ name: "customTab" })
        console.error(this.getFirstTab())
        this.tabClass = this.getFirstTab().constructor
        let wndClass = siyuan.layout.centerLayout.children[0].constructor
        console.error(this.tabClass, wndClass, siyuan.layout.centerLayout.children[0])

        window.addEventListener('mousedown', (e) => this.onclick(e))
        this.hackLayout()
        /*this.addCustomDock({
            type:"test",
            index:0,
            elementClass:"test",
            label:"测试doc",
            icon:"iconTest",
            size:{
                height:0,
                width:240
            }
        })*/
    }
    //这里还有点问题
    addCustomDock(docitem, tab) {
        let layout = window.siyuan.layout.leftDock.layout
        let wnd = layout.children[0]
        let buttonHTML = `
            <span 
            data-height="${docitem.size.height}"
            data-width="${docitem.size.width}" 
            data-type="${docitem.type}" 
            data-index="0" 
            data-hotkeylangid="${docitem.hotkeyLangId}" 
            class="dock__item${docitem.show ? "dock__item--active" : ""} b3-tooltips b3-tooltips__${docitem.elementClass}" aria-label="${docitem.label}">
                <svg><use xlink:href="#${docitem.icon}"></use></svg>
            </span>`;
        if (!document.querySelector(`.doc [data-type="${docitem.type}"] `)) {
            document.querySelector(`#dockLeft > div:nth-child(1)`).innerHTML += buttonHTML
        }
        wnd.addTab(iframeTab(this.tabClass, { url: "test", title: "e.target.dataset.tilte" }))
    }
    findWndParent(element) {
        let parent = element.parentElement
        if (parent.dataset && parent.dataset.type == "wnd") {
            return parent.parentElement
        }
        else {
            return this.findWndParent(parent)
        }
    }
    getFirstTab() {
        let array = this.falttenLayout()
        console.error(array)
        return array.filter(
            item => { return item.addModel }
        )[0]
    }
    falttenLayout() {
        let array = []
        function flatten(tree) {
            if (tree.children && tree.children instanceof Array) {
                tree.children.forEach(
                    item => {
                        array.push(item)
                        if (item.children && item.children instanceof Array) {
                            flatten(item)
                        }
                    }
                )
            }
        }
        flatten(window.siyuan.layout.centerLayout)
        return array
    }
    getLayoutByElement(el, layout) {
        let array = this.falttenLayout()
        console.error(array)
        let target
        target = array.filter(
            item => {
                return item.id == el.firstChild.dataset.id
            }
        )
        return target[0]
    }
    onclick(e) {
        console.error(e)
        if (e.target.dataset && e.target.dataset.type == 'a') {
            console.error(e.target)
            let wndElement = this.findWndParent(e.target)
            console.error(wndElement)
            let layout = this.getLayoutByElement(wndElement, siyuan.layout.centerLayout)
            console.error(layout)
            layout.addTab(iframeTab(this.tabClass, { url: e.target.dataset.href, title: e.target.dataset.tilte || e.target.innerHTML }))
        }
    }
    hackLayout = () => {
        let layoutArray = this.falttenLayout()
        layoutArray.forEach(
            layout => {
                if (layout.docIcon) {
                    try { JSON.parse(layout.docIcon) } catch (e) { return }
                    let { type, url } = JSON.parse(layout.docIcon)

                    switch (type) {
                        case "naiveBrowser":
                            console.error("naiveBrowser")
                            layout.parent.addTab(iframeTab(
                                this.tabClass,
                                {
                                    url: url,
                                    title: layout.title
                                }
                            )
                            )
                            layout.parent.removeTab(layout.id)
                            break
                    }


                }
            }
        )
    }

}
