const { shellCmd, npmCmd } = require('./shell');
const proxy = require("express-http-proxy")
const apiAuthor = require('./apiAuthorization')
module.exports = {
        //magicstring用于替换文字等
        MagicString: require('magic-string'),
        //fast-glob用于遍历文件夹
        fg: require('fast-glob'),
        //markdown-it用于解析markdown
        mdIt: require('markdown-it')(),
        //用于解析em模块导入
        importParser: require('es-module-lexer'),
        //fs-extra比自带的fs模块要好用一点
        fs: require("fs-extra"),
        //用于执行命令
        shellCmd: shellCmd,
        npmCmd: npmCmd,
        proxy: proxy,
        apiAuthor: apiAuthor,
        chekEndPoints: () => { return naive.serverUtil.apiAuthor.chekEndPoints(naive.expressApp, {}) },
        //用于描述jsonapi
        describeApi:require('./describeApi'),
        //用于描述文件
        describeFile:require('./describeFile'),
        //用于重定向导入
        importRewriter:require('./parser/importRewriter.js'),
        compilers:{
                vue:require('./compilers/vue.js')
        }
}