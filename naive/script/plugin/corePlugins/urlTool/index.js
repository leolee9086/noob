export class urlTool extends naive.plugin{
    constructor(){
        super({name:""})
        this.打开URL中的块id()

    }
    获取url参数 (参数名) {
        const search = location.search; // 返回类似于 ?a=10&b=20&c=30
        const obj = new URLSearchParams(search);
        return obj.get(参数名)
    }
    打开块id(块id){
        if(!块id){
            return
        }
        //获取编辑器作为目标
       let 临时目标 = document.querySelector('div.protyle-wysiwyg div[data-node-id] div[contenteditable][spellcheck]');
        if (临时目标) {
            let 临时链接 = document.createElement("span");
            临时链接.setAttribute("data-type", "block-ref");
            临时链接.setAttribute("data-id", 块id);
            临时目标.appendChild(临时链接);
            临时链接.click();
            临时链接.remove();
        }else{
            setTimeout(()=>this.打开块id(块id),200)
        }
      }
      打开URL中的块id(){
        let 块id = this.获取url参数('blockid')||this.获取url参数('id')
        this.打开块id(块id)
      }
    
    }