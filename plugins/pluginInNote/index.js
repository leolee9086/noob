class  codeEnhancer extends  naive.plugin  {
    constructor(option){
        super(option)
        console.log(this)
        let option1 = {
            块类型:"NodeCodeBlock", 
            菜单文字:"作为插件安装到窗口",
            菜单图标:"#iconBrush",
            回调函数:this.从dom加载插件, 
            显示判断函数:this.检查是否为js块
        }
        this.注册块标菜单(option1)
        let option2 = {
          块类型:"NodeCodeBlock", 
          菜单文字:"卸载",
          菜单图标:"#iconBrush",
          回调函数:this.从笔记卸载插件, 
          显示判断函数:this.检查是否作为插件安装
      }
      this.注册块标菜单(option2)
      this.加载笔记内插件列表()
      this.笔记内插件序列={}
    }
    async 加载笔记内插件列表(){
      let res1 =""
      try{res1 = await fetch("\\appearance\\themes\\naive\\plugins\\pluginInNote\\pluginIdList.json");
      this.笔记内插件序列 = await res1.json();
      }catch(e){
      this.笔记内插件序列 = {}
      }
      this.加载笔记内插件序列()
    }
    async 加载笔记内插件序列(){
      for(let id in this.笔记内插件序列){
        if(this.笔记内插件序列[id]){
        this.从数据库加载插件(id)}
      }
    }
    async 从数据库加载插件(块id){
      let 块数据 = null;
      let data = {
        stmt: `select * from blocks where id = '${块id}'`,
      };
      let resData = await this.核心api.sql(data)
      块数据 = resData[0];
      let text = ""
      if(块数据){
        text = 块数据.content
        }
        let plugin=window.Function('return '+text)()
        this.app.plugins[this.app.当前块id]=new plugin({name:块id})

    }
    检查是否为js块(){
      if(this.app.当前块元素数组){
      let 块元素 = this.app.当前块元素数组[0]
      console.log(this.app.当前块元素数组)
      let lan = 块元素.querySelector(".protyle-action--first.protyle-action__language")
      return lan.innerText=="js"?true:false
      }
    }
    检查是否作为插件安装(){
     if(this.app.plugins&&this.app.plugins[this.app.当前块id]){
        return true
      }
      else return false
    }
    从笔记卸载插件(){
      this.app.plugins[this.app.当前块id]=null
    
        this.笔记内插件序列[this.app.当前块id].remove()
      
      this.保存插件序列文件()
    }
    从dom加载插件(){
      if(this.app.当前块元素数组){
        let 块元素 = this.app.当前块元素数组[0]
        块元素= 块元素.querySelector('[contenteditable="true"]')
        let text =块元素.innerText
        let plugin=window.Function('return '+text)()
        this.app.plugins[this.app.当前块id]=new plugin({name:块元素.getAttribute("data-node-id")})
        this.笔记内插件序列[this.app.当前块id]=true
        this.笔记内插件序列=Array.from(new Set(this.笔记内插件序列))
        this.保存插件序列文件()
      }
    }
    async 保存插件序列文件(){
      const formData = new FormData()
      let data = JSON.stringify(this.笔记内插件序列, undefined, 4)
      var blob = new Blob([data], { type: 'text/json' })
      formData.append('path', 'conf\\appearance\\themes\\naive\\plugins\\pluginInNote\\pluginIdList.json')
      formData.append('modTime', Date.now())
      formData.append('file', blob)
      let data1 = await this.核心api.putFile(formData)
      console.log(data1)
    }
}
