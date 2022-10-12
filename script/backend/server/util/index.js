import { shellCmd, npmCmd } from '../../util/shell.js';
import API from './api.js'
export default class serverUtil {
        constructor(naive) {
        }
        //magicstring用于替换文字等
        MagicString = requireInstall('magic-string')
        //fast-glob用于遍历文件夹proxy
        fg = requireInstall('fast-glob')
        //markdown-it用于解析markdown
        mdIt = requireInstall('markdown-it')()
        //用于解析em模块导入
        importParser = requireInstall('es-module-lexer')
        //fs-extra比自带的fs模块要好用一点
        fs = requireInstall("fs-extra")
        //用于执行命令
        shellCmd = shellCmd
        npmCmd = npmCmd
        proxy = requireInstall("express-http-proxy")
        //apiAuthor = require('./apiAuthorization')
        chekEndPoints(expressApp) { return apiAuthor.chekEndPoints(expressApp, {}) }
        API=API
        //用于描述jsonapi
        //describeApi = require('./describeApi')
        //用于描述文件
        //describeFile = require('./describeFile')
        //用于重定向导入
        //importRewriter = require('./parser/importRewriter.js')
        /*compilers = {
                vue: require('./compilers/vue.js')
        }*/
}