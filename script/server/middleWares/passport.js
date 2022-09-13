const passport = require('passport')
const { localStrategy } =require('passport-local')
const {models,checkAdmin,sequelize} =require('../models/index')
passport.use("local",new localStrategy(
    function(username,passWord,done){
        
    }
) )
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
    

    }
}