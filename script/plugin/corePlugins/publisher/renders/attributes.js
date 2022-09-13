export async function 注入块属性(req, res, 渲染结果) {
    let blockid =
      req.params.blockid ||
      req.query.blockid ||
      req.query.id ||
      naive.设置.首页.思源文档id;
    if (blockid == "unidefined") {
      blockid = ''
    }
    let block = await naive.核心api.getDoc(
      { id: blockid, k: "", size: 102400, mode: 0 },
      ""
    );
  
    if (block) {
      let docInfor = await naive.核心api.getDocInfo({ id: blockid });
      block.docInfor = docInfor;
      渲染结果.block = block;
      return 渲染结果
    }
    else {
      let emptyPage = naive.serverUtile.fs.readFileSync(naive.pathConstructor.templatePath() + '/empty.html', 'utf8')
      渲染结果 = emptyPage
      渲染结果.完成 = true
      return 渲染结果
    }
  }
  