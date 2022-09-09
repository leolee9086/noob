import MagicString from '/deps/magic-string';

export class pluginInNote extends naive.plugin {
  constructor() {
    super({ name: "pluginInNote" });
    this.已缓存笔记列表={}

    !naive.pluginInNote ? (naive.pluginInNote = {}) : null;
    this.pluginInNoteError = {};
    let style = document.head.querySelector("#pluginNoteStyle");
    let errorstyle = document.head.querySelector("#pluginNoteErrorStyle");

    if (!style) {
      style = document.createElement("style");
      style.setAttribute("id", "pluginNoteStyle");
      errorstyle = document.createElement("style");
      errorstyle.setAttribute("id", "pluginNoteErrorStyle");
      document.head.appendChild(style);
      document.head.appendChild(errorstyle);

      style.innerHTML = `
            .protyle-wysiwyg.protyle-wysiwyg--attr[data-doc-type="NodeDocument"][custom-publish-as="plugin"]::before{
                content:"publish-as:plugin";
                display:block;
                color:var(--b3-card-info-color)
            }
            `;
    }
    this.style = style;
    this.errorstyle = errorstyle;
    this.根据属性获取插件块({ "custom-publish-as": "plugin" }, "d");
  }
  async 根据属性获取插件块(属性对象, 块类型) {
    let stmt = `select * from blocks where id in `;
    for (let 属性名 in 属性对象) {
      let 属性值 = 属性对象[属性名];
      let 字符串 = `( select block_id from attributes where name = "${属性名}" and value = "${属性值}")`;
      if (!stmt == `select * from blocks where id in `) {
        stmt += "and id in" + 字符串;
      } else {
        stmt += 字符串;
      }
    }
    stmt += ` and type = "${块类型}"`;
    let res = await this.核心api.sql({ stmt: stmt }, "");
    console.log(res);
    if (res && res[0]) {
      res.forEach((block) => {
        let 缓存路径 = this.initFolder()+`/notes/${block.id}.js`
        this.获取笔记内插件内容(block.id,缓存路径);
      });
    }
  }
   parseImport(code){
    let [imports,exports]=naive.parseImport(code)
    let codeMagicString =  new MagicString(code)
    imports.forEach(
        导入声明=>{
            codeMagicString.overwrite(导入声明.s,导入声明.e,this.重写导入(导入声明))
        }
    )
    return codeMagicString.toString()
  }
   重写导入(导入声明){
    let path = require('path')
    let name =导入声明.n
    name = name.replace(/\\/g,"/")
    name = name.replace("//","/")
    if(name.startsWith('/block/')){
        let 块id =  name.replace('/block/','')
        name = path.normalize(path.resolve(this.initFolder(),'notes/'+name)).replace(/\\/g,"/")
        let 缓存路径 = this.initFolder()+`/notes/${块id}.js`
        this.缓存笔记内脚本内容(块id,缓存路径)
    }
    else if(name.startsWith('./')||name.startsWith('../')||name.startsWith('./')||name.startsWith('/')){
      return name
    }
    else {
      console.log(`模块${name}重定向到naive设置文件夹/deps/esm`)
      return 'http://127.0.0.1/deps/'+ name
    }
  }
  async 缓存笔记内脚本内容(块id,缓存路径){
    if(!this.已缓存笔记列表[缓存路径]){
        this.已缓存笔记列表[缓存路径]={}
    }
    if( !this.已缓存笔记列表[缓存路径][块id]){
    this.已缓存笔记列表[缓存路径][块id]={}
    }
    else{
        return
    }
    let doc = await this.核心api.getDoc(
        { id: 块id, mode: 0, size: 102400, k: "" },
        ""
      );
      console.log(doc);
      let div = document.createElement("div");
      div.innerHTML = doc.content;
      console.log(div);
      let codeBlocks = div.querySelectorAll(
        "div[data-node-id]:not(div[data-node-id] div[data-node-id])"
      );
      console.log(codeBlocks);
      let code = "";
      codeBlocks.forEach((el) => {
        if (
          el.querySelector(".protyle-action__language") &&
          ["js", "javascript"].indexOf(
            el.querySelector(".protyle-action__language").innerHTML
          ) >= 0
        ) {
          code += el.querySelector(".hljs").innerText;
        } else {
          let textels = el.querySelectorAll(`div[contenteditable="true"]`);
          textels.forEach((child) => {
            let text = child.innerText;
            let textArray = text.split(/\r\n|\n|\r/);
            textArray.forEach((line) => (code += "//" + line + "\n"));
          });
        }
      });
      console.log(code);
      code =await this.parseImport(code)
      console.log(code);

      naive.pathConstructor.mkfilep(缓存路径, code);
      this.已缓存笔记列表[缓存路径][块id]=code
  }
  async 获取笔记内插件内容(块id) {
    let cachePath = this.initFolder();
    let filePath = cachePath + `/plugins/plugin-${块id}.js`;
    await this.缓存笔记内脚本内容(块id,filePath)
    try {
      let module =await import(filePath)/*.then((module, error) => {
        if (error) {
          console.force_log(error);
        } else {
          return module;
        }
      });*/
      let pluginClass = new module["plugin"]();
      console.force_log(module, pluginClass);
      naive.pluginInNote[pluginClass.name] = pluginClass;
    } catch (e) {
      console.table(e)
      console.force_table(e.stack);
      this.pluginInNoteError[块id] = e;
      this.errorstyle.innerHTML += `
            .protyle-background[data-node-id="${块id}"] ~ [data-doc-type="NodeDocument"]::before{
                content:'加载错误: ${e.message.replace(/\'/g,'"').replace('\"','\"')}' !important;
                color:var(--b3-card-error-color) !important;
                border:dashed 2px var(--b3-card-error-color)
            }
            `;
    }
  }
}
export const dependencies = ["commonMenu"];
export const environments = ["APP"];
