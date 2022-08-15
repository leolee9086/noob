import { DOM监听器 } from "/script/public/DOMwatcher.js";

export class linkCard extends naive.plugin {
  constructor() {
    super({ name: "linkCard" });
    window.requestAnimationFrame(() => this.hackLink());
    this.icons = naive.fs.readdirSync(
      naive.pathConstructor.naivePath() +
        "/script/plugin/corePlugins/linkCard/icon4Tsundoku"
    );
    window.siyuan.ws.ws.addEventListener("message", () => {
      this.hackLink();
    });
    document.addEventListener("mouseover", () => {
      this.hackLink();
    });
    let 监听选项1 = {
      监听目标: `[data-node-id]`,
      监听器回调: () => this.hackLink(),
    };
    this.DOM监听器1 = new DOM监听器(监听选项1);

  }
  hackLink() {
    try{
    let links = document.querySelectorAll(
      '.protyle-wysiwyg.protyle-wysiwyg--attr [data-node-id] span[data-type="a"]'
    );
    links.forEach((link) => {
      if (link.dataset.title && link.dataset.title.indexOf("card:") >= 0) {
        if (!link.shadowRoot||!link.shadowRoot.innerHTML||!link.shadowRoot.querySelector("img")) {
          this.attachLinkShadow(link);
        } else {
          let src = this.getImg(link.dataset.href);
          if (
            link.shadowRoot.querySelector("img").getAttribute("src") !== src
          ) {
            link.shadowRoot.querySelector("img").setAttribute("src", src);
           
          }
          if (link.dataset.title) {
            link.shadowRoot.querySelector(".LinkCard-title").innerText =
              link.dataset.title.slice(5);
          }
          if (link.dataset.href) {
              link.shadowRoot.querySelector(".LinkCard-href").innerText =
              link.dataset.href
            }

        }
      }
      else{
        link.shadowRoot?link.shadowRoot.innerHTML=`<span>${link.innerHTML}</span>`:null
      }
    });
  }catch(e){}
  }
  attachLinkShadow(a) {
    a.shadowRoot?a.shadowRoot.innerHTML='':null
  
    let linkStyle = document.createElement("style");
    linkStyle.innerHTML = `
    .LinkCard:hover{
        background-color:var(--b3-theme-primary-lightest) !important
    }
    .LinkCard{
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    box-sizing: border-box;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 60%;
    min-height: 84px;
    border-radius: 8px;
    max-width: 100%;
    overflow: hidden;
    margin: 16px auto;
    padding: 12px 12px 9px 12px;
    background-color: #F6F6F6;
    text-decoration:none 
  }
  .LinkCard-contents {
    display: block;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    position: relative;
    white-space:normal !important;
}
.LinkCard-image {
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    background-color:var(--b3-theme-surface);
    background-size: cover;
    background-position: center;
    position: relative;
    display: block;
    width: 60px;
    height: 60px;
    margin-left: 20px;
    object-fit: cover;
    border-radius: inherit;
    overflow: hidden;
}
.LinkCard-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    position: absolute;
}

.LinkCard-title {
    line-height: 20px;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    color:var(--b3-theme-on-surface);
    -webkit-box-orient: vertical;
    
    -webkit-line-clamp: 2;

}
.LinkCard-href{
    line-height: 15px;
    font-size:15px;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    color:var(--b3-theme-on-surface);
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;

}
  `;
    let shadow = a.shadowRoot?a.shadowRoot:a.attachShadow({ mode: "open" });

    shadow.innerHTML += `<div class="LinkCardContainer">
            <a class='LinkCard' href='${a.dataset.href}'>
                <span class='LinkCard-contents'>
                    <span class='LinkCard-title'>${a.dataset.title.slice(
                      5
                    )}</span>
                    <span class='LinkCard-href'>${a.dataset.href
                      }</span>
                </span>
                <span class="LinkCard-image">
                <img src="${this.getImg(a.dataset.href)}"></img>
            </span>

            </a>
        </div>`;
    shadow.appendChild(linkStyle);
  }
  getImg(href) {
    let iconNameRes =
      naive.pathConstructor.naivePath() +
      "/script/plugin/corePlugins/linkCard/icon4Tsundoku/" +
      "link2.svg";
    this.icons.forEach((iconName) => {
      if (iconName && iconName.split) {
        let iconURL = iconName.split(".")[0].replace("_", ".");
        if (href && href.indexOf(iconURL) >= 0) {
          iconNameRes =
            naive.pathConstructor.naivePath() +
            "/script/plugin/corePlugins/linkCard/icon4Tsundoku/" +
            iconName;
        }
      }
    });
    return iconNameRes;
  }
}
export const environments = ["APP"];
