const passport = require('passport')
const { Strategy } =require('passport-local')
const {models,checkAdmin,sequelize} =require('../models/index')
passport.serializeUser(function(user,done){
    done(null,user)
})
passport.deserializeUser(function(user,done){
    done(null,user)
})

module.exports={
    addLocalStrategy:function(app){
    app.use(passport.initialize())
    app.use(passport.session())
    app.post('/naiveApi/system/stageAuth',function(req,res,next){
        
    })    

    }
}