import { DOM监听器 } from "/script/public/DOMwatcher.js";

export class customBlock extends naive.plugin {
  constructor() {
    super({name:'customBlock'})
    naive.customHTML = []
    this.setPluginsProp('注册自定义HTML块',this.注册自定义HTML块)
    this.setPluginsProp('hackHTMLBlockAll',this.hackHTMLBlockAll)
    this.setPluginsProp('hackHTMLBlock',this.hackHTMLBlock)

    let html块监听选项 = {
      监听目标: `protyle-html`,
      监听器回调:(mutationsList, observer)=> this.html块监听器回调(mutationsList, observer),
    };
    naive.html块监听器 = new DOM监听器(html块监听选项);
    window.addEventListener("load", () => setTimeout(()=>this.hackHTMLBlockAll(), 2000));

    this.hackHTMLBlockAll();
  }
  html块监听器回调(mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.target) {
        if (mutation.target.shadowRoot) {
          this.hackHTMLBlock(mutation.target);
        }
      }
    }
  }
  注册自定义HTML块(type, constructor, options) {
    naive.customHTML ? naive.customHTML.push(type) : (naive.customHTML = []);
    naive.customHTML.push(type) 
    window.customElements.define(type, constructor, options);
    this.hackHTMLBlockAll();
  }
  hackHTMLBlockAll() {
    let htmls = document.querySelectorAll('[data-type="NodeHTMLBlock"]');
    if (htmls[0]) {
      htmls.forEach((htmlel) => {
        if (htmlel.querySelector("protyle-html")) {
          this.hackHTMLBlock(htmlel.querySelector("protyle-html"));
        }
      });
    }
  }
  hackHTMLBlock(htmlel) {
    for (let hacker of naive.customHTML) {
      let parent = htmlel.parentElement.parentElement;
      if (hacker == parent.getAttribute("custom-type")) {
        if (htmlel.parentElement.querySelector(hacker)) {
          let cusel = htmlel.parentElement.querySelector(hacker);
          cusel.setAttribute(
            "data-content",
            htmlel.getAttribute("data-content")
          );
        } else {
          let customhtml = document.createElement(hacker);
          htmlel.style.display = "none";
          customhtml.setAttribute(
            "data-content",
            htmlel.getAttribute("data-content")
          );
          htmlel.parentElement.insertBefore(customhtml, htmlel);
        }
      }
    }
  }
}
