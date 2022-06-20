import { 生成默认设置 } from "./public/configer.js";
import { 事件总线 } from "./public/eventBus.js";
import { kernelApiList } from "./public/kernelApi.js";
import { 加载插件 } from "./plugin/pluginLoader.js";
import { 加载核心插件 } from "./plugin/pluginLoader.js";
import { 加载图标 } from "./ui/icon.js";
import { 注册图标 } from "./ui/icon.js";
import { 窗口配置器 } from "./ui/page.js";
import { 主题插件 } from "./plugin/plugin.js";
import { 主题界面 } from "./ui/ui.js";
import { 共享数据总线 } from "./public/eventChannel.js";
import { 快捷键监听器 } from "./public/keymap.js";
import { 添加行内样式 } from "./util/font.js";
import { dom模板 } from "./public/domTemplate.js";
import { DOM监听器 } from "./public/DOMwatcher.js";
import html2canvas from './public/static/html2canvas.esm.js';

export default class naive {
  constructor(themeName) {
    if (window.siyuan) {
      this.workspaceDir = window.siyuan.config.system.workspaceDir;
      this.siyuan = window.siyuan;
    }

    if(window.require){
    this.fs = require("fs");
    this.path = require("path");
    this.domtoimage=require(this.workspaceDir+"/conf/appearance/themes/naive/script/public/static/domtoimage");
}
    this.html2canvas=html2canvas;

    this.themeName = themeName;
    this.editor = {};
    this.editor.footerWidget = "cc-template";
    this.configURL = " /appearance/themes/naive/config";
    this.插件文件夹路径 = `/data/widgets/naivePlugins`;
    this.核心插件文件夹url =
      "/appearance/themes/naive/script/plugin/corePlugins";
    this.根目录 = `/appearance/themes/${this.themeName}`;
    this.核心插件文件夹url = `/appearance/themes/${this.themeName}/script/plugin/corePlugins/`;
    this.插件文件夹url = "/widgets/naivePlugins/";
    this.竖线菜单设置 = { 菜单项目列表: [], 唤起词最大长度: 0 };
    this.核心插件列表 = {
      configPages: ["app"],
    };
    this.HTMLElement = window.HTMLElement

    this.自定义HTML={}
    this.customHTML=this.自定义HTML
    this.corePlugins = {};
    this.publishPlugins = {};
    this.util = {};
    this.kernelApi = new kernelApiList();
    this.核心api = this.kernelApi;
    this.DOM监听器 = DOM监听器;
    this.事件总线 = new 事件总线();
    this.加载图标 = 加载图标;
    this.全局快捷键监听器 = new 快捷键监听器(document);
    this.加载图标();
    this.窗口设置 = {};
    this.子窗口配置 = {};
    this.当前块元素数组 = [];
    this.eventBus = this.事件总线;
    this.isApp = window.require ? true : false;
    this.生成默认设置=生成默认设置
    
    this.设置 = 生成默认设置({}, this.workspaceDir, "",this.插件文件夹url);
    this.加载图标 = 加载图标;
    this.打开服务器设置窗口 = 窗口配置器.打开服务器设置窗口;
    this.打开样式设置窗口 = 窗口配置器.打开样式设置窗口;
    this.编辑器队列 = [];
    this.注册图标 = 注册图标;
    this.自定义块标菜单 = [];
    this.自定义头图菜单 = [];
    this.自定义导出按钮= {}
    this.加载插件 = 加载插件;
    this.plugins = {};
    this.dom模板 = dom模板;
    this.加载核心插件 = 加载核心插件;
    this.初始化核心插件();
    this.plugin = 主题插件;
    window.addEventListener("keyup", (event) => this.判断键盘目标(event));
    this.加载快捷键设置();
  }
  async 加载快捷键设置() {
    let res3 = await fetch(`${this.configURL}/keymap.json`);
    this.快捷键设置 = await res3.json();
    for (let 功能 in this.快捷键设置) {
      if (this[功能]) {
        this.全局快捷键监听器.on(this.快捷键设置[功能], this[功能]);
      }
    }
  }
  async 获取json(路径) {
    let json = {};
    if (window.require) {
      this.fs = require("fs");
      try {
        json = JSON.parse(naive.fs.readFileSync(路径, "utf-8"));
      } catch (e) {
        console.log("获取文件失败", e);
      }
    } else {
      let res = await fetch(路径);
      json = await res.json();
    }
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
  log(...rest) {
    return console.log(
      this.log.caller,...rest
    );
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
    if (document.querySelector("#customMenu")) {
      this.切换激活菜单项(document.querySelector("#customMenu"), event);
    }
  }
  切换激活菜单项(el, event) {
    if (!el.querySelector(".b3-menu__item--current")) {
      el.firstElementChild.classList.add("b3-menu__item--current");
    }
  }
  判定触发键(event) {
    if (
      event.key == "|" ||
      ("Process" && event.shiftKey && event.code == "Backslash")
    ) {
      return true;
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
  生成默认设置(customoption, workspaceDir, userId) {
    let 思源伺服端口 = 6806;
    let 思源伺服地址 = "127.0.0.1";
    let option = {
      发布地址: 思源伺服地址,
      思源伺服地址: 思源伺服地址,
      思源伺服端口: 思源伺服端口,
      基础样式: `http://${customoption.发布地址 || 思源伺服地址}:${
        customoption.发布端口 || 思源伺服端口
      }/stage/build/export/base.css`,
      发布主题: `http://${customoption.发布地址 || 思源伺服地址}:${
        customoption.发布端口 || 思源伺服端口
      }/appearance/themes/${
        window.siyuan.config.appearance.themeDark
      }/theme.css`,
      发布脚本: `path:${workspaceDir}\\conf\\appearance\\themes\\naive\\config\\naive.js`,
      高亮样式: `http://${customoption.发布地址 || 思源伺服地址}:${
        customoption.发布端口 || 思源伺服端口
      }/stage/protyle/js/highlight.js/styles/github.min.css`,
      空页面内容: `path:${workspaceDir}\\conf\\appearance\\themes\\naive\\config\\naive.html`,
      首页: {
        思源文档id: "20200812220555-lj3enxa",
      },
      有限分享: false,
      即时分享: true,
      使用图床资源: true,
      发布端口: 80,
      思源账号id: userId,
      发布图标: "",
      暴露api: false,
      暴露挂件: false,
      暴露附件: false,
      脚注内容: `path:${workspaceDir}\\conf\\appearance\\themes\\naive\\script\\footer.html`,
      单块分享: true,
      允许搜索: false,
    };
    option.workspace = workspaceDir;
    for (let prop in option) {
      customoption[prop] !== ""
        ? (option[prop] = customoption[prop])
        : (option[prop] = option[prop]);
    }
    if (option.首页 && !option.首页.思源文档id) {
      option.首页.思源文档id = "20200812220555-lj3enxa";
    }
    option.workspace = workspaceDir;
    return JSON.parse(JSON.stringify(option));
  }
}
