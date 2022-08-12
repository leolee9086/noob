export const unicode2Emoji = (unicode, assic = false) => {
    if (!unicode) {
        return "";
    }
    let emoji = "";
    if (unicode.indexOf(".") > -1) {
        emoji = `<img src="/emojis/${unicode}"/>`;
    }
    
    else {
        emoji = `<svg class="custom-icon"><use xlink:href="#icon-${unicode}"></use></svg>`;
    }
    return emoji;
};

export class publishBackground extends naive.plugin {
  constructor() {
    super({ name: publishBackground });
   
  }
  pipe=[
    this.生成文档背景图
  ]
  生成文档背景图(req,res,渲染结果){
    this.element = 渲染结果.querySelector(".protyle-background");
    this.element.className = "protyle-background";
    this.element.innerHTML = `<div class="protyle-background__img">
    <img class="fn__none">
    <div class="protyle-icons">
        <span class="protyle-icon protyle-icon--first b3-tooltips b3-tooltips__sw" style="position: relative" aria-label="${window.siyuan.languages.upload}"><input type="file" style="position: absolute;width: 22px;height: 100%;top: 0;left: 0;opacity: .001;overflow: hidden;cursor: pointer;"><svg><use xlink:href="#iconUpload"></use></svg></span>
        <span class="protyle-icon b3-tooltips b3-tooltips__sw" data-type="link" aria-label="${window.siyuan.languages.link}"><svg><use xlink:href="#iconLink"></use></svg></span>
        <span class="protyle-icon b3-tooltips b3-tooltips__sw" data-type="random" aria-label="${window.siyuan.languages.random}"><svg><use xlink:href="#iconRefresh"></use></svg></span>
        <span class="protyle-icon b3-tooltips b3-tooltips__sw fn__none" data-type="position" aria-label="${window.siyuan.languages.dragPosition}"><svg><use xlink:href="#iconMove"></use></svg></span>
        <span class="protyle-icon protyle-icon--last b3-tooltips b3-tooltips__sw" data-type="remove" aria-label="${window.siyuan.languages.remove}"><svg><use xlink:href="#iconTrashcan"></use></svg></span>
    </div>
    <div class="protyle-icons fn__none"><span class="protyle-icon protyle-icon--text">${window.siyuan.languages.dragPosition}</span></div>
    <div class="protyle-icons fn__none" style="opacity: .86;">
        <span class="protyle-icon protyle-icon--first" data-type="cancel">${window.siyuan.languages.cancel}</span>
        <span class="protyle-icon protyle-icon--last" data-type="confirm">${window.siyuan.languages.confirm}</span>
    </div>
</div>
<div class="protyle-background__tags"></div>
<div class="protyle-background__iconw">
    <div class="protyle-background__icon" data-menu="true" data-type="open-emoji"></div>
    <div class="protyle-icons fn__flex-center fn__none">
        <span class="protyle-icon protyle-icon--first b3-tooltips b3-tooltips__s" data-menu="true" data-type="tag" aria-label="${window.siyuan.languages.addTag}"><svg><use xlink:href="#iconTags"></use></svg></span>
        <span class="protyle-icon b3-tooltips b3-tooltips__s" data-type="icon" aria-label="${window.siyuan.languages.changeIcon}"><svg><use xlink:href="#iconEmoji"></use></svg></span>
        <span class="protyle-icon protyle-icon--last b3-tooltips b3-tooltips__s" data-type="random" aria-label="${window.siyuan.languages.titleBg}"><svg><use xlink:href="#iconImage"></use></svg></span>
    </div>
</div>`;
    this.tagsElement = this.element.querySelector(".protyle-background__tags");
    this.iconElement = this.element.querySelector(".protyle-background__icon");
    this.imgElement = this.element.firstElementChild.firstElementChild;
    this.imgElement.addEventListener("mousedown", (event) => {
      event.preventDefault();
      if (
        !this.element.firstElementChild
          .querySelector(".protyle-icons")
          .classList.contains("fn__none")
      ) {
        return;
      }
      const y = event.clientY;
      const documentSelf = 渲染结果;
      const height =
        (this.imgElement.naturalHeight * this.imgElement.clientWidth) /
          this.imgElement.naturalWidth -
        this.imgElement.clientHeight;
      let originalPositionY =
        parseFloat(this.imgElement.style.objectPosition.substring(7)) || 50;
      if (this.imgElement.style.objectPosition.endsWith("px")) {
        originalPositionY =
          (-parseInt(this.imgElement.style.objectPosition.substring(7)) /
            height) *
          100;
      }
      documentSelf.onmousemove = (moveEvent) => {
        this.imgElement.style.objectPosition = `center ${(
          ((y - moveEvent.clientY) / height) * 100 +
          originalPositionY
        ).toFixed(2)}%`;
        event.preventDefault();
      };
      documentSelf.onmouseup = () => {
        documentSelf.onmousemove = null;
        documentSelf.onmouseup = null;
        documentSelf.ondragstart = null;
        documentSelf.onselectstart = null;
        documentSelf.onselect = null;
      };
    });

    this.render(渲染结果.block.docInfor.ial,渲染结果.block.id)
    return 渲染结果
  }
  render(ial, id) {
    var _a;
    const img = ial["title-img"];
    const icon = ial.icon;
    const tags = ial.tags;
    this.ial = ial;
    this.element.setAttribute("data-node-id", id);
    if (tags) {
      let html = "";
      tags.split(",").forEach((item, index) => {
        html += `<div class="item item--${
          index % 4
        }" data-type="open-search">${item}<svg data-type="remove-tag"><use xlink:href="#iconClose"></use></svg></div>`;
      });
      this.tagsElement.innerHTML = html;
    } else {
      this.tagsElement.innerHTML = "";
    }
    if (icon) {
      this.iconElement.classList.remove("fn__none");
      this.iconElement.innerHTML = unicode2Emoji(icon);
      this.iconElement.style.marginLeft='16px'
    } else {
      this.iconElement.classList.add("fn__none");
    }
    if (img) {
      this.imgElement.classList.remove("fn__none");
      // 历史数据解析：background-image: url(\"assets/沙发背景墙11-20220418171700-w6vilzt.jpeg\"); background-position: center -254px; background-size: cover; background-repeat: no-repeat; min-height: 30vh
      this.imgElement.setAttribute("style", Lute.UnEscapeHTMLStr(img));
      const position =
        this.imgElement.style.backgroundPosition ||
        this.imgElement.style.objectPosition;
      const url =
        (_a = this.imgElement.style.backgroundImage) === null || _a === void 0
          ? void 0
          : _a.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
      if (img.indexOf("url(") > -1) {
        this.imgElement.removeAttribute("style");
        this.imgElement.setAttribute("src", url=="undefined"?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=":url);
        this.imgElement.style.objectPosition = position;
        this.element
          .querySelector('[data-type="position"]')
          .classList.remove("fn__none");
      } else {
        this.imgElement.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");
        this.element
          .querySelector('[data-type="position"]')
          .classList.add("fn__none");
      }
    } else {
      this.imgElement.classList.add("fn__none");
    }
    if (img) {
      this.element.style.minHeight = "30vh";
    } else if (icon) {
      this.element.style.minHeight = this.tagsElement.clientHeight + 56 + "px";
    } else if (tags) {
      this.element.style.minHeight = this.tagsElement.clientHeight + "px";
    } else {
      this.element.style.minHeight = "0";
    }
  }

}
export const dependencies = ["publishContent"];
