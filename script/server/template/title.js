module.exports = {
  标题元素: async function (docid, title, icon, workspace) {
    let 标题 = `
 
        <div 
        spellcheck="false" 
        contenteditable="false" 
        id="doctitle"
        data-subtype='title'  
        data-node-id="${docid}"  
        spellcheck="false" 
        class="title" 
        data-render="true">${title}
        </div>
    `;
    return 标题;
  },
};
