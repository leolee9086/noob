module.exports = {
  //参数是文档id,文档头图属性,以及文档的ial
  头图元素: async function (docid, image, ial,c) {
    let background =null
   
    let imagehtml = ""
    if (image) {
      imagehtml = `<img class="" 
             style="${image};width:100%;height:30vh ;" 
             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=">`;
    }

    background = `
          <div class="protyle-background" data-node-id="20200812220555-lj3enxa" style="min-height: 30vh;">
            <div class="protyle-background__img">
             ${imagehtml}
        
          </div>
       
          </div>
            `;
    if (!image) {
        background = `
              <div class="protyle-background" data-node-id="20200812220555-lj3enxa" style="min-height: 10vh;">
                <div class="protyle-background__img">
            
              </div>
              </div>
                `;
    }
    //测试
    return background;
  },
};
