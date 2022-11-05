import 设置 from "../config.js"
import 核心api from "../util/kernelApi.js"
import PathConstructor from "../util/pathConstructor.js"
const pathConstructor = new PathConstructor(workspaceDir)
const _path = require("path")
const fs = require("fs-extra")
const MagicString = require("magic-string")
const fg = require("fast-glob")

//构造文件树
let list = fg.sync("**", { stats: true, cwd: 设置.obsidian库地址 })

let cachePath = _path.join(workspaceDir, 'temp', 'noobCache', 设置.obsidian库地址.replace(/\\/, '/').split('/').pop(), 'markdownFiltree.json')
if (!fs.existsSync(cachePath)) {
    let cached = []
    let count = 1
    for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i]
        item.filePath = _path.join(设置.obsidian库地址, item.path)
        if (item.name.endsWith(".md")) {
            item.markdown = fs.readFileSync(item.filePath, "utf-8",)
            if (item.markdown && item.markdown.length) {
                item=  解析文本(item)
            }
            if (cached.length >= 100) {
                count += 1
                核心api.pushMsg({ msg: `已完成markdown文件索引${100 * count}/${list.length},当前正在索引${item.path},索引完成之前可能无法渲染某些文件` }, "")
                cached = []
            }
        }
        ipcRenderer.send(
            window.id, { type: "tickTok" }
        )
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
    let count = 1
    let text = fs.readFileSync(cachePath, "utf-8")
    let fileList = list
    list = window.obsidianFileList = JSON.parse(text)

    for (let i = 0, len = list.length; i < len; i++) {

        let el = list[i]
        el.filePath = _path.join(设置.obsidian库地址, el.path)

        let { path, mtimeMs } = el
        let modified = fileList.find(
            item => {

                return item.mtimeMs && item.path == path && !(item.mtimeMs < (mtimeMs - 1000))

            }
        )
        if (modified && el.name.endsWith(".md")) {
            核心api.pushErrMsg({ msg: `文件${modified.filePath}改变,更新缓存` }, "")

            解析文本(el, true)

        } else {
            //核心api.pushMsg({ msg: `已完成markdown文件索引${cached.length}/${list.length},索引完成之前可能无法渲染某些文件` }, "")
        }
        cached.push(el)

    }
}
fs.watch(设置.obsidian库地址, {
    persistent: true,
    recursive: true,
}, (event, fileName) => {
    if (fileName) {
        console.log(fileName)
        let item = window.obsidianFileList.find(
            el => {
                return el.path == _path.join(设置.obsidian库地址, fileName) || el.filePath == _path.join(设置.obsidian库地址, fileName)
            }
        )
        if (item) {
            console.log(item)
            item = 解析文本(item, true)
            核心api.pushMsg({ msg: `文件${item.filePath}改变,更新缓存` }, "")

        }

    }
})
function 解析文本(item, flag) {
    let markdown = item.markdown
    if (!markdown || flag) {
        markdown = fs.readFileSync(item.filePath, "utf-8",)
    }
    let stringLines, lines;
    stringLines = lines = markdown.split(/\r\n\r\n|\n\n|\r\r/)
    for (let i = 0, len = lines.length; i < len; i++) {
        let line = lines[i]
        let links = []
        let magicline = new MagicString(line)

        if (line) {
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
                        let linktarget = list.find((e) => {
                            return e.path == fileName
                        })
                        if (!linktarget) {
                            linktarget = list.find((e) => {
                                return e.name == fileName
                            })
                        }
                        let path
                        if (linktarget) {
                            path = linktarget.path
                        }
                        else (
                            path = "?notfound?" + fileName
                        )
                        
                        links.push(
                            {
                                href: path,
                                query: query,
                                hrefName: fileName,
                                alias: alias
                            }
                        )
                        magicline.overwrite(start, end, `[${alias}](${path}${query})`)
                    }
                )
            }
        }
        let string = magicline.toString()

        line= lines[i] = {
            markdown: string,
        //    html: lute.Md2HTML(string),
          //   blockDOM: lute.Md2BlockDOM(string),
            links: links,
        }
      //  stringLines[i] = magicline.toString()

    }
    item["lines"] = lines
    
    //console.log(item.lines)
    //let string = stringLines.join("\r\n\r\n")
    //item.blockDOM = lute.Md2BlockDOM(string)
    //item.ast = lute.RenderJSON(string)
    return item
}
export default function (req, res, 渲染结果) {
    渲染结果.obsidian = true
    let path = req._path
    let ob文件地址 = _path.join(设置.obsidian库地址, path)
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
                if (line && line.markdown) {
                    let lineHTML = lute.Md2BlockDOM(line.markdown)
                    DOM += lineHTML
                }
            }
        )
    }
    let content = html.querySelector("[data-doc-type]");
    content.innerHTML = DOM
    if (!item.blockDOM) {
        解析文本(item)
    }
 
    渲染结果.querySelectorAll("[contenteditable]").forEach(
        el=>el.setAttribute('contenteditable',false)
    )
    渲染结果.metadata=item
    return 渲染结果
}
