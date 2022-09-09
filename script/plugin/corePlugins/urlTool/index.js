
export class urlTool extends naive.plugin {
  constructor() {
    super({ name: "urlTool" });
    this.打开URL中的块id();
  }
  获取url参数(参数名) {
    const search = location.search; // 返回类似于 ?a=10&b=20&c=30
    const obj = new URLSearchParams(search);
    return obj.get(参数名);
  }
  打开块id(块id, hideToolBar) {
    if (!块id) {
      return;
    }
    //获取编辑器作为目标
    let 临时目标1 = document.querySelector(
      ".protyle-wysiwyg.protyle-wysiwyg--attr"
    )

    let 临时目标 = document.querySelector(
      ".protyle-breadcrumb>.protyle-breadcrumb__bar"
    );
    if (临时目标1&&临时目标) {
      let link=document.createElement('span')
      link.dataset.type = "block-ref"
      link.dataset.id=块id
      console.log(临时目标1,link)
      临时目标1.appendChild(link)
      let event = new MouseEvent("click");
      link.dispatchEvent(event)
      link.remove()

      let crumb = document.createElement("span");
      crumb.className = "protyle-breadcrumb__item";
      crumb.setAttribute("data-node-id", 块id);
      临时目标.appendChild(crumb);
      crumb.click();
      crumb.remove();
      try {
        hideToolBar
          ? document.querySelector(".toolbar").classList.add("fn__none")
          : null;
          hideToolBar
          ? document.querySelector(".protyle-background").classList.add("fn__none")
          : null;

        let edit = document
          .querySelector(".toolbar")
          .querySelector(`#toolbarEdit`);
        let event = new MouseEvent("click");
        edit.firstElementChild.getAttribute("xlink:href") === "#iconEdit"
          ? edit.dispatchEvent(event)
          : null;
      } catch (e) {
        console.log(e);
      }
      if (window.frameElement) {
        setTimeout(() => {
          window.frameElement.style.height =
            document.querySelector(".protyle-content").scrollHeight + "px";
          document
            .addEventListener("mousedown", (e) => {
              if (e.target && e.target.dataset.type == "block-ref") {
                e.stopPropagation()
                e.preventDefault()
                let 临时目标1 = window.parent.document.querySelector(
                  ".protyle-wysiwyg.protyle-wysiwyg--attr"
                );
                let crumb1 = e.target.cloneNode()
                临时目标1.appendChild(crumb1);
                crumb1.click();
                crumb1.remove();
              }
            });

        }, 500);
      }
    } else {
      window.requestAnimationFrame(() => this.打开块id());
    }
  }
  打开URL中的块id() {
    let 块id = this.获取url参数("blockid") || this.获取url参数("id");
    let hideToolBar = this.获取url参数("hideToolBar");
    this.打开块id(块id, hideToolBar);
  }
}
