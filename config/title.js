module.exports = {
  标题元素: async function (docid, title, icon, workspace) {
    let 图标内容 = "";
    if (icon) {
      let {
        图标,
      } = require(`${workspace}/conf/appearance/themes/naive/config/icon.js`);
      图标内容 = await 图标(icon);
      console.log(await 图标(icon));
      if (图标内容.indexOf("<svg") !== 0) {
        图标内容 = `<img src="/emojis/${icon}"></img>`;
      }
      console.log(图标内容);
    }
    let 标题 = `
    <div class="protyle-wysiwyg protyle-wysiwyg--attr" 
    style="
    margin:20px auto !important;
    width:80vw !important;
    padding:0;
    align-content:center;
    display: flex;
    flex-direction: column;
    position: relative;
    top: -60px;
    "
    >
    <div class="protyle-background__iconw" style="left: 250px;top: calc(30vh - 40px);">
    <div class="protyle-background__icon" data-menu="true" data-type="open-emoji">
    ${图标内容}
    </div>
  </div>
        <div 
        spellcheck="false" 
        contenteditable="false" 
        class='h1' 
        data-subtype='h1'  
        data-node-id="${docid}"  
        spellcheck="false" 
        class="protyle-title" 
        data-render="true">${title}
        </div>
    </div>
    `;
    return 标题;
  },
};
