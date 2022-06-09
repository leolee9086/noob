import { 生成默认设置 } from "./public/configer.js";
import { 事件总线 } from "./public/eventBus.js";
import { kernalApiList } from "./public/kernalApi.js";
import { 加载插件 } from "./plugin/pluginLoader.js";
import { 加载核心插件 } from "./plugin/pluginLoader.js";
import { 加载图标 } from "./ui/icon.js";
import { 注册图标 } from "./ui/icon.js";
import { 窗口配置器 } from "./ui/page.js";
import { DOM监听器 } from "./public/DOMwatcher.js";
import { 主题插件 } from "./plugin/plugin.js";
import { 主题界面 } from "./ui/ui.js";
import { 共享数据总线 } from "./public/eventChannel.js";
import { 快捷键监听器 } from "./public/keymap.js";
import { 添加行内样式 } from "./util/font.js";
import { dom模板 } from "./public/domTemplate.js";
export default class naive {
  constructor(themeName) {
    this.themeName = themeName;
    if (window.siyuan) {
      this.workspaceDir = window.siyuan.config.system.workspaceDir;
      this.siyuan = window.siyuan;
    }
    this.加载核心插件 = 加载核心插件;
    this.竖线菜单设置 = { 菜单项目列表: [], 唤起词最大长度: 0 };
    this.根目录 = `/appearance/themes/${this.themeName}`;
    this.核心插件文件夹url = `/appearance/themes/${this.themeName}/script/plugin/corePlugins/`;
    this.插件文件夹url = `/appearance/themes/${this.themeName}/script/plugin/corePlugins/`;

    this.核心插件列表 = {
      configPages: ["app"],
    };
    this.corePlugins = {};
    this.初始化核心插件();
    this.plugin = 主题插件;
    window.addEventListener("keyup", (event) => this.判断键盘目标(event));
  }
  填充菜单内容(菜单容器元素, 菜单项目列表) {
    菜单项目列表.forEach((菜单项目) =>
      菜单项目 ? 菜单容器元素.appendChild(this.生成竖线菜单项(菜单项目)) : null
    );
    菜单容器元素.addEventListener("click", () => 菜单容器元素.remove());
    window.addEventListener("click", () => 菜单容器元素.remove(), {
      once: true,
    });
  }
  判断唤起词(event) {
    let 唤起词最大长度 = window.naive.竖线菜单设置["唤起词最大长度"];
    let node = getSelection().getRangeAt(0).commonAncestorContainer;
    window.naive.竖线菜单设置.菜单项目列表.forEach((菜单项目) => {
      if (
        node.nodeValue &&
        菜单项目.唤起词列表.indexOf(
          node.nodeValue.substring(node.nodeValue.lastIndexOf("|") + 1)
        ) >= 0
      ) {
        let 旧竖线菜单 = document.getElementById("customMenu");

        let 回调函数 = 菜单项目.回调函数.bind(菜单项目.注册插件);
        回调函数(event);
        旧竖线菜单.remove();
        window.removeEventListener("keyup", window.naive.判断唤起词);
      }
    });
    if (
      node.nodeValue &&
      node.nodeValue.substring(node.nodeValue.lastIndexOf("|") + 1).length <
        唤起词最大长度
    ) {
      let el = null;
      el = node.nodeType === 1 ? node : node.parentElement;
      let 旧竖线菜单 = document.getElementById("customMenu");
      旧竖线菜单 ? 旧竖线菜单.remove() : null;
      window.naive.渲染竖线菜单(event, el, node, true);
    } else {
      window.removeEventListener("keyup", window.naive.判断唤起词);
    }
    if (node.nodeValue && node.nodeValue.lastIndexOf("|") == -1) {
      let 旧竖线菜单 = document.getElementById("customMenu");
      旧竖线菜单 ? 旧竖线菜单.remove() : null;
      window.removeEventListener("keyup", window.naive.判断唤起词);
    }

    if (!node.nodeValue) {
      let 旧竖线菜单 = document.getElementById("customMenu");

      旧竖线菜单 ? 旧竖线菜单.remove() : null;
      window.removeEventListener("keyup", window.naive.判断唤起词);
    }
  }
  渲染竖线菜单(event, el, node, force) {
    //console.log(event,el,getSelection().getRangeAt(0))
    let range = getSelection().getRangeAt(0);
    let 旧竖线菜单 = document.getElementById("customMenu");
    旧竖线菜单 ? 旧竖线菜单.remove() : null;
    this.竖线菜单设置.当前节点 = node;
    this.竖线菜单设置.当前元素 = el;
    //console.log(node.nodeValue.lastIndexOf('|'),node.nodeValue.length)
    if (
      node &&
      node.nodevalue &&
      node.nodeValue.lastIndexOf("|") !== node.nodeValue.length - 1 &&
      !force
    )
      return null;
    let rect = range.getBoundingClientRect();
    //console.log(rect.left,rect.top)
    const 竖线菜单 = this.生成悬浮菜单(rect);
    this.填充菜单内容(竖线菜单, this.竖线菜单设置.菜单项目列表);
    document.body.appendChild(竖线菜单);
    window.addEventListener("keyup", this.判断唤起词);
  }

