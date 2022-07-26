module.exports = {
  //参数是文档id,文档头图属性,以及文档的ial
  头图元素: async function (docid, image, icon, c) {
    let background = null;
    let 图标内容 = "";
    if (icon) {
      let { 图标 } = require(`./icon.js`);
      图标内容 = await 图标(icon);
      console.log(await 图标(icon));
      if (图标内容.indexOf("<svg") !== 0) {
        图标内容 = `<img src="/emojis/${icon}"></img>`;
      }
    }

    let imagehtml = "";
    if (image) {
      imagehtml = `<img class="" 
             style="${image};width:100%;height:30vh ;" 
             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=">`;
    }
    background = `
          <div class="protyle-background" data-node-id="${docid}" >
            <div class="protyle-background__img">
             ${imagehtml}
        
          </div>
          <div class="protyle-background__iconw" >
    <div class="protyle-background__icon" data-menu="true" data-type="open-emoji">
    ${图标内容}
    </div>
  </div>
          </div>
            `;
    if (!image&&图标内容) {
      background = `
      <div class="protyle-background" data-node-id="${docid}" style="max-height:40px !important">
      <div class="protyle-background__img">
       ${imagehtml}
  
    </div>
    <div class="protyle-background__iconw" >
<div class="protyle-background__icon" data-menu="true" data-type="open-emoji">
${图标内容}
</div>
</div>
    </div>
          `;
    }
    if (!image&&!图标内容) {
      background = `
             
                `;
    }
    //测试
    return background;
  },
};
