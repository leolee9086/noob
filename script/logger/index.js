export default class naiveLogger {
    constructor(naive) {
        let workspaceDir = naive.public.config.backend.filesys.workspaceDir
        if (window.require) {
            const log4js = requireInstall('log4js');//加载log4js模块

            log4js.configure({
                appenders: {
                    normal: {
                        type: 'file', //文件输出
                        filename: workspaceDir + `/conf/naiveConf/logs/boot-${(new Date()).toLocaleString().replace(/\//g, '').replace(/\n/, "_").replace(/\:/g, '_')}.log`,//输出日志的文件夹/文件名，不会自动生成文件夹，请先自行创建logs文件夹
                        maxLogSize: 1024 * 1024,//一个文件的大小，超出后会自动新生成一个文件
                        category: 'normal'
                    }
                },
                categories: { default: { appenders: ["normal"], level: "ALL" } },

            });
            this.normal = log4js.getLogger();
            naive.logger = this
           for (let 属性名 in console) {
                if (window.console.hasOwnProperty(属性名)) {
                    window.console["file_" + 属性名] = (...args)=>naive.logger.normal[属性名](...args);
                }
            }
        }
    }
}