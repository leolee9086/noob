const express =require('express')
const jsonReq = require('./middlewares/jsonReq.js')
const auth =naive.middlewares.auth
module.exports = function 初始化后端(){
    //这里的this绑定到插件本身上
    let router =  this.router()
    console.error(router)
    router.get('/',jsonReq,(req,res)=>
         this.管线渲染(req, res)
    )
    router.post('*',jsonReq)
    router.get("/block/:blockid", (req, res) =>
      this.管线渲染(req, res)
    );
    router.get("/block/", (req, res) => this.管线渲染(req, res));
    router.get("/", (req, res) => this.管线渲染(req, res));
    //通过这里查询渲染块数据权限
    router.use('/editor',naive.middlewares.syProxy.proxy)
    router.use('/naiveApi/getPrivateBlock',(req,res)=>{
      let data = req.body
      if(data&&data.id){
          if(naive.私有块字典[data.id]){
              if(data.token==naive.私有块字典[data.id]['token']){
                  res.end(JSON.stringify(
                      {
                          msg:0,
                          data:{
                              content:naive.私有块字典[data.id]['content']
                          }
                      })
                  )
              }
              else{
                  res.end(JSON.stringify(
                      {
                          msg:0,
                          data:{
                              content:`<div>鉴权码错误</div>`
                          }
                      }
                  ))
              }
          }
      }else{
      res.end(JSON.stringify(
          {
              msg:0,
              data:{
                  content:`<div>鉴权码错误</div>`
              }
          }
      ))
      }
  })

}