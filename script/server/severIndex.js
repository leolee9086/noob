const fileWatcher = naive.pathConstructor.requireScript("/server/util/watch.js")
const server = naive.pathConstructor.requireScript("/server/initServer.js");
naive.publishserver = server.创建服务器(naive);
console.log(fileWatcher)
fileWatcher.startWatch()

