naive.serverUtil = naive.pathConstructor.requireScript("/server/util/index.js");
const server = naive.pathConstructor.requireScript("/server/initServer.js");
naive.publishserver = server.创建服务器(naive);
const fileWatcher = naive.pathConstructor.requireScript("/server/util/watch.js")
fileWatcher.startWatch()
