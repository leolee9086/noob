module.exports =  function(req,res,next){
    if(req.headers){
        console.log(req.headers)
        if(!req.headers['Content-Type']){
            req.headers['Content-Type']='application/json;charset=UTF-8'
        }
        next()
    }
}