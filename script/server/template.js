module.exports = class 模板渲染器 {
  constructor(option) {
    console.log(option);
    this.发布地址 = option.发布地址;
    this.思源伺服地址 = option.思源伺服地址;
    this.思源伺服端口 = option.思源伺服端口;
    this.基础样式 = option.基础样式;
    this.发布主题 = option.发布主题;
    this.发布脚本 = option.发布脚本;
    this.高亮样式 = option.高亮样式;
    this.空页面内容 = option.空页面内容;
    this.首页 = option.首页 || {
      思源文档id: "20200812220555-lj3enxa",
    };
    this.使用图床资源 = option.使用图床资源;
    this.有限分享 = option.有限分享;
    this.允许搜索 = option.允许搜索;
    this.发布端口 = option.发布端口;
    this.思源账号id = option.思源账号id;
    this.发布图标 = option.发布图标;
    this.workspace = option.workspace;
    this.脚注内容 = option.脚注内容;
    this.单块分享 = option.单块分享;
    this.思源伺服ip = this.思源伺服地址 + ":" + this.思源伺服端口;
    const api = require("../public/siYuanApi");
    this.单块样式 = true;
    this.获取发布脚本内容();
    this.获取发布脚注内容();
    this.思源api = new api(option);
  }

  获取发布脚本内容() {
    let 脚本内容 = "";
    const fs = require("fs");
    try {
      脚本内容 = fs.readFileSync(this.发布脚本.slice(5, this.发布脚本.length));
    } catch (e) {
      console.log(e);
      this.发布脚本内容 = this.发布脚本;
      return;
    }
    this.发布脚本内容 = 脚本内容;
  }
  获取发布脚注内容() {
    let 脚注html内容 = "";
    const fs = require("fs");
    try {
      脚注html内容 = fs.readFileSync(
        this.脚注内容.slice(5, this.脚注内容.length)
      );
    } catch (e) {
      console.log(e);
      this.脚注html内容 = this.脚注html内容;
      return;
    }
    this.脚注html内容 = 脚注html内容;
  }
  async 渲染首页() {
    console.log(this.首页);
    if (this.首页 && this.首页.思源文档id) {
      console.log(this.首页.思源文档id, 88);
      return await this.渲染块id(this.首页.思源文档id);
    }
  }
  parseblockref(div) {
    let links = div.querySelectorAll("a");
    if (links[0]) {
      links.forEach((a) => {
        let href = a.getAttribute("href");
        let ip = window.siyuan.config.localIPs[0];
        a.setAttribute(
          "href",
          href.replace(
            "siyuan://blocks/",
            `http://${this.发布地址}:${this.发布端口}/block/`
          )
        );
        href.indexOf("siyuan://") == 0
          ? a.setAttribute("type", "blockref")
          : null;
      });
    }
    let blockrefs = div.querySelectorAll('span[data-type="block-ref"]');
    if (blockrefs[0]) {
      blockrefs.forEach((a) => {
        let link = document.createElement("a");
        link.innerHTML = a.innerHTML;
        link.setAttribute("data-type", a.getAttribute("data-type"));
        link.setAttribute("data-id", a.getAttribute("data-id"));
        link.setAttribute("type", "blockref");

        link.setAttribute(
          "href",
          `http://${this.发布地址}:${this.发布端口}/block/${a.getAttribute(
            "data-id"
          )}`
        );
        a.parentNode.replaceChild(link, a);
      });
    }
    let contentdivs = div.querySelectorAll('*[contenteditable="true"]');
    if (contentdivs[0]) {
      contentdivs.forEach((contentdiv) => {
        contentdiv.setAttribute("contenteditable", "false");
      });
    }
    let outlinks = div.querySelectorAll('span[data-type="a"]');
    if (outlinks[0]) {
      outlinks.forEach((a) => {
        let link = document.createElement("a");
        link.innerHTML = a.innerHTML;
        link.setAttribute("data-type", a.getAttribute("data-type"));
        link.setAttribute("data-id", a.getAttribute("data-id"));
        link.setAttribute("type", "a");

        link.setAttribute("href", a.getAttribute("data-href"));
        a.parentNode.replaceChild(link, a);
      });
    }

    let assets = div.querySelectorAll("[src]");
    if (assets[0]) {
      assets.forEach((a) => {
        let src = a.getAttribute("src");

        if (src.indexOf("assets") == 0) {
          if (this.使用图床资源) {
            a.setAttribute(
              "src",
              `https://assets.b3logfile.com/siyuan/${this.思源账号id}/` + src
            );
          } else {
            a.setAttribute("src", `/` + src);
          }
        }
      });
    }

    return div;
  }

  async 渲染块id(blockid) {
    let data = {}; //处理中文乱码
    // this.生成文档树()

    data.id = blockid;
    let url1 = `http://${this.思源伺服地址}:${this.思源伺服端口}/api/filetree/getDoc`;
    console.log(this.单块分享, "jjj");
    let data1 = null;
    if (this.单块分享) {
      data1 = { id: blockid, k: "", mode: 0, size: 102400 };
    } else {
      data1 = { id: blockid, k: "", mode: 0, size: 1000 };
    }
    let res1 = await this.siyuandata(url1, data1);
    let content = res1.data.content;
    let docid = res1.data.id;
    let 头图和标题 = await this.渲染页面标题和背景图(blockid);
    let 块属性 = await this.获取块属性(blockid);
    let 主题 = "";
    if (块属性 && 块属性["custom-publishTheme"]) {
      主题 = 块属性["custom-publishTheme"];
      if (!主题.indexOf("url:") == 0) {
        主题 = `/appearance/themes/${主题}/theme.css`;
      }
    }
    let tempdiv = document.createElement("div");
    tempdiv.innerHTML = content;
    tempdiv = await this.刷新嵌入块(tempdiv, docid);

    tempdiv = this.parseblockref(tempdiv);
    content = tempdiv.innerHTML;
    if (头图和标题) {
      return this.渲染模板(content, 头图和标题, 主题);
    }

    return this.渲染模板(content, 主题);
  }
  async siyuandata(url, data) {
    let resData = null;
    await window
      .fetch(url, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          // Authorization: `Token ${siyuan.config.accessAuthCode}`,
        },
      })
      .then(function (response) {
        resData = response.json();
      });
    return resData;
  }
  async 获取块属性(blockid) {
    let obj = {};
    let attrs = await 思源api.以sql向思源请求块数据(
      `${this.思源伺服地址}:${this.思源伺服端口}`,
      "",
      `select * from attributes where block_id = '${blockid}'`
    );
    attrs.forEach((attr) => (attr ? (obj[attr.name] = attr.value) : null));

    return obj;
  }
  async 渲染页面标题和背景图(blockid) {
    let { 标题元素 } = require(`./template/title.js`);
    let { 头图元素 } = require(`./template/background.js`);
    let url2 = `http://${this.思源伺服地址}:${this.思源伺服端口}/api/block/getDocInfo`;
    let data2 = { id: blockid };
    let res2 = await this.siyuandata(url2, data2);
    let background = null;
    let titlediv = null;
    let title = null;
    if (res2 && res2.data && res2.data.ial) {
      let ial = res2.data.ial;
      title = ial.title;
      this.当前文档标题=title
      let icon = ial.icon;
      let image = ial["title-img"];
      titlediv = document.createElement("div");
      if (title) {
        titlediv.innerHTML = await 标题元素(
          blockid,
          title,
          icon,
          this.workspace
        );
      }
      background = document.createElement("div");
      background.innerHTML = await 头图元素(
        blockid,
        image,
        icon,
        this.workspace
      );
    }
    return background.innerHTML + titlediv.innerHTML;
  }
  async 刷新嵌入块(元素, docid) {
    let 嵌入块数组 = 元素.querySelectorAll('[data-type="NodeBlockQueryEmbed"]');
    if (嵌入块数组[0]) {
      for (let i = 0; i < 嵌入块数组.length; i++) {
        let el = 嵌入块数组[i];
        el.innerHTML = await this.获取嵌入块内容(el, docid);
      }
    }
    console.log(元素);
    return 元素;
  }
  async 获取嵌入块内容(嵌入块, docid) {
    let smt = 嵌入块.getAttribute("data-content");
    let id数组 = [];
    let 当前文档id = docid;
    let 嵌入块id = 嵌入块.getAttribute("data-node-id");
    let 嵌入块信息 = await this.思源api.以sql向思源请求块数据(
      this.思源伺服ip,
      "",
      `select * from blocks where id = ${嵌入块id}`
    );
    let 当前父id;
    if (嵌入块信息 && 嵌入块信息["data"] && 嵌入块信息["data"][0]) {
      当前父id = 嵌入块信息["data"][0]["parent_id"];
    }
    当前文档id ? id数组.push(当前文档id) : null;
    当前父id ? id数组.push(当前父id) : null;
    嵌入块id ? id数组.push(嵌入块id) : null;
    嵌入块.getAttribute("data-node-id")
      ? id数组.push(嵌入块.getAttribute("data-node-id"))
      : null;
    let res =
      (await this.思源api.以sql获取嵌入块内容(
        this.思源伺服ip,
        "",
        id数组,
        smt
      )) || {};
    console.log(res);
    let data = res.data || {};
    console.log(data);

    let blocks = data.blocks || [];
    console.log(blocks);

    let 嵌入块内容 = "";
    blocks.forEach((el) => {
      console.log(el);
      嵌入块内容 = 嵌入块内容 + el.content;
    });

    嵌入块.innerHTML = 嵌入块内容 + 嵌入块.innerHTML;
    return 嵌入块.innerHTML;
  }
  async 请求数据(url, apitoken, data) {
    let resData = null;
    let str = JSON.stringify(data);
    try {
      await fetch(url, {
        body: str,
        method: "POST",
        headers: {
          //          'Content-Type': 'text/plain;charset=UTF-8',

          Authorization: "Token " + apitoken,
        },
      }).then(function (response) {
        resData = response.json();
      });
      return resData;
    } catch (e) {
      console.log(e);
    }
  }
  渲染模板(content, 头图, 主题) {
    let 工具栏脚本 = "";
    if (!this.有限分享 && this.允许搜索) {
      工具栏脚本 = ` <script src="/static/vue/vue.global.js"></script>
      <!-- 导入组件库 -->
      <script src="/static/element-plus/index.full.js"></script>
      <script src="/plugins/toolbar.js"></script>
      <script src="/plugins/backlink.js"></script>

      `;
    }
    let 发布主题 = 主题 ? 主题 : this.发布主题;
    let 发布插件 = "";
    for (let 插件名 in naive.publishPlugins) {
      if (naive.publishPlugins[插件名]) {
        发布插件 += `<script type='module' src='/plugins/${插件名}/index.js'></script>`;
      }
    }
    let {默认图标} = require('./template/defaultIcons.js')
    this.默认图标 = 默认图标
    let 工具栏 = "";
    if(this.允许搜索){
      工具栏 = `<div id="toolbar" class="toolbar fn__flex"></div>`
    }
    return `<!DOCTYPE html>
    <html>
    ${this.发布文档头(发布主题)}
    <body>
    ${this.默认图标()}

     
    </div>
    <div style="
      position:absolute;
      width:400px;
      max-width: 400px;
      top:30vh;
      left:10px
    " >    
    </div>
    ${工具栏}
    ${头图||""}

    <div class="protyle-wysiwyg protyle-wysiwyg--attr" style="margin: 0 auto;max-width: 80vw" id="preview">

    ${content}
    ${this.发布脚本内容 || ""}
    <div>${this.脚注html内容}</div>

    </div>
    <div id="backlinks"></div>
   <script src="/stage/protyle/js/highlight.js/highlight.min.js"  id="protyleHljsScript"></script>
    <script src="/stage/protyle/js/highlight.js/third-languages.js?v=1.0.0" id="protyleHljsThirdScript"></script>
    <script src="/appearance/icons/material/icon.js?2.0.3"></script>
    <script src="/stage/build/export/protyle-method.js"></script>
    <script defer src="/stage/protyle/js/lute/lute.min.js"></script>    
    <script >
    window.siyuan = {
      config: {
        appearance: { mode: 0, codeBlockThemeDark: "base16/dracula", codeBlockThemeLight: "github" },
        editor: { 
          codeLineWrap: true,
          codeLigatures: true,
          plantUMLServePath: "https://www.plantuml.com/plantuml/svg/~1",
          codeSyntaxHighlightLineNum: false,
        }
      },
      languages: {copy:"复制"}
    };
    const previewElement = document.getElementById('preview');
    Protyle.highlightRender(previewElement, "/stage/protyle");
    Protyle.mathRender(previewElement, "/stage/protyle", false);
    Protyle.mermaidRender(previewElement, "/stage/protyle");
    Protyle.flowchartRender(previewElement, "/stage/protyle");
    Protyle.graphvizRender(previewElement, "/stage/protyle");
    Protyle.chartRender(previewElement, "/stage/protyle");
    Protyle.mindmapRender(previewElement, "/stage/protyle");
    Protyle.abcRender(previewElement, "/stage/protyle");
    Protyle.plantumlRender(previewElement, "/stage/protyle");
    Protyle.mediaRender(previewElement);
    document.querySelectorAll(".protyle-action__copy").forEach((item) => {
      item.addEventListener("click", (event) => {
            navigator.clipboard.writeText(item.parentElement.nextElementSibling.textContent.trimEnd());
            event.preventDefault();
            event.stopPropagation();
      })
    });
    
        
    </script>
    ${工具栏脚本 || ""}
    ${发布插件}
    </body>
    </html>
    `;
  }
  发布文档头(主题) {
    return `<head>
  <meta charset="utf-8">
  <link rel="icon" href="${this.发布图标}">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="stylesheet" type="text/css" id="themeStyle" href="/stage/default.css">
  <title>${this.当前文档标题}</title>
  <script src="/appearance/emojis/twitter-emoji.js?v=1.0.0" async="" id="emojiScript"></script>
  <script src="/appearance/icons/material/icon.js?v=1.0.6" async="" id="iconScript"></script>
  <link rel="stylesheet" type="text/css" id="themeDefaultStyle" href="${this.基础样式}">
  <link rel="stylesheet" type="text/css" id="themeStyle" href="${主题}">
  <link rel="stylesheet" href="/static/element-plus/index.css" />
  <style>
  </style>
  <link id="protyleHljsStyle" rel="stylesheet" type="text/css" href="${this.高亮样式}">
  </head>`;
  }
  
};
