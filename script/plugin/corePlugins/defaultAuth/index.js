export class defaultAuth extends naive.plugin {
  constructor() {
    super({ name: "defaultAuth", sort: 2 });
    this.expressApp.post("/naiveApi/system/blockAuth", (req, res) =>
      this.请求鉴权(req, res)
    );
    this.setPluginsProp({中文:"判定id权限"}, this.判定id权限);
    this.setPluginsProp({中文:"解析路径"}, this.解析路径);
    this.setPluginsProp({中文:"校验权限",en:"checkAccessAuth"}, this.checkAccessAuth);
    this.setPluginsProp({中文:"生成路径权限表"}, this.生成路径权限表);
    this.setPluginsProp({中文:"判定路径权限"}, this.判定路径权限);
    this.setPluginsProp({中文:"批处理判定路径权限"}, this.批处理判定路径权限);
    this.setPluginsProp({中文:"批处理判定id权限"}, this.批处理判定id权限);
  }
  pipe = [this.生成文档元数据, this.鉴权];

  请求鉴权(req, res) {
    let id =
      req.params.blockid || req.query.blockid || req.query.id || req.body.id;
    let query = req.query;
    res.json({
      accessed: this.判定id权限(id, query),
    });
  }
  生成文档元数据(req, res, 渲染结果) {
    if(req.headers["user-agent"]){
        渲染结果.reqHeaders= req.headers
    }

    let id = req.params.blockid || req.query.blockid || req.query.id;
    let meta = 渲染结果.createElement("meta");
    if (id) {
      meta.setAttribute("data-node-id", id);
    } else if (req.url == "/") {
      meta.setAttribute(
        "data-node-id",
        naive.设置.首页.id || naive.设置.首页.思源文档id || naive.设置.首页
      );
    }
    meta.setAttribute("charset", "UTF-8");
    渲染结果.head.appendChild(meta);
    return 渲染结果;
  }
  async 鉴权(req, res, 渲染结果) {
    let meta = 渲染结果.head.querySelector("meta");
    let id = meta.getAttribute("data-node-id");
    let id鉴权结果 = false;
    if (id == null) {
      return 渲染结果;
    } else {
      id鉴权结果 = await this.判定id权限(id, req.query);
    }
    meta.setAttribute("data-access", id鉴权结果);
    return 渲染结果;
  }
  async 判定路径权限(路径, accessedArray,multi) {
    if (!accessedArray) {
      accessedArray = await this.生成路径权限表();
    }
    let 鉴权块 = { path: "" };
    for (let i = 0; i < accessedArray.length; i++) {
      let block = accessedArray[i];
      //如果块的路径包含了鉴权序列中的某个路径,说明这个块在这个路径下
      if (路径.replace(".sy", "").indexOf(block.path.replace(".sy", "")) >= 0) {
        if (block.path.length >= 鉴权块.path.length) {
          鉴权块 = block;
        }
      }
    }
    if(!multi){
     if(鉴权块.value == "public"){
      return true
     }
     else if(['public',"private",'protected'].indexOf(鉴权块.value)<0){
      return naive.设置.默认发布设置=='public'?true:false
     }
     else{
      return false
     }
    }
    else{
        if(['public',"private",'protected'].indexOf(鉴权块.value)>=0||(鉴权块.value&&鉴权块.value.startsWith('userGroup:'))){
        return 鉴权块.value
      }
      else{
        return naive.设置.默认发布设置
      }
    }
  }
  async 批处理判定路径权限(块数组) {
    let accessedArray = await this.生成路径权限表();
    for (let i = 0; i < 块数组.length; i++) {
      let 块数据 = 块数组[i];
      let path = 块数据.path;
      块数据.accessed = await this.判定路径权限(path, accessedArray);
      if(!块数据.accessed){
        for (let attr in 块数据){
            if(块数据.hasOwnProperty(attr)){
                if(!(['path','type','subType','subFileCount','id','color','size','box','rootID','root_id',].indexOf(attr)>=0)){
                    块数据[attr]="私有块不可访问"
                    if(attr=='color'){
                        块数据[attr]={background: "red"}
                    }
                }
                /*if(attr!=='path'&&attr!=="type"&&attr!=='subType'&&attr!=='subFileCount'&&attr!=='id'){
                块数据[attr]="私有块不可访问"
                }*/
           }
        }
      }
    }
    
    return 块数组;
  }
  async 批处理判定id权限(块数组,query,multi){
    let sql = ''
    块数组.forEach(
      (块数据,i)=>{
        let id = 块数据.id 
        sql+=i!==0?`or id = '${id}' `:` id = '${id}'`
      }
    )
    sql = 'select * from blocks where '+sql
    let resdata = await  this.核心api.sql({stmt:sql},'')
    resdata.forEach(
      data=>{
        块数组.forEach(
          块=>{块.id==data.id?块.path=data.path:null}
        
      )
      }
    )
    return await this.批处理判定路径权限(块数组)
  }
  async 判定id权限(块id,query,multi) {
    let flag = false;
    let 块信息数组 = await 思源api.以sql向思源请求块数据(
      `${naive.设置.思源伺服地址}:${naive.设置.思源伺服端口}`,

      "",
      `select root_id , path  from blocks where id = '${块id}' and not id in (
        select block_id from attributes where name = 'custom-publish-token'
      )`
    );
    if (块信息数组 && 块信息数组[0]) {
      let 路径 = 块信息数组[0].path;
      flag = await this.判定路径权限(路径,"",multi);
    }
    
    return flag;
  }
  async 解析路径(path, realoption) {
    let pathArray = path.replace(".sy", "").split("/");
    pathArray = pathArray.slice(1, pathArray.length);
    let obj = {};
    for (let i = 0; i < pathArray.length; i++) {
      let element = pathArray[i];
      obj[element] = {};
      let attrs = await 思源api.以sql向思源请求块数据(
        `${naive.设置.思源伺服地址}:${naive.设置.思源伺服端口}`,
        "",
        `select * from attributes where root_id = '${element}'`
      );
      attrs.forEach((attr) =>
        attr ? (obj[element][attr.name] = attr.value) : null
      );
    }
    return obj;
  }
  async 生成路径权限表() {
    let stmt = `
        SELECT *
        FROM attributes AS a
        WHERE (a.name = 'custom-publish-access' ) and (a.root_id = a.block_id)
        `;
    let accessedArray = await this.核心api.sql({ stmt: stmt }, "");
    return accessedArray;
  }
  checkAccessAuth(块数据, query) {
    let flag = false;
    for (属性名 in 块数据) {
      if (属性名.startsWith("custom-publish-access-")) {
        let 用户名 = query.user;
        let 密码 = query.passWord;
        if (
          "custom-publish-access-" + 用户名 + "" == 属性名 &&
          密码 == 块数据[属性名]
        ) {
          flag = true;
        }
      }
    }
    return flag;
  }
}
export const dependencies = [
  "template",
  "siyuanRouter",
  "siyuanPublisher",
];
export const environments = ["APP"];
