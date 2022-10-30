import Compilers from "./compilers/index.js"
const express = require('express')
const _path = require('path')
const parseUrl = require('parseurl')
const Mime = require('mime')
const fs = require('fs-extra')
const targets= {
    "ts":'js',
    "scss":"js",
    "js":"js",
    "html":"html"
}
let compiler = new Compilers()
const langs = ['ts','js','scss']
export default  function compile(options){
    //如果没有传入options就从文件系统读取
    if(!options&&fs.existsSync(_path.join(dir,'compileConfig.json'))){
        options=fs.readJSONSync(path.join(dir,'compileConfig.json'),'utf-8') 
    }
    if(!options){
        throw  ('必须传入options')
    }
    let _static =  express.static(options.base)
    return async (req,res,next) => {
        let path = parseUrl(req).pathname
        let baseUrl = req.baseUrl
        console.log(req)
        let extension = path.split(".").pop()
        console.log(extension)
        console.log(path.indexOf('.'))
        if(extension==path){
            extension='html'
        }
        if(!extension){
            extension='html'
        }
        console.log(extension)
        if(targets[extension]){
            let mimetype= Mime.types[targets[extension]]+'; UTF-8'
            res.setHeader(
                'content-type', mimetype
              )
            res.end(await compiler.compile(path,options,baseUrl))
        }else{
            _static (req,res,next)
        }
    }
}