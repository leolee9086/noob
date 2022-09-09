export class  extensionLoader extends  naive.plugin  {
    constructor() {
        super({ name: "extensionLoader" });
        const { webFrame, webContents } = require('@electron/remote');
        this.session= webContents.getFocusedWebContents().session
        this.session.loadExtension(this.initFolder()+'/test')
    }

}
export const dependencies = [
    "defaultRouter",
];
  