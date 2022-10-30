import { ifdefParser } from "./util/index.js";
const esbuild = require('esbuild')
const fs = require('fs-extra')
const MagicString = require('magic-string');
const importParser = require('es-module-lexer')
const resolve = require("resolve")
const path = require("path")
function 重写导入(string,filepath,options,baseUrl) {
    let [imports, exports] = importParser.parse(string)
    let codeMagicString = new MagicString(string)
    imports.forEach(
        导入声明 => {
            if (导入声明.n) {
                导入声明.alias = codeMagicString.slice(导入声明.ss, 导入声明.se)
                codeMagicString.overwrite(导入声明.ss, 导入声明.se, 重写导入包名(导入声明, filepath,options,baseUrl))
            }
        }
    )
    return { code: codeMagicString.toString(), imports: imports.map(item => { return string.substring(item.ss, item.se) }) }
}
function 重写导入包名(导入声明,fileName,options,baseUrl) {
    let name = 导入声明.n
    let originalName = 导入声明.n
    let {base} = options
    console.log(name)
    if(options.alias&&options.alias[导入声明.n]){
        console.log(导入声明.alias)
        导入声明.n=options.alias[导入声明.n]
    }
    let fs = require("fs-extra")
    let path = require('path')
    let dirname = path.dirname(fileName)
    console.log(dirname)
    let reg = /^[\w@](?!.*:\/\/)/
    if (!reg.test(name)) {
        console.log(name)
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
                console.log(e)
                let module = name.replace(base, '')
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
    console.log(name)
    if (fs.existsSync(name + '.ts')) {
        name = name + '.ts'
    }
    if (fs.existsSync(name + '/index.ts')) {
        name = name + '/index.ts'
    }
    name = name.replace(base, '')

    name = name.replace(/\\/g, "/")
    //  name = path.normalize(name)
    if(options.replace[name]){
        name =options.replace[name]
    }

    if (!path.isAbsolute(name)) {
        name = `/deps/${name}`
    }
   
    name=name.replace(base,'/')
    if(!name.startsWith('/deps/')){
    name=path.join(baseUrl,name)
    }
    name = name.replace(/\\/g, "/")

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
function 重写文件名(filepath,options,baseUrl){
    console.log(filepath,baseUrl)
    //去掉URL前缀
    if(filepath.startsWith(baseUrl)){
        filepath=filepath.replace(baseUrl,"")
    }
    filepath=path.join(options.base,filepath)
    console.log(filepath)
    //跟bese连接
    //这里不应该处理
    /*if(filepath.startsWith('/')){
        filepath= path.join(base,filepath)
    }*/
    if(filepath!==path.dirname(filepath)&&fs.existsSync(filepath)){
        return filepath
    }
    if(filepath.endsWith(".ts")&&fs.existsSync(filepath)){
        return filepath
    }
    else if(fs.existsSync(path.join(filepath,'.ts'))){
        return path.join(filepath,'.ts')
    }
    else if(fs.existsSync(path.join(filepath,'/index.ts'))){
        return path.join(filepath,'/index.ts')
    }
  
    else{
        throw(`未找到${filepath}`)
    }
}
export default class {
    async parseFile(filepath, options,baseUrl) {
        try{
            filepath=重写文件名(filepath,options,baseUrl)
        }catch(e){
            throw(e)
        }
        let string = fs.readFileSync(filepath,"utf-8")
        try {
            string = new ifdefParser(options).Parser(string, filepath)
        } catch (e) {
            console.error(filepath, e)
        }

        string = (await esbuild.transform(
            string, {
            loader: 'ts',
            sourcemap: true,
            format: 'esm'
        }
        )).code
       
        string =重写导入(string,filepath,options,baseUrl).code
        return string
      /*  let string
        let hackPath = ''//path.join(options.hackPath, filepath.replace(`D:\\newSiyuan\\conf\\appearance\\themes\\naive\\script\\frontend\\src\\`, ""))
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
            )
        } catch (e) {
            console.error(path, e)
        }

        data = 重写导入(data.code, filepath,options,base)
        if(data.code.indexOf("node_process")>=0){
            console.error(filepath,data.code)
        }
        return data.code*/
    }
}
