module.exports = {
  startWatch() {
    const fs = require("fs");
    const option = {
      persistent: true,
      recursive: true,
    };
    fs.watch(
      naive.pathConstructor.pluginConfigPath(),
      option,
      (eventType, filename) => this.reload(eventType, filename)
    );
    fs.watch(
      naive.pathConstructor.naivePath(),
      option,
      (eventType, filename) => {
        this.reload(eventType, filename);
      }
    );
    fs.watch(
      `${naive.workspaceDir}/conf/naiveConf/config`,
      option,
      (eventType, filename) => this.reload(eventType, filename)
    );
    fs.watch(
      `${naive.workspaceDir}/conf/naiveConf/plugins`,
      option,
      (eventType, filename) => this.reload(eventType, filename)
    );
    /*fs.watch(
      `${naive.workspaceDir}/conf/naiveConf/template`,
      option,
      (eventType, filename) => this.reload(eventType, filename)
    );*/
    fs.watch(
      `${naive.workspaceDir}/conf/naiveConf/ssl`,
      option,
      (eventType, filename) => this.reload(eventType, filename)
    );
  },
  async reload(eventType, filename) {
    if(!naive.ifDefOptions.defs.DEBUG&&naive.watchingReload){
      return
    }
    try {
      console.log("The type of change was:", eventType, filename);
      const { webContents } = require("@electron/remote");
      webContents
        .getFocusedWebContents()
        .session.clearCache()
        .then((...args) => setTimeout(() => window.location.reload(), 3000));
    } catch (err) {
      console.warn(err, filename);
      setTimeout(() => window.location.reload(), 3000);
    }
  },
};
