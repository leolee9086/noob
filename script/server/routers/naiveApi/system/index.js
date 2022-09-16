const express = require('express');
const router = express.Router();
const {rsaPublicKey} =require("../../../keys/index.js")
router.post("/rsaPublicKey", (req, res) => {
  let data = {
      msg: 0,
      data: {
          key: rsaPublicKey,
      },
  };
  res.end(JSON.stringify(data));
});

router.use("/config", (req, res) => {
    let { name } = req.query
    let url
    if (name && name + '' !== "undefined") {
        console.log(1)
        url = `${naive.pathConstructor.pluginsURL()}/${name}/index.vue`
    }
    else {
        console.log(2)
        url = `${naive.pathConstructor.pluginsURL()}/pluginConfig/index.vue`

    }
    let html = `<html>
    <body>
      <div id="app"></div>
      <script src="https://unpkg.com/vue@next"></script>
      <script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js"></script>
      <script>
    
        const options = {
          moduleCache: {
            vue: Vue
          },
          async getFile(url) {
            
            const res = await fetch(url);
            if ( !res.ok )
              throw Object.assign(new Error(res.statusText + ' ' + url), { res });
            return {
              getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
            }
          },
          addStyle(textContent) {
    
            const style = Object.assign(document.createElement('style'), { textContent });
            const ref = document.head.getElementsByTagName('style')[0] || null;
            document.head.insertBefore(style, ref);
          },
        }
    
        const { loadModule } = window['vue3-sfc-loader'];
    
        const app = Vue.createApp({
          components: {
            'configer': Vue.defineAsyncComponent( () => loadModule('${url}', options) )
          },
          template: '<configer></configer>'
        });
    
        app.mount('#app');
    
      </script>
    </body>
    </html>
    `
    res.end(html)
})
module.exports=router