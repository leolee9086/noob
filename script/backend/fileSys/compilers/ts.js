import { ifdefParser } from "./util/index.js";
const esbuild = requireInstall('esbuild')
const fs = requireInstall('fs-extra')
const MagicString = requireInstall('magic-string');
const importParser = requireInstall('es-module-lexer')
const resolve = requireInstall("resolve")
const path = require("path")
function 重写导入(code, fileName,options) {
    let [imports, exports] = importParser.parse(code)
    let codeMagicString = new MagicString(code)
    imports.forEach(
        导入声明 => {
            if (导入声明.n) {
                导入声明.alias = codeMagicString.slice(导入声明.ss, 导入声明.se)
                codeMagicString.overwrite(导入声明.ss, 导入声明.se, 重写导入包名(导入声明, fileName,options))
            }
        }
    )
    return { code: codeMagicString.toString(), imports: imports.map(item => { return code.substring(item.ss, item.se) }) }
}
function 重写导入包名(导入声明, fileName,options) {
    let name = 导入声明.n
    let originalName = 导入声明.n
    let fs = require("fs-extra")
    let path = require('path')
    let dirname = path.dirname(fileName)
    let reg = /^[\w@](?!.*:\/\/)/
    if (reg.test(fileName)) {
        try {
            try {
                name = resolve.sync(name + '/index.ts', { basedir: dirname });
            } catch (e) {
                name = resolve.sync(name + '/index.js', { basedir: dirname });
            }
        } catch (e) {
            try {
                try {
                    name = resolve.sync(name + '.ts', { basedir: dirname })
                } catch (e) {
                    try {
                        name = resolve.sync(name + '.js', { basedir: dirname });
                    } catch (e) {
                        name = resolve.sync(name, { basedir: dirname });

                    }
                }
            } catch (e) {
                let module = name.replace(`D:/newSiyuan/conf/appearance/themes/naive/script/frontend/src/`, '')
                module = name.replace('.ts', '')
                module = name.replace('.js', '')

                name = `/deps/${module}`
                console.warn(
                    {
                        path: fileName,
                        warn: `模块${module}未找到,重定向到deps`
                    }
                )

            }
        }
    }
    else {
        console.error(name)
    }
    if (fs.existsSync(name + '.ts')) {
        name = name + '.ts'
    }
    if (fs.existsSync(name + '/index.ts')) {
        name = name + 'index.ts'
    }
    name = name.replace(/\\/g, "/")
    name = name.replace(`D:/newSiyuan/conf/appearance/themes/naive/script/frontend`, '')
    //  name = path.normalize(name)
    if(options.replace[name]){
        name =options.replace[name]
    }

    if (reg.test(name)) {
        name = `/deps/${name}`
    }
    导入声明.alias = 导入声明.alias.replace(`"${originalName}"`,`"${name}"`)
    if(导入声明.alias.indexOf('*')>=0&&导入声明.alias.indexOf("as")>=0){
        let a =  导入声明.alias.replace("import","").replace("*","").replace("as","").replace(`"${name}"`,"").replace("from","")
        //console.error(a)
        a=a.split(' ').join("")
        导入声明.alias = `
        import { default as ${a} } from "${name}"
        import * as _${a}_default from "${name}"
        ${a}["default"]= _${a}_default
        `
    }
    
    return 导入声明.alias
}

export default class {
    async parseFile(filepath, options) {
        let string
        let hackPath = path.join(options.hackPath, filepath.replace(`D:\\newSiyuan\\conf\\appearance\\themes\\naive\\script\\frontend\\src\\`, ""))
        if (fs.existsSync(hackPath)) {
            console.warn("hacked",path,hackPath)

            string = fs.readFileSync(hackPath, 'utf-8')
            if (fs.existsSync(hackPath+'.tpl')) {
                string = fs.readFileSync(hackPath+'.tpl', 'utf-8')
                string = (new Function(string))()
            }
    
        }
        else {
            if (fs.existsSync(filepath + '.ts')) {
                filepath = filepath + ".ts"
            }
            else if (fs.existsSync(filepath + '/index.ts')) {
                filepath = filepath + "/index.ts"
            }

            try {
                string = fs.readFileSync(filepath, 'utf-8')
            } catch (e) {
                console.error(filepath, e)
                console.log('尝试从esm获取')
                return
            }
        }

        let data

        try {
            string = new ifdefParser(options).Parser(string, filepath)
        } catch (e) {
            console.error(path, e)
        }

        try {
            data = await esbuild.transform(
                string, {
                loader: 'ts',
                sourcemap: true,
                format: 'esm'
            }
            )/*.then(data => {
                return data
            }).catch(e => { 
                throw e.message 
            }
            )*/
        } catch (e) {
            console.error(path, e)
        }

        data = 重写导入(data.code, filepath,options)
        if(data.code.indexOf("node_process")>=0){
            console.error(filepath,data.code)
        }
        return data.code
    }
}
