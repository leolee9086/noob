export class customWindow extends naive.plugin {
    constructor(){
        super({name:"customWindow"})
        this.注入窗口构造器()
    }
    注入窗口构造器(){
        this.setPluginsProp(
            {中文:'加载窗口'},function(url, windowParams, closeCallback){
                    ///#ifAPP
                    const { BrowserWindow } = require("@electron/remote");
                    // 新建窗口(Electron 环境)
                    url = this.思源url格式化(url);
                    var newWin = new BrowserWindow(windowParams);

                    newWin.loadURL(url.href);

                    // newWin.name = name;
                    newWin.onClose =
                      // naive.子窗口[name] = newWin
                      newWin.on("closed", () => {
                        closeCallback
                          ? setTimeout(async () => closeCallback(newWin), 0)
                          : null;
                        // naive.子窗口[newWin.name] = null
                        newWin = null;
                      });
                    ///#else
                    window.open(url);
                    ///#endif

                          }
        )
    }
}
let dependencies =['commonMenu']
export {dependencies}