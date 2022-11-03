import 设置 from "../config.js"
import 核心api from "../util/kernelApi.js"
import PathConstructor from "../util/pathConstructor.js"
const pathConstructor = new PathConstructor(workspaceDir)
const _path = require("path")
const fs = require("fs-extra")
const MagicString = require("magic-string")
const fg = require("fast-glob")

function setLute() {
    let lute = Lute.New()
    lute.SetFileAnnotationRef(true);
    lute.SetTextMark(true);
    lute.SetHeadingID(true);
    lute.SetYamlFrontMatter(true);
    //lute.PutEmojis(options.emojis);
    //lute.SetEmojiSite(options.emojiSite);
    //lute.SetHeadingAnchor(options.headingAnchor);
    lute.SetInlineMathAllowDigitAfterOpenMarker(true);
    lute.SetToC(false);
    lute.SetIndentCodeBlock(false);
    lute.SetParagraphBeginningSpace(true);
    lute.SetSetext(false);
    lute.SetFootnotes(false);
    lute.SetLinkRef(false);
    //lute.SetSanitize(options.sanitize);
    lute.SetChineseParagraphBeginningSpace(2);
    //   lute.SetRenderListStyle(options.listStyle);
    lute.SetImgPathAllowSpace(true);
    lute.SetKramdownIAL(true);
    lute.SetTag(true);
    lute.SetSuperBlock(true);
    lute.SetGitConflict(true);
    lute.SetMark(true);
    lute.SetSup(true);
    lute.SetSub(true);
    lute.SetProtyleWYSIWYG(true);
    lute.SetGFMAutoLink(true)
    lute.SetLinkBase("/obsidian/")
    lute.SetSuperBlock(true)
    return lute
}
let lute = setLute()
//构造文件树
let list = fg.sync("**", { stats: true, cwd: 设置.obsidian库地址 })

