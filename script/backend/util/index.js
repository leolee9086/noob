import { shellCmd, npmCmd } from './shell.js';
import API from './api.js'
export default class serverUtil {
        constructor(naive) {
        }
        //magicstring用于替换文字等
        MagicString = require('magic-string')
        //fast-glob用于遍历文件夹proxy
        fg = require('fast-glob')
        //markdown-it用于解析markdown
        mdIt = require('markdown-it')()
        //用于解析em模块导入
        importParser = require('es-module-lexer')
        //fs-extra比自带的fs模块要好用一点
        fs = require("fs-extra")
        //用于执行命令
        shellCmd = shellCmd
        npmCmd = npmCmd
        proxy = require("express-http-proxy")
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