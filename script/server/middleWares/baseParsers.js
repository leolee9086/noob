const {middlewares} =naive
module.exports = function addBaseParser(app){
      app.use(middlewares.session)
      app.use(middlewares.json); //body-parser 解析json格式数据
      app.use(middlewares.urlencoded);
      app.use(middlewares.compression);
}
