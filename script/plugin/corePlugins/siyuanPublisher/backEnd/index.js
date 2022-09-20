const express =require('express')
const jsonReq = require('./middlewares/jsonReq.js')
module.exports = function 初始化后端(){
    console.log(this)
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
    //允许搜索时,能够访问文档树
    router.post("/api/notebook/lsNotebooks", (req, res) => {
      if (this.realoption.允许搜索) {
        this.转发JSON请求(req, res, true);
      }
    });
    //允许搜索时,能够列出所有文档
    router.post("/api/filetree/listDocsByPath", (req, res) => {
      if (this.realoption.允许搜索) {
        this.转发JSON请求(req, res, true);
      }
    });
    //允许搜索时,能够搜索所有文档,这里需要加上鉴权
    router.post("/api/search/fullTextSearchBlock", (req, res) => {
      if (this.realoption.允许搜索) {
        this.转发JSON请求(req, res, true);
      }
    });
    //允许搜索时,能够嵌入所有块,这里需要加入鉴权
    router.post("/api/search/searchEmbedBlock", (req, res) => {
      if (this.realoption.允许搜索) {
        this.转发JSON请求(req, res, true);
      }
    });
    //暴露api时,能够访问大部分api
    router.post("/api/*", (req, res) => {
      if (this.realoption.暴露api) {
        this.转发JSON请求(req, res, false);
      } else {
        res.sendStatus(404);
      }
    });
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