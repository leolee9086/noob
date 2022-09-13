export class  reloader extends  naive.plugin  {
    constructor(option){
        super(option)        
        let 重置按钮图标 = {
          提示: "清除缓存并刷新窗口",
          图标: "iconRefresh",
          回调函数:()=>this.重新加载(),
        };
            ///#if!MOBILE

        this.注册顶栏按钮(重置按钮图标);
        ///#endif
        this.setPluginsProp({中文:"重新加载",en:"forceReload"},this.重新加载)

    }
    async 重新加载(){
        ///#ifAPP
            try {
                const { webFrame, webContents } = require('@electron/remote');
                // webFrame.clearCache();
                // webContents.getFocusedWebContents().reload();
                // webContents.getFocusedWebContents().reloadIgnoringCache();
                webContents.getFocusedWebContents().session.clearCache().then((...args) => window.location.reload());
            }
            catch (err) {
                console.warn(err);
                window.location.reload()
            }
        ///#else
        window.location.reload()
        ///#endif
        }
}