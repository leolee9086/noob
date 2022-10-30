 const fs= require("fs-extra")
 const glob = require("fast-glob")
 const path  = require("path")
 const remote = require(path.join(appDir,"app",'node_modules','@electron/remote'))
 let extensions = {}
 try{
    extensions= fs.readJSONSync("D:\\newSiyuan\\conf\\naiveConf\\config\\extensions.json")
 }catch(e){
    console.log(e)
 }
 console.log(extensions)
 let list = Object.getOwnPropertyNames(extensions)
import toolbar from './toolbar.js'