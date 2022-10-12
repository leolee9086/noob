export default function relaod(){
    if (window.require) {
        const { webContents } = require('@electron/remote');
        webContents.getAllWebContents().forEach(element => {
          element.reloadIgnoringCache()
        });
    }
    else{
        window.location.reload()
    }
}