export class  extensionLoader extends  naive.plugin  {
    constructor() {
        super({ name: "extensionLoader" });
        ///#ifAPP
        const { webFrame, webContents } = require('@electron/remote');
        this.session= webContents.getFocusedWebContents().session
        ///#endif
    }
}
export const environment = ["APP"];
