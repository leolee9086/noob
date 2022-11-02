import 设置 from "../config.js"
const _path = require("path")
const fs = require("fs-extra")
const MagicString = require("magic-string")
export default function (req, res, 渲染结果) {
    渲染结果.obsidian = true
    let path = req._path
    let ob文件地址 = _path.join(设置.obsidian库地址, path)
    console.log(req)
    console.log(ob文件地址)
    if(!fs.existsSync(ob文件地址)){
        ob文件地址=ob文件地址+'.md'
    }
    if (fs.existsSync(ob文件地址)) {
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
        let PageTemplate = fs.readFileSync(
            设置.templatePath + "/defaultPage.html",
            "utf8"
        );
        let html = 渲染结果.querySelector("html");
        html.innerHTML = PageTemplate;
        let content = html.querySelector("[data-doc-type]");
        let text = fs.readFileSync(ob文件地址, "utf-8")
        console.log(text)
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
                            console.log(line.substring(start, end))
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
                            if(fs.existsSync(_path.join(设置.obsidian库地址,_path.dirname(path),`${name}.md`))){
                                name = _path.join(_path.dirname(path),`${name}.md`)
                            }
                            if(fs.existsSync(_path.join(设置.obsidian库地址,_path.dirname(path),`${name}`,`index.md`))){
                                name = _path.join(_path.dirname(path),`${name}/index.md`)
                            }
                            name = name.replace("#","?title=")
                            name = name.replace("^","?id=")

                            magicline.overwrite(start, end, `[${alias}](${name})`)
                            console.log(name, alias)

                        }
                    )
                }
                console.log(magicline.toString())
                lines[i] = magicline.toString()
            }
        )
        text = lines.join("\r\n")
        content.innerHTML = lute.Md2HTML(text)
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
                            className?child.classList.add(className):null
                        }
                    )
                }
            }
        )
    let meta = 渲染结果.head.querySelector("meta");
    meta.setAttribute("data-type", "obsidian")
    meta.setAttribute("data-path", path)
}
return 渲染结果
}