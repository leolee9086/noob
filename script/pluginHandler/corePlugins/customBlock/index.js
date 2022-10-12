import { DOM监听器 } from "/script/public/DOMwatcher.js";
import { 驼峰转换 } from "/script/public/util/name.js";
///#ifAPP
const {fs} = naive.serverUtil
///#endif
export class customBlock extends naive.plugin {
  constructor() {
    super({name:'customBlock'})
    naive.customHTML = []
    this.setPluginsProp({中文:'注册自定义HTML块'},this.注册自定义HTML块)
    this.setPluginsProp({中文:"劫持所有自定义HTML块",en:'hackHTMLBlockAll'},this.hackHTMLBlockAll)
    this.setPluginsProp({中文:"劫持自定义块",en:'hackHTMLBlock'},this.hackHTMLBlock)
    let html块监听选项 = {
      监听目标: `protyle-html`,
      监听器回调:(mutationsList, observer)=> this.html块监听器回调(mutationsList, observer),
    };
    ///#ifAPP
    this.注入自定义元素()
    naive.html块监听器 = new DOM监听器(html块监听选项);
    window.addEventListener("load", () => setTimeout(()=>this.hackHTMLBlockAll(), 2000));
    this.hackHTMLBlockAll();
        ///#endif

  }
  注入自定义元素(){
    let path = this.initFolder()
    let array = fs.readdirSync(path)
    array.forEach(
      name=>this.从文件加载自定义元素(name)
    )
  }
  async  从文件加载自定义元素(name){
    let path =""
    if(name.endsWith('.js')){
      path = this.initFolder()+"/"+name
      let module = await import(path)
      let constructor = module[name.substring(0,name.length-3)]||module['customBlock']
      let options =  module["options"]
      let type = 驼峰转换(name.substring(0,name.length-3))
      this.注册自定义HTML块(type,constructor,options)
    }
    if(name.endsWith('.vue')){
      path = this.initFolder()+"/"+name
      let module = await import(path)
      let constructor = module[name.substring(0,name.length-3)]||module['customBlock']
      let options =  module["options"]
      let type = 驼峰转换(name.substring(0,name.length-3))
      this.注册自定义HTML块(type,constructor,options)
    }
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
    if(!naive.customHTML){
      naive.customHTML=[]
    } 
    window.customElements.define(type, constructor, options);
    try{
      document.createElement(type)
      naive.customHTML.push(type) 
    }catch(e){
      console.log(`注册自定义HTML块${type}失败，但${type}仍有可能作为自定义元素使用`,e)
    }
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
        if (htmlel.parentElement.querySelector(hacker)&&htmlel.parentElement.querySelector(hacker).parentElement==htmlel.parentElement) {
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
