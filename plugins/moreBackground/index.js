class  docEnhancer extends  naive.plugin  {
    constructor(option){
        super(option)
        console.log(this)
        this.注册图标(
          {
            id:"iconUnsplash",
            content:`
            <path d="M320 288V0h384v288h-384z m384 160H1024V1024H0V448h320v288h384V448z" p-id="2167"></path>
            `
          }
        )
        let 头图按钮配置1 = {
          type:"unsplash",
          label:"",
          回调函数:(event)=>this.获取unsplash图片(event),
          图标:"#iconUnsplash"
        }
        this.注册头图按钮(头图按钮配置1)
        let 头图按钮配置2 = {
          type:"acg",
          label:"小筑",
          回调函数:(event)=>this.获取acg图片(event),
          图标:"#iconImage"
        }
        this.注册头图按钮(头图按钮配置2)
    }
    async 获取acg图片(event){
      event.preventDefault();
  
      let 文档id = naive.当前文档id
      let 头图元素组 = document.querySelectorAll(`.protyle-background[data-node-id="${文档id}"] div.protyle-background__img img`)
      console.log(文档id)
      let img = await fetch("https://img.xjh.me/random_img.php?return=302")
      console.log(img)
      let  imgurl = img.url
      头图元素组.forEach(
        el=>{
          el.setAttribute("style","")
          el.setAttribute("src",imgurl)
          }
      )
      this.核心api.setBlockAttrs(
        {
          id:naive.当前文档id,
          attrs:{
            "title-img":`background-image:url(${imgurl})`
          }
        }
      )

    }
    async 获取unsplash图片(event){
      event.preventDefault();
  
      let 文档id = naive.当前文档id
      let 头图元素组 = document.querySelectorAll(`.protyle-background[data-node-id="${文档id}"] div.protyle-background__img img`)
      console.log(文档id)
      let img = await fetch("https://source.unsplash.com/random")
      console.log(img)
      let  imgurl = img.url
      头图元素组.forEach(
        el=>{
          el.setAttribute("style","")
          el.setAttribute("src",imgurl)
          }
      )
      this.核心api.setBlockAttrs(
        {
          id:naive.当前文档id,
          attrs:{
            "title-img":`background-image:url(${imgurl})`
          }
        }
      )
    
    }
}
