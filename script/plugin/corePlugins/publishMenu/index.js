export class publishMenu extends  naive.plugin{
    constructor(){
        super({name:"publishMenu"})
        this.注册发布用菜单()
    }
    注册发布用菜单(){
        this.注册图标({
            id: "iconHome",
            viewBox: "0 0 1000 1000",
            content: `<path d="M851.2 441.6l-320-268.8C524.8 172.8 518.4 172.8 512 172.8s-12.8 0-19.2 6.4l-320 268.8C166.4 448 160 460.8 160 467.2L160 832c0 19.2 12.8 32 32 32l640 0c19.2 0 32-12.8 32-32L864 467.2C864 460.8 857.6 448 851.2 441.6zM806.4 806.4 601.6 806.4l0-147.2c0-51.2-38.4-89.6-89.6-89.6s-89.6 38.4-89.6 89.6l0 147.2L217.6 806.4 217.6 480 512 236.8l294.4 243.2L806.4 806.4z" p-id="2381"></path>`
        })
        

        let 发布菜单选项 = {
            块类型: "NodeDocument",
            菜单文字: "发布设置",
            菜单图标: "#iconPublish",
            children:[
                {
                    块类型: "NodeDocument",
                    菜单文字: "设置当前页为首页",
                    菜单图标: "#iconHome",
                    回调函数: ()=>this.设置当前页面为首页(),
                },
                {
                    块类型: "NodeDocument",
                    菜单文字: "设置当前路径为公开发布",
                    菜单图标: "#iconHome",
                    回调函数: ()=>this.设置当前页面为公开发布(),
        
                },
                {
                    块类型: "NodeDocument",
                    菜单文字: "保护当前路径",
                    菜单图标: "#iconHome",
                    回调函数: ()=>this.取消发布当前页面(),
        
                },
                {
                    块类型: "NodeDocument",
                    菜单文字: "设置当前页面发布选项为默认",
                    菜单图标: "#iconHome",
                    回调函数: ()=>this.设置当前页面发布选项为默认(),
                }            
            ]
        }
     
        this.注册块标菜单(发布菜单选项)


    }  
    async 设置当前页面发布选项为默认(){
        let 文档id = this.当前文档id
        this.核心api.setBlockAttrs(
            {
                id:文档id,
                attrs:{
                    'custom-publish-access':""
                }
            }
        )
    }

    async 取消发布当前页面(){
        let 文档id = this.当前文档id
        this.核心api.setBlockAttrs(
            {
                id:文档id,
                attrs:{
                    'custom-publish-access':"protected"
                }
            }
        )
    }
    async 设置当前页面为公开发布(){
        let 文档id = this.当前文档id
        this.核心api.setBlockAttrs(
            {
                id:文档id,
                attrs:{
                    'custom-publish-access':"public"
                }
            }
        )
    }
    async 设置当前页面为首页(){
        let 文档id = this.当前文档id
        let data= await this.核心api.sql(
            {stmt:`select * from attributes where name='custom-publish-slot' and value='homePage'`},
            '',
        )
        data.forEach(
            block=>{
                if(block){
                    this.核心api.setBlockAttrs(
                        {
                            id:block.block_id,
                            attrs:{
                                "custom-publish-slot":'',
                                'custom-publish-access':"public"
                            }
                        },
                        '',
                    )
                }
            }
        )
        
         await   this.核心api.setBlockAttrs({id:文档id,attrs:{
                'custom-publish-access':"public",
                "custom-publish-slot":'homePage'
            }},'')
        
    }
}

export const dependencies = ["commonMenu","naiveIcon"]