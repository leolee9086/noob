 
naive.serverUtil = require("./script/server/util/index.js",naive.pathConstructor.naivePath());
const server = require("./script/server/initServer.js",naive.pathConstructor.naivePath());
naive.publishserver = server.创建服务器(naive);
const fileWatcher = require("./script/server/util/watch.js",naive.pathConstructor.naivePath())
fileWatcher.startWatch()

//naive.checkPluginsDoc()
//naive.checkMethodDoc()