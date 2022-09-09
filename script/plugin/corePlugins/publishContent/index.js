export class publishContent extends naive.plugin {
  constructor() {
    super({ name: "publishHeader" });
    this.fs = require("fs");
    if(!naive.私有块字典){
        naive.私有块字典={}
    }

    this.expressApp.use('/naiveApi/getPrivateBlock',(req,res)=>{
        let data = req.body
        console.log(req)
        if(data&&data.id){
            if(naive.私有块字典[data.id]){
                if(data.token==naive.私有块字典[data.id]['token']){
                    res.end(JSON.stringify(
                        {
                            msg:0,
                            data:{
                                content:naive.私有块字典[data.id]['content']
                            }
                        })
                    )
                }
                else{
                    res.end(JSON.stringify(
                        {
                            msg:0,
                            data:{
                                content:`<div>鉴权码错误</div>`
                            }
                        }
                    ))
                }
            }
        }else{
        res.end(JSON.stringify(
            {
                msg:0,
                data:{
                    content:`<div>鉴权码错误</div>`
                }
            }
        ))
        }
    })
  }
  pipe = [
    this.注入块属性,
    this.生成发布文档头,
    this.生成发布文档内容,
    this.生成文档标题,
    this.修改嵌入块,
    this.修改块链接,
    this.修改私有块,
  ];
  async 修改私有块(req,res,渲染结果){
    let 私有块数组 = 渲染结果.querySelectorAll('[custom-publish-token]')
    私有块数组.forEach(
        私有块=>{
            if(!naive.私有块字典){
                naive.私有块字典={}
            }
            naive.私有块字典[私有块.getAttribute('data-node-id')] = {content:私有块.innerHTML,token:私有块.getAttribute("custom-publish-token")}
            私有块.innerHTML=`<div>请输入块token<input/><button data-type="customAuthToken" data-node-id='${私有块.getAttribute('data-node-id')}'>确认</button></div>`
            私有块.setAttribute("custom-publish-token",'')
        }
    )
    return 渲染结果
  }
  async 修改嵌入块(req,res,渲染结果){
    let docId= 渲染结果.block.docInfor.id
    渲染结果= await this.刷新嵌入块(渲染结果,docId)
    return 渲染结果
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
    let 嵌入块信息 = await this.核心api.sql(
      {stmt:`select * from blocks where id = ${嵌入块id}`},
      ''
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
      (await this.核心api.searchEmbedBlock(
        {
            stmt:smt,
            excludeIDs:id数组,
            headingMode: 0

        },
        "",
        
      )) || {};
    let blocks = res.blocks || [];
    console.log(blocks);

    let 嵌入块内容 = "";
    blocks.forEach((el) => {
      console.log(el);
      嵌入块内容 = 嵌入块内容 + el.content;
    });

    嵌入块.innerHTML = 嵌入块内容 + 嵌入块.innerHTML;
    return 嵌入块.innerHTML;
  }

  修改块链接(req, res, div) {
    let links = div.querySelectorAll("a");
    if (links[0]) {
      links.forEach((a) => {
          let href = a.getAttribute("href");
          a.setAttribute("href", href.replace("siyuan://blocks/", `/block/`));
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
          link.setAttribute("href", `/block/${a.getAttribute("data-id")}`);
          a.innerHTML=''
          a.appendChild(link);
       
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
        a.innerHTML=''
        a.appendChild(link);
     
      });
    }
    let assets = div.querySelectorAll("a[src]");
    if (assets[0]) {
      assets.forEach((a) => {
        
        let src = a.getAttribute("src");
        if (src.indexOf("assets") == 0) {
          if (naive.设置.使用图床资源) {
            a.setAttribute(
              "src",
              naive.设置.发布图床前缀 + src.slice(7, src.length)
            );
          } else {
            a.setAttribute("src", `/` + src);
          }
        }
      });
    }
    return div;
  }
  async 注入块属性(req, res, 渲染结果) {
    let blockid =
      req.params.blockid ||
      req.query.blockid ||
      req.query.id ||
      naive.设置.首页.思源文档id;
    if(blockid=="unidefined"){
      blockid=''
    }
    let block = await this.核心api.getDoc(
      { id: blockid, k: "", size: 102400, mode: 0 },
      ""
    );
    
    if(block){
    let docInfor = await this.核心api.getDocInfo({ id: blockid });
    block.docInfor = docInfor;
    渲染结果.block = block;
    return 渲染结果
    }
    else{
      let emptyPage = this.fs.readFileSync(naive.pathConstructor.templatePath()+'/empty.html','utf8')

      res.end(emptyPage)
      return 渲染结果

    }
  }
  生成文档标题(req, res, 渲染结果) {
    let 标题元素 = 渲染结果.querySelector(".protyle-title__input");
    let 标题内容 = 渲染结果.block.docInfor.ial.title;
    let 文档图标 = 渲染结果.querySelector(".protyle-title__icon")
    文档图标.setAttribute('data-href','block/'+渲染结果.block.id)
    标题元素.innerHTML = 标题内容;
    if(req.session&&req.session.user_group=='admin'){
      标题元素.innerHTML+=`<div><a style="font-size:16px;font-weight:lighter" href="/editor/stage/build/desktop/?id=${渲染结果.block.id}">开始编辑</a></div>`
  }

    return 渲染结果;
  }
  生成发布文档头(req, res, 渲染结果) {
    let unAuthedPageTemplate = this.fs.readFileSync(
      naive.pathConstructor.templatePath() + "/head.html",
      "utf8"
    );
    let 发布文档头 = this.templateParser.render(unAuthedPageTemplate, {
      naive: naive,
    });
    let head = 渲染结果.querySelector("head");
    head.innerHTML += 发布文档头;
    return 渲染结果;
  }
  async 生成发布文档内容(req, res, 渲染结果) {
    let blockid = 渲染结果.block.id;
    let block = 渲染结果.block;
    let PageTemplate = this.fs.readFileSync(
      naive.pathConstructor.templatePath() + "/defaultPage.html",
      "utf8"
    );
    let html = 渲染结果.querySelector("html");
    html.innerHTML = PageTemplate;
    let content = html.querySelector("[data-doc-type]");
    content.innerHTML = block.content;
    let meta = 渲染结果.head.querySelector("meta");
    meta.dataset.nodeId = blockid;
    content.setAttribute("data-node-id", blockid);
    return 渲染结果;
  }
}
export const dependencies = ["defaultAuth", "template", "unAuthedPage",];
export const environments = ["APP"];
export const condition = ["APP"];