let cachePath = _path.join(workspaceDir, 'temp', 'noobCache', 设置.obsidian库地址.replace(/\\/, '/').split('/').pop(), 'markdownFiltree.json')
if (!fs.existsSync(cachePath)) {
    let cached = []
    for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i]
        item.filePath = _path.join(设置.obsidian库地址, item.path)

        if (item.name.endsWith(".md")) {
            item.markdown = fs.readFileSync(item.filePath, "utf-8",)
            if (item.markdown && item.markdown.length) {
                解析文本(item)
            }
        }
        ipcRenderer.send(
            window.id, { type: "tickTok" }
        )
        核心api.pushMsg({ msg: `已完成markdown文件索引${cached.length}/${list.length},索引完成之前可能无法渲染某些文件` }, "")
        cached.push(item)
        if (cached.length == list.length) {
            console.log(cached)
        }

    }
    window.obsidianFileList = list
    pathConstructor.mkfilep(cachePath, JSON.stringify(list))

}
else {
    let cached = []
    let text = fs.readFileSync(cachePath, "utf-8")
    let fileList = list
    list = window.obsidianFileList = JSON.parse(text)

    for (let i = 0, len = list.length; i < len; i++) {

        let el = list[i]
        el.filePath = _path.join(设置.obsidian库地址, el.path)

        let { path, mtimeMs } = el
        let modified = fileList.find(
            item => {
                return item.mtimeMs&&item.path == path && !(item.mtimeMs < (mtimeMs -1000))
            }
        )
        if (modified&&el.name.endsWith(".md")) {
            核心api.pushErrMsg({ msg: `已完成markdown文件索引${modified.mtimeMs}/${mtimeMs},索引完成之前可能无法渲染某些文件` }, "")

            解析文本(el,true)

        }else{
        //核心api.pushMsg({ msg: `已完成markdown文件索引${cached.length}/${list.length},索引完成之前可能无法渲染某些文件` }, "")
        }
        cached.push(el)
    }
}
fs.watch(设置.obsidian库地址,{
    persistent: true,
    recursive: true,
},(event,fileName)=>{
    if(fileName){
        console.log(fileName)
        let item = window.obsidianFileList.find(
            el=>{
                return el.path==_path.join(设置.obsidian库地址,fileName)||el.filePath==_path.join(设置.obsidian库地址,fileName)
            }
        )
        if(item){
            console.log(item)
            item= 解析文本(item,true)
            核心api.pushMsg({ msg: `文件${item.filePath}改变,更新缓存` }, "")

        }
    
    }
})
function 解析文本(item,flag) {
    let markdown = item.markdown
    if(!markdown||flag){
        markdown= fs.readFileSync(item.filePath, "utf-8",)
    }
    let stringLines,  lines; 
    stringLines=  lines  = markdown.split(/\r\n\r\n|\n\n|\r\r/)
    
    for (let i = 0, len = lines.length; i < len; i++) {
        let line = lines[i]
        let links =[]
        if (line) {
            ipcRenderer.send(
                window.id, { type: "tickTok" }
            )

            let magicline = new MagicString(line)
            const regexWikiGlobal = /\[\[([^\]]*)\]\]/g
            let wikiMatches = line.match(regexWikiGlobal)
            if (wikiMatches) {
                wikiMatches.forEach(
                    wikilink => {
                        let start = line.indexOf(wikilink)
                        let end = start + wikilink.length
                        let alias = wikilink.split("|")[1]
                        let name = wikilink.split("|")[0]
                        if (name) {
                            name = name.substring(2)
                        }
                        if (alias) {
                            alias = alias.substring(0, alias.length - 2)
                        }
                        if (!alias) {
                            name = name.substring(0, name.length - 2)
                            alias = name
                        }
                        name = name.replace("#", "?title=")
                        name = name.replace("^", "?id=")
                        let fileName = name.split("?")[0]
                        let query = name.replace(fileName, "")
                        if ((fileName.indexOf("\.") < 0)) {
                            fileName = fileName + '.md'
                        }
                        let path = list.find((e) => {
                            return e.path == fileName
                        })
                        if (!path) {
                            path = list.find((e) => {
                                return e.name == fileName
                            })
                        }
                        if (path) {
                            path = path.path
                        }
                        else (
                            path = "?notfound?" + fileName
                        )
                       /* if (fs.existsSync(_path.join(设置.obsidian库地址, _path.dirname(path), `${fileName}.md`))) {
                            fileName = _path.join(_path.dirname(path), `${fileName}.md`)
                        }
                        if (fs.existsSync(_path.join(设置.obsidian库地址, _path.dirname(path), `${fileName}`, `index.md`))) {
                            name = _path.join(_path.dirname(path), `${fileName}/index.md`)
                        }*/
                        links.push(
                            {
                                href:path,
                                query:query,
                                hrefName:fileName,
                                alias:alias
                            }
                        )

                        magicline.overwrite(start, end, `[${alias}](${path}${query})`)
                    }
                )
            }
            let string = magicline.toString()
            lines[i] = {
                markdown: string,
                html: lute.Md2HTML(string),
                blockDOM: lute.Md2BlockDOM(string),
                links:links,
            }
            stringLines[i]=magicline.toString()
        }
    }
    item.lines = lines
    let string = stringLines.join("\r\n\r\n")
    console.log(string)
    item.blockDOM = lute.Md2BlockDOM(string)
    item.html = lute.Md2HTML(string)
    return item
}
export default function (req, res, 渲染结果) {
    渲染结果.obsidian = true
    let path = req._path
    let ob文件地址 = _path.join(设置.obsidian库地址, path)
    console.log(req)
    console.log(ob文件地址)
    if (!fs.existsSync(ob文件地址)) {
        ob文件地址 = ob文件地址 + '.md'
    }
    let item
    if (fs.existsSync(ob文件地址)) {
        item = window.obsidianFileList.find(el => {
            return el.filePath == ob文件地址
        })
    } else {
        item = window.obsidianFileList.find(el => {
            return el.name == path.fileName(path)
        })

    }
    let PageTemplate = fs.readFileSync(
        设置.templatePath + "/defaultPage.html",
        "utf8"
    );
    let html = 渲染结果.querySelector("html");
    html.innerHTML = PageTemplate;

    let DOM = ""
    if (item && item.lines) {
        item.lines.forEach(
            line => {
                if (line && line.blockDOM) {
                    DOM += line.blockDOM
                }
            }
        )
    }
    let content = html.querySelector("[data-doc-type]");
    //content.innerHTML = DOM
    if(!item.blockDOM){
        解析文本(item)
    }
    content.innerHTML = item.blockDOM
    return 渲染结果
}
export function aaa(req, res, 渲染结果) {
    let lute = setLute()
    渲染结果.obsidian = true
    let path = req._path
    let ob文件地址 = _path.join(设置.obsidian库地址, path)
    console.log(req)
    console.log(ob文件地址)
    if (!fs.existsSync(ob文件地址)) {
        ob文件地址 = ob文件地址 + '.md'
    }
    if (fs.existsSync(ob文件地址)) {
        let PageTemplate = fs.readFileSync(
            设置.templatePath + "/defaultPage.html",
            "utf8"
        );
        let html = 渲染结果.querySelector("html");
        html.innerHTML = PageTemplate;
        let content = html.querySelector("[data-doc-type]");
        let text = fs.readFileSync(ob文件地址, "utf-8")
        let lines = text.split(/\r\n|\n|\r/)
        lines.forEach(
            (line, i) => {
                let magicline = new MagicString(line)

                const regexWikiGlobal = /\[\[([^\]]*)\]\]/g
                let wikiMatches = line.match(regexWikiGlobal)
                if (wikiMatches) {
                    wikiMatches.forEach(
                        wikilink => {
                            let start = line.indexOf(wikilink)
                            let end = start + wikilink.length
                            let alias = wikilink.split("|")[1]
                            let name = wikilink.split("|")[0]
                            if (name) {
                                name = name.substring(2)
                            }
                            if (alias) {
                                alias = alias.substring(0, alias.length - 2)
                            }
                            if (!alias) {
                                name = name.substring(0, name.length - 2)
                                alias = name
                            }
                            name = name.replace("#", "?title=")
                            name = name.replace("^", "?id=")
                            let fileName = name.split("?")[0]
                            let query = name.replace(fileName, "")
                            if ((fileName.indexOf("\.") < 0)) {
                                fileName = fileName + '.md'
                            }
                            console.log(fileName)
                            let path = list.find((e) => {
                                return e.path == fileName
                            })
                            if (!path) {
                                path = list.find((e) => {
                                    return e.name == fileName
                                })
                            }

                            if (path) {
                                path = path.path
                            }
                            else (
                                path = "?notfound?" + fileName
                            )
                            /*if(fs.existsSync(_path.join(设置.obsidian库地址,_path.dirname(path),`${fileName}.md`))){
                                fileName = _path.join(_path.dirname(path),`${fileName}.md`)
                            }
                            if(fs.existsSync(_path.join(设置.obsidian库地址,_path.dirname(path),`${fileName}`,`index.md`))){
                                name = _path.join(_path.dirname(path),`${fileName}/index.md`)
                            }*/

                            magicline.overwrite(start, end, `[${alias}](${path}${query})`)

                        }
                    )
                }
                console.log(magicline.toString())
                lines[i] = magicline.toString()
            }
        )
        text = lines.join("\r\n")
        content.innerHTML = lute.Md2BlockDOM(text)
        渲染结果.querySelectorAll("[contenteditable]").forEach(
            child => {
                child.setAttribute("contenteditable", "false")
            }
        )
        content.querySelectorAll("*").forEach(
            child => {
                if (child.getAttribute("custom-class")) {
                    child.getAttribute("custom-class").split(" ").forEach(
                        className => {
                            className ? child.classList.add(className) : null
                        }
                    )
                }
                if (child.parentElement.getAttribute("custom-class")) {
                    child.parentElement.getAttribute("custom-class").split(" ").forEach(
                        className => {
                            className ? child.parentElement.classList.add(className) : null
                        }
                    )
                }
            }
        )
        content.querySelectorAll("[href]").forEach(
            child => {
                if (child.getAttribute("href").indexOf("?notfound?") >= 0) {
                    child.setAttribute("href", child.getAttribute("href").replace("?notfound?", ""))
                    child.setAttribute("data-not-inited", true)
                    child.classList.add("data-link-not-inited")
                }
            }
        )
        content.querySelectorAll("[data-href]").forEach(
            child => {
                if (child.getAttribute("data-href").indexOf("?notfound?") >= 0) {
                    child.setAttribute("data-href", child.getAttribute("data-href").replace("?notfound?", ""))
                    child.setAttribute("data-not-inited", true)
                    child.classList.add("data-link-not-inited")
                }
            }
        )
        content.querySelectorAll('[data-type="NodeBlockquote"]').forEach(
            bq => {
                let child = bq.querySelector("[contenteditable]")
                console.log(child.innerText)
                let firstLine = child.innerText.split(/\r\n|\n|\r/)[0]
                if (firstLine.startsWith("[!") && firstLine.indexOf("]") >= 0) {
                    let calloutType = firstLine.split("]")[0].replace("[!", "")
                    let rawline = firstLine
                    firstLine = firstLine.replace(`[!${calloutType}]`, "")
                    firstLine = `<span>${firstLine}</span>`
                    child.innerText = child.innerText.replace(rawline, "")
                    child.innerHTML = firstLine + "<span>" + child.innerHTML + "</span>"
                    bq.setAttribute("data-callout", calloutType)
                    bq.setAttribute("custom-data-callout", calloutType)
                    if (child.innerText.startsWith("-")) {
                        child.innerHTML = child.innerHTML.replace("-", "")
                        bq.setAttribute("custom-data-callout-is-collapsible", true)
                        bq.setAttribute("custom-data-callout-is-collapsed", true)
                    }
                    else if (child.innerText.startsWith("+")) {
                        child.innerHTML = child.innerHTML.replace("+", "")
                        bq.setAttribute("custom-data-callout-is-collapsible", true)
                        bq.setAttribute("custom-data-callout-is-collapsed", false)
                    }
                    if (bq.getAttribute("custom-data-callout-is-collapsible")) {
                        bq.setAttribute('onclick', `
                            
                        `)
                    }
                }
            }
        )
        let meta = 渲染结果.head.querySelector("meta");
        let style = 渲染结果.createElement("style")
        style.innerHTML = `.data-link-not-inited{color:var(--b3-font-color10) !important}`
        渲染结果.head.append(style)
        meta.setAttribute("data-type", "obsidian")
        meta.setAttribute("data-path", path)
        let script = 渲染结果.createElement("script")
        script.innerHTML = `
        function handlerBq(event){
            let child = event.currentTarget.querySelector("[contenteditable] span")
            event.currentTarget.querySelectorAll("[contenteditable] *,[data-node-id]").forEach(
                event.stopPropagation()

                el=>{
                    if(!el.isSameNode(child)){
                        el.style.display!=="none"?el.style.display="none":el.style.display=""

                    }
                }
            )
        }
        setTimeout(
        ()=>{document.querySelectorAll("[custom-data-callout-is-collapsible]").forEach(
            el=>{
                console.log(el)
                el.addEventListener("click",handlerBq)
            }
        )},1000
        )
        `
        渲染结果.head.append(script)
    }
    return 渲染结果
}