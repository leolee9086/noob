import {主题插件} from "../../script/app/plugin.js"
export  class  styleEnhancer extends  主题插件  {
    constructor(option){
        super(option)
        console.log(this)
        let option = {
            块类型:"NodeHeading", 
            菜单文字:"转换为子文档",
            菜单图标:"#iconFile",
            回调函数:this.转换标题为子文档 
        }
        this.注册块标菜单(option)
    }
    转换标题为子文档(){
        let 块id = this.app.当前块id
        let 块数据 = null;
        let data = {
          stmt: `select * from blocks where id = '${块id}'`,
        };
        let resData = null;
        await fetch("/api/query/sql", {
          body: JSON.stringify(data),
          method: "POST",
          headers: {
            Authorization: `Token `,
          },
        }).then(function (response) {
          resData = response.json();
        });
        console.log(await resData)
        块数据 =(await resData)["data"][0];
        let data1 = {
          pushMode: 0,
          srcHeadingID: 块id,
          targetNoteBook: 块数据.box,
          targetPath: 块数据.path,
        };
        await fetch("/api/filetree/heading2Doc", {
          body: JSON.stringify(data1),
          method: "POST",
          headers: {
            Authorization: `Token `,
          },
        }).then()
        let 块标菜单 = document.getElementById("commonMenu");
        块标菜单.setAttribute("class","b3-menu fn__none")
    }
}