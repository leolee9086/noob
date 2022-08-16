import { DOM监听器 } from "/script/public/DOMwatcher.js";

const hideElements = (panels, protyle) => {
  if (!protyle) {
    if (panels.includes("dialog")) {
      for (let i = 0; i < window.siyuan.dialogs.length; i++) {
        if (window.siyuan.dialogs[i].destroy()) {
          i--;
        }
      }
    }
    return;
  }
  if (panels.includes("hint")) {
    clearTimeout(protyle.hint.timeId);
    protyle.hint.element.classList.add("fn__none");
  }
  if (protyle.gutter && panels.includes("gutter")) {
    protyle.gutter.element.classList.add("fn__none");
    protyle.gutter.element.innerHTML = "";
    // https://ld246.com/article/1651935412480
    protyle.wysiwyg.element
      .querySelectorAll(".protyle-wysiwyg--hl")
      .forEach((item) => {
        item.classList.remove("protyle-wysiwyg--hl");
      });
  }
  if (protyle.toolbar && panels.includes("toolbar")) {
    protyle.toolbar.element.classList.add("fn__none");
  }
  if (protyle.toolbar && panels.includes("util")) {
    const pinElement =
      protyle.toolbar.subElement.querySelector('[data-type="pin"]');
    if (
      !pinElement ||
      (pinElement && !pinElement.classList.contains("ft__primary"))
    ) {
      protyle.toolbar.subElement.classList.add("fn__none");
    }
  }
  if (panels.includes("select")) {
    protyle.wysiwyg.element
      .querySelectorAll(".protyle-wysiwyg--select")
      .forEach((item) => {
        item.classList.remove("protyle-wysiwyg--select");
      });
  }
};
const disabledProtyle = (protyle) => {
  hideElements(["gutter", "toolbar", "select", "hint", "util"], protyle);
  protyle.disabled = true;
  protyle.wysiwyg.element.setAttribute("contenteditable", "false");
  protyle.wysiwyg.element
    .querySelectorAll('[contenteditable="true"][spellcheck="false"]')
    .forEach((item) => {
      item.setAttribute("contenteditable", "false");
    });
};
export class protyleEditor extends naive.plugin {
  constructor() {
    super({ name: protyleEditor });

    window.siyuan.ws.ws.addEventListener("message", () => {
      this.hackBacklink();
    });
    document.addEventListener("mouseover", () => {
      this.hackBacklink();
    });
    let 监听选项1 = {
      监听目标: `[data-node-id]`,
      监听器回调: () => this.hackBacklink(),
    };
   
    this.DOM监听器1 = new DOM监听器(监听选项1);

    this.hackBacklink();
    /*shadowDocument.body.appendChild(editorElement)
        let styles=  document.head.querySelectorAll('style')
        styles.forEach(
            style=>{
                let  shadowStyle=style.cloneNode(true)
                shadowDocument.head.appendChild(shadowStyle)
                
            }
        )
        let links =document.head.querySelectorAll('link')
        links.forEach(
            style=>{
                let  shadowStyle=style.cloneNode(true)
                shadowDocument.head.appendChild(shadowStyle)
                if (shadowStyle.getAttribute('href').startsWith('base')){
                    let href= shadowStyle.getAttribute('href')
                    href ='/stage/build/app/'+href
                    shadowStyle.setAttribute('href',href)
                }
            }
        )
        let Protyle =window.siyuan.layout.centerLayout.children[0].children[0].model.editor.__proto__.constructor 
        console.log('protyleEditor',Protyle)
        new Protyle(editorElement, {
            blockId: "20201117101902-2ewjjum",
            hasContext: false,
            action: ["cb-get-all"],
            render: {
                gutter: true,
                breadcrumbDocName: false,
                breadcrumbContext: false
            },
            typewriterMode: false,
            after: (editor) => {
                if (window.siyuan.config.readonly) {
                    disabledProtyle(editor.protyle);
                }
                editorElement.addEventListener("mouseleave", () => {
                    hideElements(["gutter"], editor.protyle);
                });
            }
        });*/
  }
  async hackBacklink() {
    let 目标元素组 = document.querySelectorAll(
      `.backlinkList.fn__flex-1 ul [data-treetype="backlink"] .b3-list-item__text,.backlinkMList.fn__flex-1 ul [data-treetype="backlink"] .b3-list-item__text`
    );
    let 目标元素组1 = document.querySelectorAll(
      ".protyle-wysiwyg__embed:not(.protyle-wysiwyg__embed .protyle-wysiwyg__embed)"
    );
    this.createEditor(目标元素组);
    this.createEditor(目标元素组1);

    //window.requestAnimationFrame(async() => this.hackBacklink())
  }
  createEditor(目标元素组) {
    this.渲染计数器=0
    目标元素组.forEach(async (块元素,i) =>
      setTimeout(() => {
        if (块元素.parentElement.dataset.type == "NodeDocument") {
          this.渲染计数器-=1
          return;
        }
        if (!this.isInViewPort(块元素)) {
          this.渲染计数器-=1
          if(块元素.shadowRoot){
            let element = 块元素.shadowRoot.querySelector("iframe");
            element.setAttribute('src','')
          }
          return;
        }
        if(this.渲染计数器>10){
          return
        }
        this.渲染计数器+=1
        if (!块元素.shadowRoot) {
          块元素.attachShadow({ mode: "open" });
          let editorElement = document.createElement("div");
          let element = document.createElement("iframe");
          element.classList.add(
            "block__popover",
            "block__popover--move",
            "block__popover--top"
          );
          element.setAttribute("loading", 'lazy');

          element.setAttribute("border", 0);
          element.setAttribute("width", "100%");
          element.setAttribute("frameBorder", "none");
          element.setAttribute(
            "src",
            `/stage/build/mobile/?hideToolBar=true&&id=${
              (块元素.dataset && 块元素.dataset.id) ||
              块元素.previousElementSibling.dataset.id
            }`
          );
          editorElement.className = "block__edit  fn__flex-1 protyle";
          块元素.shadowRoot.appendChild(element);
        } else {
          let element = 块元素.shadowRoot.querySelector("iframe");
          if (
            element &&
            element.getAttribute("src") !==
              `/stage/build/mobile/?hideToolBar=true&&id=${
                (块元素.dataset && 块元素.dataset.id) ||
                块元素.previousElementSibling.dataset.id
              }`
          ) {
            element.setAttribute(
              "src",
              `/stage/build/mobile/?hideToolBar=true&&id=${
                (块元素.dataset && 块元素.dataset.id) ||
                块元素.previousElementSibling.dataset.id
              }`
            );
          }
        }
      }, 10)
    );
  }
  isInViewPort(element) {
    const viewWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const { top, right, bottom, left } = element.getBoundingClientRect();

    return top >= -100 && left >= -100 && right <= viewWidth+200 && bottom <= viewHeight+200;
  }
}
export const environments = ["APP"];
