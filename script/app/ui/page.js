const 窗口配置器= {
  加载窗口(url, windowParams, closeCallback) {
    if (window.require) {
      

        const { BrowserWindow } = require("@electron/remote");
        // 新建窗口(Electron 环境)
        
        let newWin = new BrowserWindow(windowParams);

        newWin.loadURL(url);
        newWin.name = "name";     
    }
  },
  打开服务器设置窗口() {
    let option = {
        width: 800,
        height: 600,
        alwaysOnTop: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      };
      
    窗口配置器.加载窗口(
      "http://192.168.0.9:6806/appearance/themes/naive/pages/serverconfig.html",
      option
    );
  },
  打开样式设置窗口() {
    let option = {
        width: 800,
        height: 600,
        alwaysOnTop:true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      };
    窗口配置器.加载窗口(
      "http://192.168.0.9:6806/appearance/themes/naive/pages/styleconfig.html",
      option
    );
  }
}
export { 窗口配置器 as 窗口配置器 };
