export class configPages extends naive.plugin {
  constructor() {
    super({ name: "configPages",sort:2 });
    this. 窗口设置= {
      width: 800,
      height: 600,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule:true
      },
    };
    let 服务器设置图标 = {
      提示: "打开服务器设置窗口",
      图标: "iconPublish",
      回调函数:()=>this.加载窗口(`http://${naive.pathConstructor.baseURL()}/script/plugin/corePlugins/configPages/pages/serverconfig.html`,this.窗口设置),
    };
    this.注册顶栏按钮(服务器设置图标);
    let 服务器设置图标1 = {
      提示: "打开服务器设置窗口",
      图标: "iconPublish",
      回调函数:()=>this.加载窗口(`http://${naive.pathConstructor.baseURL()}/naivePages/pluginConfig`,this.窗口设置),
    };
    this.注册顶栏按钮(服务器设置图标1);

    let 插件设置图标 = {
      提示: "打开插件设置窗口",
      图标: "iconPlugin",
      回调函数:()=>this.加载窗口(`http://${naive.pathConstructor.baseURL()}/script/plugin/corePlugins/configPages/pages/pluginconfig.html`,this.窗口设置),
    };
    this.注册顶栏按钮(插件设置图标);
    ///#ifAPP
    this.初始化配置页面()
    ///#endif
  }

  初始化配置页面(){
    naive.expressApp.use('/naivePages/',naive.express.static(naive.workspaceDir+'/conf/naiveConf/pages/'))
    naive.expressApp.use('/components',naive.express.static(naive.workspaceDir+'/conf/naiveConf/pages/components'))

    naive.expressApp.use("/naivePages/pluginConfig",(req,res)=>{
      let {name} = req.query
      let url
      if(name&&name+''!=="undefined"){
        url = `/plugins/${name}/index.vue`
      }
      else{
        url = `/naivePages/pluginConfig.vue`
      }
      let html = `<html>
      <head>
      <script src="/script/public/static/vue/vue.global.js"></script>
      <script src="/components/index.js"></script>
      <script src="/script/public/static/element-plus/index.full.js"></script>
      <script src="https://unpkg.com/naive-ui"></script>
      
      <link rel="stylesheet" href="/script/public/static/element-plus/index.css" />
        <script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js"></script>
        <meta charset="UTF-8" />
        <style id="editorFontSize">.b3-typography, .protyle-wysiwyg, .protyle-title {font-size:21px !important}
          .b3-typography code:not(.hljs), .protyle-wysiwyg code:not(.hljs) { font-variant-ligatures: normal }
          .li > .protyle-action {height:42px;line-height: 42px}
          .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h1, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h2, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h3, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h4, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h5, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h6 {line-height:42px;}
          .protyle-wysiwyg [data-node-id].li > .protyle-action:after {height: 21px;width: 21px;margin:-10.5px 0 0 -10.5px}
          .protyle-wysiwyg [data-node-id].li > .protyle-action svg {height: 14px}
          .protyle-wysiwyg [data-node-id] [spellcheck="false"] {min-height:34px}
          .protyle-wysiwyg .li {min-height:42px}
          .protyle-gutters button svg {height:34px}
          .protyle-wysiwyg img.emoji, .b3-typography img.emoji {width:26px}
          .protyle-wysiwyg .h1 img.emoji, .b3-typography h1 img.emoji {width:45px}
          .protyle-wysiwyg .h2 img.emoji, .b3-typography h2 img.emoji {width:40px}
          .protyle-wysiwyg .h3 img.emoji, .b3-typography h3 img.emoji {width:36px}
          .protyle-wysiwyg .h4 img.emoji, .b3-typography h4 img.emoji {width:32px}
          .protyle-wysiwyg .h5 img.emoji, .b3-typography h5 img.emoji {width:29px}
          .protyle-wysiwyg .h6 img.emoji, .b3-typography h6 img.emoji {width:26px}</style>
          <link href="/stage/base.css" rel="stylesheet">
          <link id="themeDefaultStyle" rel="stylesheet" type="text/css" href="http://localhost:6806/appearance/themes/dayLight/theme.css">
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>dataTransfer</title>
      </head>
      <body id="app" class="fn__flex-column  body--win32">
      </body>
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
      app.use(naive)
      app.use(ElementPlus);
      app.mount('#app');
      
    </script>
      </html>
      `
      res.end(html)
    
    })
  }
}
let dependencies =['toolbarItem']
export {dependencies}