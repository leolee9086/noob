import 设置 from "../config.js"
export function 生成管线渲染器(渲染管线) {
  return async (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    let 渲染结果 = new DOMParser().parseFromString("", "text/html");
    for await (let 渲染函数 of 渲染管线) {
      try {
        if (!渲染结果.querySelector) {
          let tempdoc = new DOMParser().parseFromString(
            渲染结果,
            "text/html"
          );
          渲染结果 = tempdoc;

        }
        if (渲染结果.完成) {
          return 渲染结果;
        }
        if (渲染函数 instanceof Function) {
          渲染结果 = (await 渲染函数(req, res, 渲染结果)) || "";
        }
        let 文字渲染结果 = "";
        try {
          文字渲染结果 = 渲染结果.querySelector("body").innerHTML;
        } catch (e) {
          文字渲染结果 = 渲染结果;
          let tempdoc = new DOMParser().parseFromString(
            文字渲染结果,
            "text/html"
          );
          渲染结果 = tempdoc;
          console.error(e);
        }
      } catch (e) {
        console.error(e);
        continue;
      }
    }
    if (
      渲染结果.reqHeaders &&
      渲染结果.reqHeaders["user-agent"] &&
      渲染结果.reqHeaders["user-agent"].match(
        /(iphone|ipod|android|ios|ipad|mobile)/i
      )
    ) {
      渲染结果.querySelector("#panelLeft")
        ? 渲染结果.querySelector("#panelLeft").classList.add("fn__none")
        : null;
      渲染结果.querySelector("#panelRight")
        ? 渲染结果.querySelector("#panelRight").classList.add("fn__none")
        : null;
      渲染结果.querySelector(".publishNavi .toolbarLeft")
        ? 渲染结果
          .querySelector(".publishNavi .toolbarLeft")
          .classList.add("fn__none")
        : null;
      渲染结果.querySelector(".publishNavi .toolbarRight")
        ? 渲染结果
          .querySelector(".publishNavi .toolbarRight")
          .classList.add("fn__none")
        : null;
      let fontbase = 36;
      渲染结果.querySelector("#editorFontSize").innerHTML = `
       .protyle-wysiwyg, .protyle-title {font-size:${fontbase}px !important}
.b3-typography code:not(.hljs), .protyle-wysiwyg code:not(.hljs) { font-variant-ligatures: normal }
.li > .protyle-action {height:${fontbase * 2}px;line-height: ${fontbase * 2}px}
.protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h1, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h2, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h3, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h4, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h5, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h6 {
  line-height:${fontbase * 2}px;
}
.protyle-wysiwyg [data-node-id].li > .protyle-action:after {height: ${fontbase}px;width: ${fontbase}px;margin:-${fontbase / 2
        }px 0 0 -${fontbase / 2}px}
.protyle-wysiwyg [data-node-id].li > .protyle-action svg {height: ${(fontbase * 2) / 3
        }px}
.protyle-wysiwyg [data-node-id] [spellcheck="false"] {min-height:${(fontbase * 34) / 21
        }px}
.protyle-wysiwyg .li {min-height:${(fontbase * 42) / 21}px}
.protyle-gutters button svg {height:${(fontbase * 34) / 21}px}
.protyle-wysiwyg img.emoji, .b3-typography img.emoji {width:${(fontbase * 26) / 21
        }px}
.protyle-wysiwyg .h1 img.emoji, .b3-typography h1 img.emoji {width:${(fontbase * 45) / 21
        }px}
.protyle-wysiwyg .h2 img.emoji, .b3-typography h2 img.emoji {width:${(fontbase * 40) / 21
        }px}
.protyle-wysiwyg .h3 img.emoji, .b3-typography h3 img.emoji {width:${(fontbase * 36) / 21
        }px}
.protyle-wysiwyg .h4 img.emoji, .b3-typography h4 img.emoji {width:${(fontbase * 32) / 21
        }px}
.protyle-wysiwyg .h5 img.emoji, .b3-typography h5 img.emoji {width:${(fontbase * 29) / 21
        }px}
.protyle-wysiwyg .h6 img.emoji, .b3-typography h6 img.emoji {width:${(fontbase * 26) / 21
        }px}
.b3-typography, .protyle-wysiwyg, .protyle-title, .protyle-title__input{font-family: "文泉驿等宽正黑", "quote", "Helvetica Neue", "Luxi Sans", "DejaVu Sans", "Hiragino Sans GB", "Microsoft Yahei", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", "EmojiSymbols" !important;}
.sb[data-sb-layout="col"]{
  flex-direction:column !important;
  width:100% !important
}
`;

      渲染结果.querySelector(".publishNavi").style.marginTop = "10px";
      渲染结果.querySelector(".publishNavi").style.height = `${(fontbase * 3) / 2
        }px`;
    }
    let 发布地址 = 设置.发布地址
    if (发布地址) {
      if (base) {
        let base = 渲染结果.querySelector("base");

        base.setAttribute("href", req.protocol + "://" + 设置.发布地址);
      } else {
        base = 渲染结果.createElement("base");

        base.setAttribute("href", req.protocol + "://" + 设置.发布地址);
        document.head.appendChild(base);
      }
    }

    渲染结果 = `<!DOCTYPE html>
    <html>          
    ${渲染结果.querySelector("html").innerHTML}
    </html>
    `;
    res.end(渲染结果);
    return 渲染结果
  }
}
