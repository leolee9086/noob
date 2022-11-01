import 设置 from "../../config.js"
import 核心api from "../../util/kernelApi.js"
import i18n from "../../config.js"
const fs =require("fs-extra")

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
  
  
  export function 生成文档背景图(req,res,渲染结果){
    let element = 渲染结果.querySelector(".protyle-background");
    element.className = "protyle-background";
    element.innerHTML = `<div class="protyle-background__img">
    <img class="fn__none">
    <div class="protyle-icons">
        <span class="protyle-icon protyle-icon--first b3-tooltips b3-tooltips__sw" style="position: relative" aria-label="${i18n.upload}"><input type="file" style="position: absolute;width: 22px;height: 100%;top: 0;left: 0;opacity: .001;overflow: hidden;cursor: pointer;"><svg><use xlink:href="#iconUpload"></use></svg></span>
        <span class="protyle-icon b3-tooltips b3-tooltips__sw" data-type="link" aria-label="${i18n.link}"><svg><use xlink:href="#iconLink"></use></svg></span>
        <span class="protyle-icon b3-tooltips b3-tooltips__sw" data-type="random" aria-label="${i18n.random}"><svg><use xlink:href="#iconRefresh"></use></svg></span>
        <span class="protyle-icon b3-tooltips b3-tooltips__sw fn__none" data-type="position" aria-label="${i18n.dragPosition}"><svg><use xlink:href="#iconMove"></use></svg></span>
        <span class="protyle-icon protyle-icon--last b3-tooltips b3-tooltips__sw" data-type="remove" aria-label="${i18n.remove}"><svg><use xlink:href="#iconTrashcan"></use></svg></span>
    </div>
    <div class="protyle-icons fn__none"><span class="protyle-icon protyle-icon--text">${i18n.dragPosition}</span></div>
    <div class="protyle-icons fn__none" style="opacity: .86;">
        <span class="protyle-icon protyle-icon--first" data-type="cancel">${i18n.cancel}</span>
        <span class="protyle-icon protyle-icon--last" data-type="confirm">${i18n.confirm}</span>
    </div>
  </div>
  <div class="protyle-background__tags"></div>
  <div class="protyle-background__iconw">
    <div class="protyle-background__icon" data-menu="true" data-type="open-emoji"></div>
    <div class="protyle-icons fn__flex-center fn__none">
        <span class="protyle-icon protyle-icon--first b3-tooltips b3-tooltips__s" data-menu="true" data-type="tag" aria-label="${i18n.addTag}"><svg><use xlink:href="#iconTags"></use></svg></span>
        <span class="protyle-icon b3-tooltips b3-tooltips__s" data-type="icon" aria-label="${i18n.changeIcon}"><svg><use xlink:href="#iconEmoji"></use></svg></span>
        <span class="protyle-icon protyle-icon--last b3-tooltips b3-tooltips__s" data-type="random" aria-label="${i18n.titleBg}"><svg><use xlink:href="#iconImage"></use></svg></span>
    </div>
  </div>`;
    let tagsElement = element.querySelector(".protyle-background__tags");
    let iconElement = element.querySelector(".protyle-background__icon");
   let  imgElement = element.firstElementChild.firstElementChild;
    imgElement.addEventListener("mousedown", (event) => {
      event.preventDefault();
      if (
        !element.firstElementChild
          .querySelector(".protyle-icons")
          .classList.contains("fn__none")
      ) {
        return;
      }
      const y = event.clientY;
      const documentSelf = 渲染结果;
      const height =
        (imgElement.naturalHeight * imgElement.clientWidth) /
          imgElement.naturalWidth -
        imgElement.clientHeight;
      let originalPositionY =
        parseFloat(imgElement.style.objectPosition.substring(7)) || 50;
      if (imgElement.style.objectPosition.endsWith("px")) {
        originalPositionY =
          (-parseInt(imgElement.style.objectPosition.substring(7)) /
            height) *
          100;
      }
      documentSelf.onmousemove = (moveEvent) => {
        imgElement.style.objectPosition = `center ${(
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
  
    render(渲染结果.block.docInfor.ial,渲染结果.block.id,element,iconElement,imgElement,tagsElement)
    return 渲染结果
  }
  export function render(ial, id,element,iconElement,imgElement,tagsElement) {
    let _a;
    const img = ial["title-img"];
    const icon = ial.icon;
    const tags = ial.tags;
    ial = ial;
    element.setAttribute("data-node-id", id);
    if (tags) {
      let html = "";
      tags.split(",").forEach((item, index) => {
        html += `<div class="item item--${
          index % 4
        }" data-type="open-search">${item}<svg data-type="remove-tag"><use xlink:href="#iconClose"></use></svg></div>`;
      });
      tagsElement.innerHTML = html;
    } else {
      tagsElement.innerHTML = "";
    }
    if (icon) {
      iconElement.classList.remove("fn__none");
      iconElement.innerHTML = unicode2Emoji(icon);
      iconElement.style.marginLeft='16px'
    } else {
      iconElement.classList.add("fn__none");
    }
    if (img) {
      imgElement.classList.remove("fn__none");
      // 历史数据解析：background-image: url(\"assets/沙发背景墙11-20220418171700-w6vilzt.jpeg\"); background-position: center -254px; background-size: cover; background-repeat: no-repeat; min-height: 30vh
      imgElement.setAttribute("style", Lute.UnEscapeHTMLStr(img));
      const position =
        imgElement.style.backgroundPosition ||
        imgElement.style.objectPosition;
      const url =
        (_a = imgElement.style.backgroundImage) === null || _a === void 0
          ? void 0
          : _a.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
      if (img.indexOf("url(") > -1) {
        imgElement.removeAttribute("style");
        imgElement.setAttribute("src", url=="undefined"?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=":url);
        imgElement.style.objectPosition = position;
        element
          .querySelector('[data-type="position"]')
          .classList.remove("fn__none");
      } else {
        imgElement.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");
        element
          .querySelector('[data-type="position"]')
          .classList.add("fn__none");
      }
    } else {
      imgElement.classList.add("fn__none");
    }
    if (img) {
      element.style.minHeight = "30vh";
    } else if (icon) {
      element.style.minHeight = tagsElement.clientHeight + 56 + "px";
    } else if (tags) {
      element.style.minHeight = tagsElement.clientHeight + "px";
    } else {
      element.style.minHeight = "0";
    }
  }
  
  
  