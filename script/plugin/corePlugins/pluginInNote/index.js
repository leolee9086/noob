export class pluginInNote extends naive.plugin{
    constructor(){
        super({name:"pluginInNote"})
        !naive.pluginInNote?naive.pluginInNote={}:null
        this.pluginInNoteError={}
        let style = document.head.querySelector('#pluginNoteStyle')
        let errorstyle = document.head.querySelector('#pluginNoteErrorStyle')

        if(!style){
            style = document.createElement('style')
            style.setAttribute('id',"pluginNoteStyle")
            errorstyle = document.createElement('style')
            errorstyle.setAttribute('id',"pluginNoteErrorStyle")
            document.head.appendChild(style)
            document.head.appendChild(errorstyle)

            style.innerHTML=`
            .protyle-wysiwyg.protyle-wysiwyg--attr[data-doc-type="NodeDocument"][custom-publish-as="plugin"]::before{
                content:"publish-as:plugin";
                display:block;
                color:var(--b3-card-info-color)
            }
            `    
        }
        this.style=style
        this.errorstyle=errorstyle
        this.根据属性获取插件块({'custom-publish-as':"plugin"},"d")

    }
    async 根据属性获取插件块(属性对象,块类型){
        let stmt =`select * from blocks where id in `
        for (let 属性名 in 属性对象){
            let 属性值 = 属性对象[属性名]
            let 字符串 = `( select block_id from attributes where name = "${属性名}" and value = "${属性值}")`
            if(!stmt==`select * from blocks where id in `){
                stmt+="and id in"+字符串
            }
            else{
                stmt +=字符串
            } 
        }
        stmt += ` and type = "${块类型}"`
        console.error(stmt)
        let res = await this.核心api.sql({stmt:stmt},'')
        console.log(res)
        if(res&&res[0]){

            res.forEach(
                
                    block=>{            
                         this.获取笔记内插件内容(block.id)
                    }
                
            )
        }
    }
    async 获取笔记内插件内容(块id){
        let doc = await this.核心api.getDoc({id:块id,mode:0,size:102400,k:''},"")
        console.log(doc)
        let div = document.createElement('div')
        div.innerHTML = doc.content
        console.log(div)
        let codeBlocks = div.querySelectorAll('div[data-node-id]:not(div[data-node-id] div[data-node-id])')
        console.log(codeBlocks)
        let code=''
        codeBlocks.forEach(
            el=> {
                if(el.querySelector('.protyle-action__language')&&["js","javascript"].indexOf(el.querySelector('.protyle-action__language').innerHTML)>=0){
                    code+=el.querySelector('.hljs').innerText
                }
                else{
                    let textels = el.querySelectorAll(`div[contenteditable="true"]`)
                    textels.forEach(
                        child=>{
                            let text = child.innerText
                            let textArray=text.split(/\r\n|\n|\r/);
                            textArray.forEach(
                                line=>code+="//"+line+"\n"
                            )
                        } 
                    )
                }
            }
        )
        console.log(code)
        let cachePath=this.initFolder()
        let fs = require("fs");
        let filePath = cachePath+`/plugins/plugin-${块id}.js`

        naive.pathConstructor.mkfilep(filePath,code)
        try{
            let module =await import (filePath).then((module,error)=>{
                if(error){
                    console.log(error)
                }
                else{
                    return module
                }
            })
            let pluginClass =new (module['plugin'])
            console.log(module,pluginClass)
            naive.pluginInNote[pluginClass.name]=pluginClass
        }catch(e){
            console.error(e)
            this.pluginInNoteError[块id]=e
            this.errorstyle.innerHTML+=`
            .protyle-background[data-node-id="${块id}"] ~ [data-doc-type="NodeDocument"]::before{
                content:"加载错误: ${e}" !important;
                color:var(--b3-card-error-color) !important;
                border:dashed 2px var(--b3-card-error-color)
            }
            `
        }
        
    }
}
export const dependencies = ['commonMenu']