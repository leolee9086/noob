function SetRouter(router){
router.use('*',(req,res)=>{
    res.end("测试")
})
}
export default SetRouter