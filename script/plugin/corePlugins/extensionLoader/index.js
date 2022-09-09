export class  extensionLoader extends  naive.plugin  {
    constructor() {
        super({ name: "extensionLoader" });
        const { webFrame, webContents } = require('@electron/remote');
        this.session= webContents.getFocusedWebContents().session
    }
}
export const dependencies = [
    "defaultRouter",
];
  