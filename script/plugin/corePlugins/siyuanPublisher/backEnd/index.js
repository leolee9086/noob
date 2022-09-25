const express =require('express')
const jsonReq = require('./middlewares/jsonReq.js')
const auth =naive.middlewares.auth
module.exports = function 初始化后端(){
    //这里的this绑定到插件本身上
    let router =  this.router()
    require('./api.js')(this)

}