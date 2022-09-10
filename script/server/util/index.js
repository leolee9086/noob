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
        fs: require("fs-extra")
    
}