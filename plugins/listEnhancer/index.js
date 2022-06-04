class  listEnhancer extends  naive.plugin  {
    constructor(option){
        super(option)
        console.log(this)
        this.app.加载css("/appearance/themes/naive/plugins/listEnhancer/list.css")
        let option1 = {
            块类型:"NodeList", 
            菜单文字:"显示为树形表格",
            菜单图标:"#iconList",
            回调函数:this.显示为树形表格, 
        }
        let option2 = {
          块类型:"NodeList", 
          菜单文字:"显示为思维导图",
          菜单图标:"#iconList",
          回调函数:this.显示为思维导图, 
        }
        let option3 = {
          块类型:"NodeList", 
          菜单文字:"显示为默认视图",
          菜单图标:"#iconList",
          回调函数:this.显示为默认, 
        }
        this.注册块标菜单(option1)
        this.注册块标菜单(option2)
        this.注册块标菜单(option3)
    }
    显示为树形表格(){
      let 块id = this.app.当前块id

      let blocks = document.querySelectorAll(
        `.protyle-wysiwyg [data-node-id="${块id}"]`
      );
      if (blocks[0]) {
        blocks.forEach((block) => block.setAttribute("custom-type", "table"));
      }
      this.kernalApi.设置块属性({
        id:块id,
        attrs:{"custom-type": "table"}
      })
    }
    显示为思维导图(){
      let 块id = this.app.当前块id
      let blocks = document.querySelectorAll(
        `.protyle-wysiwyg [data-node-id="${块id}"]`
      );
      if (blocks[0]) {
        blocks.forEach((block) => block.setAttribute("custom-type", "map"));
      }
      this.kernalApi.设置块属性({
        id:块id,
        attrs:{"custom-type": "map"}
      })

    }
    显示为默认 () {
      let 块id = this.app.当前块id

      let blocks = document.querySelectorAll(
        `.protyle-wysiwyg [data-node-id="${块id}"]`
      );
      if (blocks[0]) {
        blocks.forEach((block) => block.setAttribute("custom-type", ""));
      }
      this.kernalApi.设置块属性({
        id:块id,
        attrs:{"custom-type": ""}
      })
    };
}
