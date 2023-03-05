import { workspaceDir } from "./file.js"
export const noob文件夹路径 = `${workspaceDir}/data/snippets/noobFiles`
export const noob设置文件路径 = `${workspaceDir}/conf/noobConf/config.json`
export const noob开发设置文件路径 = `${workspaceDir}/conf/noobConf/devConfig.js`
export const noob缓存路径 = `${workspaceDir}/temp/noobCache`
export const noob主题路径 = `${workspaceDir}/conf/appearance/themes/noob`
//测试文件
export const noob服务文件夹路径 = `${noob文件夹路径}/servicies`
export const 思源设置路径 = `${workspaceDir}/conf/appearance/conf.json`
export const 核心服务列表 = [
    'noob-service-compiler',
/*    'noob-service-sypublisher',
    'noob-service-vite',
    'noob-service-pm2'*/
]
export const 核心依赖列表 = ['noob-lib-middleware','noob-lib-util']