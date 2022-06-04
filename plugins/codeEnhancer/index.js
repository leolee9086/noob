class  codeEnhancer extends  naive.plugin  {
    constructor(option){
        super(option)
        console.log(this)
        let option1 = {
            块类型:"NodeCodeBlock", 
            菜单文字:"添加样式到窗口",
            菜单图标:"#iconBrush",
            回调函数:this.添加css到窗口, 
            显示判断函数:this.检查是否为css块

        }
        let option2 ={
          块类型:"NodeCodeBlock", 
          菜单文字:"从窗口移除样式",
          菜单图标:"#iconBrush",
          回调函数:this.移除笔记内css,
          显示判断函数:this.检查是否存在样式块
        }
        this.注册块标菜单(option1)
        this.注册块标菜单(option2)
        let option3 ={
          块类型:"NodeCodeBlock", 
          菜单文字:"永久添加到主题",
          菜单图标:"#iconBrush",
          回调函数:this.保存块到样式文件,
          显示判断函数:this.检查是否为css块
        }
        this.获取样式文件()
        this.注册块标菜单(option3)
        let option4 ={
          块类型:"NodeCodeBlock", 
          菜单文字:"从主题样式移除",
          菜单图标:"#iconBrush",
          回调函数:this.永久移除样式,
          显示判断函数:this.检查是否为css块
        }
        this.注册块标菜单(option4)

    }
    async 获取样式文件(){
      let res1 =""
      try{res1 = await fetch("\\appearance\\themes\\naive\\plugins\\codeEnhancer\\inNoteStyles.json");
      this.笔记内样式序列 = await res1.json();
      }catch(e){
      this.笔记内样式序列 = []
      }
      this.加载笔记内样式序列()
    }
    永久移除样式(){
      let 块id =  this.app.当前块id
      let i= this.笔记内样式序列.indexOf(块id)
      this.笔记内样式序列[i]=undefined
      this.笔记内样式序列 =JSON.parse(JSON.stringify(this.笔记内样式序列))
      this.保存样式文件()
      this.移除笔记内css(块id)

      this.移除笔记内样式序列()
      this.加载笔记内样式序列()

    }
    async 保存样式文件(){
      const formData = new FormData()
      let data = JSON.stringify(this.笔记内样式序列, undefined, 4)
      var blob = new Blob([data], { type: 'text/json' })
      formData.append('path', 'conf\\appearance\\themes\\naive\\plugins\\codeEnhancer\\inNoteStyles.json')
      formData.append('modTime', Date.now())
      formData.append('file', blob)
      let data1 = await this.核心api.putFile(formData)
      console.log(data1)
    }
    
    保存块到样式文件(){
      let 块id = this.app.当前块id
      this.笔记内样式序列.push(块id)
      this.保存样式文件()
      this.移除笔记内样式序列()
      this.加载笔记内样式序列()
    }
    加载笔记内样式序列(){
      this.笔记内样式序列.forEach(
        el =>el?this.添加css到窗口(el):null
      )
    }
    移除笔记内样式序列(){
      this.笔记内样式序列.forEach(
        el =>el?this.移除笔记内css(el):null
      )
    }
    检查是否为css块(){
      if(this.app.当前块元素数组){
      let 块元素 = this.app.当前块元素数组[0]
      console.log(this.app.当前块元素数组)
      let lan = 块元素.querySelector(".protyle-action--first.protyle-action__language")
      return lan.innerText=="css"?true:false
      }
    }
     检查是否存在样式块(){
      let 块id = this.app.当前块id
      let style  = document.querySelector(`#style${块id}`)
      console.log(style)
      if(style ){
        return true
      }
      else return false
    }
    async 添加css到窗口(块id){
        !块id?块id=this.app.当前块id:null
        let 块数据 = null;
        let data = {
          stmt: `select * from blocks where id = '${块id}'`,
        };
        let resData = await this.核心api.sql(data)
        块数据 = resData[0];
        if(块数据){
        let css = 块数据.content
        this.加载笔记内css(css,块id)}
      }
      加载笔记内css(css,块id){
        let style  = document.querySelector(`#style${块id}`)
        if(style){
          style.innerHTML=css
        }
        else{
          style=  document.createElement('style')
          style.setAttribute('id','style'+块id)
          document.head.appendChild(style)
          style.innerHTML=css
        }
      }
      移除笔记内css(块id){
        !块id?块id=this.app.当前块id:null

        let style  = document.querySelector(`#style${块id}`)
        style?style.remove():null
      }
}
