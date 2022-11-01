import 设置 from "../../config.js"
import 核心api from "../../util/kernelApi.js"
const fs =require("fs-extra")

export  async function 生成文档大纲(req, res, 渲染结果) {
    console.log(this);
    let 大纲 = 渲染结果.querySelector('#panelLeft [data-type="outline"]');
    console.log(大纲);
    console.log(渲染结果.block);
    let 大纲内容 = await 核心api.getDocOutline(
      { id: 渲染结果.block.docInfor.ial.id },
      ""
    );
    console.log(大纲内容);
    let html = 渲染大纲(大纲内容, 渲染结果);
    大纲.innerHTML = html;
    替换大纲条目内容(大纲内容,渲染结果)

    return 渲染结果;
  }
export function  渲染大纲(大纲内容, 渲染结果) {
    let 文档条目 = `
        <div class="b3-list-item" title="${渲染结果.block.docInfor.name.replace(
          ".sy",
          ""
        )}">
        <span class="b3-list-item__graphic">
        <svg class="custom-icon">
        <use xlink:href="#icon-1f4c4"></use>
        </svg>
        </span>
        <span class="b3-list-item__text">${渲染结果.block.docInfor.name.replace(
          ".sy",
          ""
        )}</span>
        </div>`;
    let 大纲容器 = `<div clas=fn__flex-1>
            <ul class="b3-list b3-list--background">
                ${渲染大纲条目内容(大纲内容, 渲染结果)}
            <ul>
        </div>
        
        `;
    return 文档条目 + 大纲容器;
  }
export function  替换大纲条目内容(大纲内容,渲染结果){
    大纲内容.forEach((大纲条目)=>{ 
    let 元素 = 渲染结果.querySelector(
        '.protyle-wysiwyg div[data-node-id="' + 大纲条目.id + '"]'
      );
      if(元素){
        let 大纲 = 渲染结果.querySelector('#panelLeft [data-type="outline"]');
        if(元素.querySelector("[data-type='customAuthToken']")){
        大纲.querySelector(`[data-node-id="${大纲条目.id}"] a`).innerHTML="私有块不可访问"
        }
        else{
            大纲.querySelector(`[data-node-id="${大纲条目.id}"] a`).innerHTML=元素.innerText

        }
      }
      else{
        let 大纲 = 渲染结果.querySelector('#panelLeft [data-type="outline"]');
        大纲.querySelector(`[data-node-id='${大纲条目.id}']`).remove()
      }
      if (大纲条目.blocks) {
        替换大纲条目内容(大纲条目.blocks,渲染结果)    
    }
    })
  }
export function  渲染大纲条目内容(大纲内容, 渲染结果) {
    let html = "";
    大纲内容.forEach((大纲条目) => {
      html += `
<li 
class="b3-list-item b3-list-item--hide-action" 
data-node-id="${大纲条目.id}" 
data-ref-text="" 
data-def-id="" 
data-type="NodeHeading" 
data-subtype="${大纲条目.subType}" 
data-treetype="outline" 
data-def-path="">
    <span style="padding-left: ${
      16 * parseInt(大纲条目.subType[1])
    }px" class="b3-list-item__toggle">
        <svg data-id="${
          大纲条目.id
        }" class="b3-list-item__arrow fn__hidden b3-list-item__arrow--open">
        <use xlink:href="#iconRight"></use></svg>
    </span>
    <svg data-defids="[&quot;&quot;]" class="b3-list-item__graphic popover__block" data-id="${
      大纲条目.id
    }">
        <use xlink:href="#icon${大纲条目.subType.toUpperCase()}"></use>
    </svg>
    <span class="b3-list-item__text" title="${name}"><a href="/block/${
        大纲条目.id
      }">${name}</a></span>    
</li>
            `;
      if (大纲条目.blocks) {
        html += `<ul class>${渲染大纲条目内容(
          大纲条目.blocks,
          渲染结果
        )}</ul>`;
      }
      
    });
    return html;
  }
export function  获取文档内大纲(渲染结果) {
    let 标题元素 = 渲染结果.querySelector(".protyle-title");
  }
