const express = require('express');
const router = express.Router();
const fs = require('fs-extra')
const MagicString = require("magic-string")
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy
const {importParser} =  naive.serverUtil

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

router.use("/emojis",express.static(`${naive.workspaceDir}/conf/appearance/emojis`));
if (naive.publishOption.暴露挂件) {
    router.use(
      "/widgets",express.static(`${naive.workspaceDir}/data/widgets`))
}
function parseImport(code) {
    console.force_log(importParser.parse(code))
    let [imports, exports] = importParser.parse(code)
    let codeMagicString = new MagicString(code)
    imports.forEach(
      导入声明 => {
        if (导入声明.n) {
          codeMagicString.overwrite(导入声明.s, 导入声明.e, 重写导入(导入声明))
        }
      }
    )
    return codeMagicString.toString()
  }
  function 重写导入(导入声明) {
    console.log(导入声明)
    let name = 导入声明.n
    if (name && !name.startsWith('/') && !name.startsWith('./') && !name.startsWith('../')) {
      console.log(`模块${name}重定向到naive设置文件夹/deps/esm`)
  
      name = '/deps/' + name
    } else {
      console.log(导入声明)
    }
    return name
  }
router.use("/plugins/*", async function (req, res, next) {
    console.log(req);
    let parsedUrl = req._parsedUrl;
    parsedUrl.pathname = decodeURI(parsedUrl.pathname);
    try {
      if (req.query.condition) {
        let content = await naive.ifdefParser.parse(
          `${naive.pathConstructor.pluginsPath().replace("/plugins", "")}${parsedUrl.pathname
          }`,
          req.query.condition ? JSON.parse(req.query.condition) : {}
        );
        content = parseImport(content)
        res.type("application/x-javascript");
        res.end(content);
      } else {
        if (req.baseUrl.endsWith('.js')) {
          let content = naive.serverUtil.fs.readFileSync(`${naive.pathConstructor.pluginsPath().replace("/plugins", "")}${parsedUrl.pathname
            }`, 'utf-8')
          content = parseImport(content)
          res.type("application/x-javascript");
          console.log(content)
          res.end(content);
        }
        else try {
          let e = fs.existsSync(
            `${naive.pathConstructor.pluginsPath().replace("/plugins", "")}${parsedUrl.pathname
            }`
          );
          if (e) {
            await res.sendFile(
              `${naive.pathConstructor
                .pluginsPath()
                .replace("/plugins", "")}${parsedUrl.pathname}`
            );
          } else {
            res.status(404);
            res.end();
          }
        } catch (e) {
          res.end(e.message);
        }
      }
    } catch (e) {
      res.end(e.message);
    }
  });

  router.use("/script/*", async function (req, res, next) {
    console.log(req);
    let parsedUrl = req._parsedUrl;
    console.log(req.query);
    if (req.query.condition) {
      try {
        let content = await naive.ifdefParser.parse(
          `${naive.pathConstructor.naivePath()}/${parsedUrl.pathname}`,
          req.query.condition ? JSON.parse(req.query.condition) : {}
        );
        res.type("application/x-javascript");
        content = parseImport(content)

        res.end(content);
      } catch (e) {
        console.log("解析失败", e);
        res.end("解析失败");
      }
    } else {
      if (req.baseUrl.endsWith('.js')) {
        let content = fs.readFileSync(`${naive.pathConstructor.naivePath()}/${parsedUrl.pathname}`, 'utf-8')
        content = parseImport(content)
        res.type("application/x-javascript");
        res.end(content);
      } else {

        res.sendFile(
          `${naive.pathConstructor.naivePath()}/${parsedUrl.pathname}`
        );
      }
    }
  }
  );

module.exports=router