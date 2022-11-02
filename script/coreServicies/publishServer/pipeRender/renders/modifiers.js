
import 设置 from "../../config.js"
import 核心api from "../../util/kernelApi.js"
const fs =require("fs-extra")
export async function 修改嵌入块(req, res, 渲染结果) {
  let docId = 渲染结果.block.docInfor.id;
  渲染结果 = await 刷新嵌入块(渲染结果, docId);
  return 渲染结果;
}
export async function 刷新嵌入块(元素, docid) {
  let 嵌入块数组 = 元素.querySelectorAll('[data-type="NodeBlockQueryEmbed"]');
  if (嵌入块数组[0]) {
    for (let i = 0; i < 嵌入块数组.length; i++) {
      let el = 嵌入块数组[i];
      el.innerHTML = await 获取嵌入块内容(el, docid);
    }
  }
  console.log(元素);
  return 元素;
}
export async function 获取嵌入块内容(嵌入块, docid) {
  let smt = 嵌入块.getAttribute("data-content");
  let id数组 = [];
  let 当前文档id = docid;
  let 嵌入块id = 嵌入块.getAttribute("data-node-id");
  let 嵌入块信息 = await 核心api.sql(
    { stmt: `select * from blocks where id = ${嵌入块id}` },
    ''
  );
  let 当前父id;
  if (嵌入块信息 && 嵌入块信息["data"] && 嵌入块信息["data"][0]) {
    当前父id = 嵌入块信息["data"][0]["parent_id"];
  }
  id数组=[嵌入块id,当前文档id]
  let res =
    (await 核心api.searchEmbedBlock(
      {
        breadcrumb:false,
        stmt: smt,
        excludeIDs: id数组,
        headingMode: 0,
        embedBlockID:嵌入块id
      },
      "",

    )) || {};
  let blocks = res.blocks || [];
  console.log(blocks);

  let 嵌入块内容 = "";
  blocks.forEach((el) => {
    console.log(el);
    嵌入块内容 = 嵌入块内容 + el.block.content;
  });

  嵌入块.innerHTML = 嵌入块内容 + 嵌入块.innerHTML;
  return 嵌入块.innerHTML;
}
export async function 修改私有块(req, res, 渲染结果) {
  if (!私有块字典) {
    私有块字典 = {}
  }
  let 私有块数组 = 渲染结果.querySelectorAll('[custom-publish-token]')
  私有块数组.forEach(
    私有块 => {
      if (!私有块字典) {
        私有块字典 = {}
      }
      私有块字典[私有块.getAttribute('data-node-id')] = { content: 私有块.innerHTML, token: 私有块.getAttribute("custom-publish-token") }
      私有块.innerHTML = `<div>请输入块token<input/><button data-type="customAuthToken" data-node-id='${私有块.getAttribute('data-node-id')}'>确认</button></div>`
      私有块.setAttribute("custom-publish-token", '')
    }
  )
  return 渲染结果
}
export function 修改块链接(req, res, div) {
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
      a.innerHTML = '';
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
      a.innerHTML = '';
      a.appendChild(link);

    });
  }
  let assets = div.querySelectorAll("a[src]");
  if (assets[0]) {
    assets.forEach((a) => {
      let src = a.getAttribute("src");
      if (src.indexOf("assets") == 0) {
        if (设置.使用图床资源) {
          a.setAttribute(
            "src",
            设置.发布图床前缀 + src.slice(7, src.length)
          );
        } else {
          a.setAttribute("src", `/` + src);
        }
      }
    });
  }
  return div;
}
