export class unAuthedPage extends naive.plugin {
  constructor() {
    super({ name: "unAuthedPage", sort: 2 });
    this.fs = require("fs");
  }
 
  pipe = [this.判定并生成空页面];
  async 判定并生成空页面(req, res, 渲染结果) {
    if (渲染结果 && req.session) {
      let access = await this.判定id权限(
        渲染结果.head.querySelector("meta").dataset.nodeId,
        "",
        true
      );
      console.error(access);
    //未登录状况以默认权限鉴权
      if (req.session.status !== "Authed") {
        //已经设置了access的路径,根据access鉴权
        if (access == "protected") {
         /* res.redirect('/UnAthorized/private')

          let unAuthedPageTemplate = this.fs.readFileSync(
            naive.pathConstructor.templatePath() + "/unAuthedPage.html",
            "utf8"
          );*/
          res.end(naive.unAuthedPageTemplate.protected);
          console.log(res);
          return 渲染结果;
        } else if (access == "private") {
          /*res.redirect('/UnAthorized/protected')

          let unAuthedPageTemplate = this.fs.readFileSync(
            naive.pathConstructor.templatePath() + "/private.html",
            "utf8"
          );*/
          res.end(naive.unAuthedPageTemplate.private);
          console.log(res);
          return 渲染结果;
        } else if (access == "public") {
          return 渲染结果;
        }
        //没有设置或者为其他值的,根据默认设置鉴权
        else {
            if (!naive.设置.默认发布设置 || naive.设置.默认发布设置 == "private") {
              console.error('test')
              res.redirect('/UnAthorized/private')
              /*let unAuthedPageTemplate = this.fs.readFileSync(
                naive.pathConstructor.templatePath() + "/private.html",
                "utf8"
              );
              res.end(unAuthedPageTemplate);
              console.log(res);*/
            } else if (naive.设置.默认发布设置 == "protected") {
              let unAuthedPageTemplate = this.fs.readFileSync(
                naive.pathConstructor.templatePath() + "/unAuthedPage.html",
                "utf8"
              );
              res.end(unAuthedPageTemplate);
              console.log(res);
            } else if (naive.设置.默认发布设置 == "public"&&!access ) {
                return 渲染结果
            } 
            else if(naive.设置.默认发布设置 == "public"&&access){
                let unAuthedPageTemplate = this.fs.readFileSync(
                    naive.pathConstructor.templatePath() + "/unAuthedPage.html",
                    "utf8"
                    )
                    res.end(unAuthedPageTemplate);
                    return 渲染结果
            }
            else{
                res.end(unAuthedPageTemplate);
                return 渲染结果

            }
    
        } 
      } 
      //已经登录的状况,则以userGroup鉴权
      else if ((access + "").startsWith("userGroup:")) {
        let userGroup = access.slice("userGroup:".length, access.length);
        console.error(userGroup);
        let array = userGroup.split(",");
        //如果块的userGroup包含了当前请求会话所在的userGroup,返回块内容
        if(req.session.user_group=='admin'){
            return 渲染结果;
        }
        if (array.indexOf(req.session.user_group) >= 0) {
          return 渲染结果;
        } else {
          let unAuthedPageTemplate = this.fs.readFileSync(
            naive.pathConstructor.templatePath() + "/private.html",
            "utf8"
          );
          res.end(unAuthedPageTemplate);
          return 渲染结果
        }
      } 
      //如果没有设置userGroup直接返回渲染结果,也就是所有登录用户都可以访问
      else {
        return 渲染结果
      }
    } 
    //如果请求路径有问题,直接重定向到login
    else if (!渲染结果 || !req.session) {
      res.redirect("/user/login");
      return 渲染结果;
    }
  }
}
export const dependencies = ["defaultAuth"];
export const environments = ["APP"];
