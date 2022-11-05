import 生成渲染内容 from "./content.js"
import 生成反向链接 from "./backlink.js"
import 修改发布主题 from "../pipeRender/renders/themes.js"
import 生成大纲 from "./outline.js"
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
  //  lute.SetSuperBlock(true)
    return lute
}
window.lute = setLute()

export default [
生成渲染内容,
生成反向链接,
修改发布主题,
生成大纲
]