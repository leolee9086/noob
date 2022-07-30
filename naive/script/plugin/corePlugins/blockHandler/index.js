//获取当前块id用

export class blockHandler extends naive.plugin {
  constructor() {
    super({ name: "customEvent" });
    this.setPluginsProp("当前文档id", naive.当前文档id);
    naive.事件总线.on("当前块id改变", this.获取块数组);
    document.addEventListener("click", (event) => this.判定并获取块id(event));
    document.addEventListener("keydown", (event) => this.判定并获取块id(event));
    document.addEventListener("mouseover", (event) => this.判定并获取块id(event));

}
  判定并获取块id(event) {
    if (event && event.target) {
      let target = event.target;
      this.获取id与类型(target);
      this.获取文档id(naive.当前块id);
    }
  }
  获取id与类型(target) {
    if (!target) {
      return;
    }
    if (target.getAttribute("data-node-id")) {
      if (target.getAttribute("data-node-id") !== naive.当前块id) {
        naive.当前块id = target.getAttribute("data-node-id");
        naive.事件总线.emit("当前块id改变", naive.当前块id);

        if (target.getAttribute("data-type")) {
          naive.当前块类型 = target.getAttribute("data-type");
       
        }
      }
      return;
    }
    else if(target.className==("protyle-title__icon")){
        naive.当前块类型="NodeDocument"
        return
    }
    else {
      target = target.parentElement;
      this.获取id与类型(target);
    }
  }
 async 获取文档id(id) {
    if (!id) {
      return;
    }
    if (id !== naive.当前文档id) {
      let data = (await this.kernelApi.sql(
        {stmt:`select root_id from blocks where id ='${id}' `}
       ,''))
    if(data&&data[0]){
       naive.当前文档id = data[0].root_id
      naive.事件总线.emit("当前文档id改变", naive.当前块id);
      this.setPluginsProp("当前文档id", naive.当前文档id);
      console.log(naive.当前文档id)
      }
      return;
    } 
  }

  获取块数组() {
    naive.当前块元素数组 = document.querySelectorAll(
      `div.protyle-wysiwyg div[data-node-id='${naive.当前块id}'`
    );
    if (!naive.当前块元素数组) {
      naive.当前块元素数组 = document.querySelectorAll(
        `div.protyle-wysiwyg[data-node-id='${naive.当前块id}'`
      );
    }
  }
}
