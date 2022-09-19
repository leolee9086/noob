export async function 生成发布文档头(req, res, 渲染结果) {
    let unAuthedPageTemplate = naive.serverUtil.fs.readFileSync(
      naive.pathConstructor.templatePath() + "/head.html",
      "utf8"
    );
    let 发布文档头 = this.templateParser.render(unAuthedPageTemplate, {
      naive: naive,
    });
    let head = 渲染结果.querySelector("head");
    head.innerHTML += 发布文档头;
    return 渲染结果;
  }
  