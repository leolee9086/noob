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
    this.初始化配置页面()
  }
  初始化配置页面(){
    naive.expressApp.use('/components/',naive.express.static(naive.workspaceDir+'/conf/naiveConf/pages/'))
    
    naive.expressApp.use("/naivePages/pluginConfig",(req,res)=>{
      let {name} = req.query
      let url
      if(name&&name+''!=="undefined"){
        url = `/plugins/${name}/index.vue`
      }
      else{
        url = `/components/pluginConfig.vue`
      }
      let html = `<html>
      <body>
        <div id="app"></div>
        <script src="https://unpkg.com/vue@next"></script>
        <script src="/components/index.js"></script>

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
          app.use(naive)
          app.mount('#app');
        </script>
      </body>
      </html>
      `
      res.end(html)
    
    })
  }
}
let dependencies =['toolbarItem']
export {dependencies}