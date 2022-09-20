async function 加载发布路由() {
    let routerTemplatesPath =
    naive.pathConstructor.templatePath() + "/routerTemplate";
    console.log("自定义路由路径", routerTemplatesPath);
    let 路由列表 = fs.readdirSync(routerTemplatesPath);
    路由列表.forEach((路由) => {
      if (fs.statSync) {
        let stats = fs.statSync(routerTemplatesPath + `/${路由}`);
        var isFile = stats.isFile(); //是文件
        var isDir = stats.isDirectory(); //是文件夹
        console.log("自定义路由", stats);
        if (isDir) {
          let routerIndexPath = routerTemplatesPath + `/${路由}/index.js`;
          let routerIndexExists = fs.existsSync(routerIndexPath);
          if (routerIndexExists) {
            try {
              this.加载路由文件(routerIndexPath, "index.js", 路由);
            } catch (e) {
              console.error(`用户插件${路由}加载失败` + ":\n" + e);
            }
          }
        }
      }
    });
    console.log("自定义路由列表", 路由列表);
  }
  async function 加载路由文件(文件路径, 文件类型, 路由名称) {
    if (文件类型 == "index.js") {
      try {
        let module = await import(文件路径);
        if (module.router) {
          module.router.prototype.use = function (path, cb) {
            naive.expressApp.use(`/app/${路由名称}/${path}`, cb);
          };
          module.router.prototype.get = function (path, cb) {
            naive.expressApp.get(`/app/${路由名称}/${path}`, cb);
          };
          module.router.prototype.post = function (path, cb) {
            naive.expressApp.post(`/app/${路由名称}/${path}`, cb);
          };
          module.router.prototype.engine = function (path, cb) {
            naive.expressApp.engine(`/app/${路由名称}/${path}`, cb);
          };
          module.router.prototype.put = function (path, cb) {
            naive.expressApp.put(`/app/${路由名称}/${path}`, cb);
          };
          new module.router();
        }
      } catch (e) {
        throw e;
      }
    }
  }
