const passport = require('passport')
const  localStrategy  = require('passport-local')
const { models, checkAdmin, sequelize } = require('../models/index')
passport.use("local", new localStrategy(
    async function (username, passWord, cb) {
        let checkedUser = await models.user.findAll({
            where: {
                name: username,
                password: passWord,
            },
        });
        if(checkedUser && checkedUser[0]){
            return cb(null,checkedUser[0])
        }
        else {
            return cb(null,false,{ message: 'Incorrect username or password.' })
        }
    }
)
)
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
  

module.exports = 
    passport