  生成悬浮菜单(position) {
    let 悬浮菜单 = document.getElementById("customMenu");
    if (!悬浮菜单) {
      悬浮菜单 = document.createElement("div");
      悬浮菜单.setAttribute("id", "customMenu");
    }
    //   悬浮菜单.setAttribute("id",id)
    悬浮菜单.setAttribute("class", "b3-menu");
    悬浮菜单.setAttribute(
      "style",
      `max-height: 402px; width: 200px;top:${position.top - 28 + "px"};left:${
        position.left + 28 + "px"
      }`
    );
    return 悬浮菜单;
  }
  生成竖线菜单项(菜单项目) {
    let 菜单项目元素 = document.createElement("button");
    菜单项目元素.setAttribute("class", "b3-menu__item");
    菜单项目元素.setAttribute("data-value", 菜单项目.数据值);
    菜单项目元素.setAttribute("style", "width:100%;display:block");
    菜单项目元素.innerHTML = `
      <svg class="b3-menu__icon">
      <use xlink:href="${菜单项目.菜单图标 || "#iconFile"}">
      </use></svg>
      <span class="b3-menu__label">
      ${菜单项目.菜单文字}
      </span>
      <span class="b3-menu__accelerator">${菜单项目.唤起词列表[0]}</span>
      `;
    let 回调函数 = 菜单项目.回调函数.bind(菜单项目.注册插件);

    菜单项目元素.addEventListener("click", 回调函数);
    菜单项目元素.addEventListener("mouseover", () =>
      菜单项目元素.classList.add("b3-menu__item--current")
    );
    菜单项目元素.addEventListener("mouseout", () =>
      菜单项目元素.classList.remove("b3-menu__item--current")
    );

    return 菜单项目元素;
  }
  async 加载模块(路径, 模块名, 相对, base) {
    if (相对) {
      if (base) {
        路径 = this.bindURL(路径, base);
      } else {
        路径 = this.bindURL(
          路径,
          `http://${window.location.host}/appearance/themes/${this.themeName}/`
        );
      }
    }
    if (模块名) {
      await import(路径).then((module) => {
        naive[模块名] = module[模块名];
      });
      console.log("自", 路径, "加载", 模块名);
    }
  }
  判断键盘目标(event) {
    console.log(event);
    let target = event.target;

    let node = getSelection().getRangeAt(0).commonAncestorContainer;
    let el = null;
    el = node.nodeType === 1 ? node : node.parentElement;
    if (this.判定触发键(event)) {
      this.渲染竖线菜单(event, el, node);
    }
    if(document.querySelector("#customMenu")){
      this.切换激活菜单项(document.querySelector("#customMenu"),event)
    }
  }
  切换激活菜单项(el,event){
    if(!el.querySelector(".b3-menu__item--current")){
      el.firstElementChild.classList.add("b3-menu__item--current")
    }
    
  }
  判定触发键(event) {
    if (
      event.key == "|" ||
      ("Process" && event.shiftKey && event.code == "Backslash")
    ) {
      return true
    }
  }

  bindURL(url, baseURL) {
    console.log(baseURL);
    let realURL = new URL(url, baseURL);
    return realURL.href;
  }
  初始化核心插件() {
    for (let 插件名 in this.核心插件列表) {
      let 插件环境配置 = this.核心插件列表[插件名];
      for (let 环境 in 插件环境配置) {
        this.加载核心插件(插件名, 插件环境配置[环境]);
      }
    }
  }
}
