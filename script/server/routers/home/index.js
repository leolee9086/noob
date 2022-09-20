const express = require('express');
const router = express.Router();
const fs = require('fs-extra')
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.use('/',(req,res,next)=>{
    console.log(req.originalUrl)
    if(req.originalUrl=="/"){
        if(!naive.homePageProvider){
        res.redirect("/siyuanPublisher/")
        }
        else(
            naive.homePageProvider(req,res)
        )
    }
    else{
        next()
    }
})
if (naive.publishOption.暴露附件) {
    router.use("/assets",express.static(naive.workspaceDir+'/data/assets'));
}
router.use("/upload",apiProxy)
module.exports=router