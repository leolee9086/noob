export class test extends naive.plugin{
    constructor(){
        super({name:'test'})
        document.querySelectorAll(".protyle-wysiwyg.protyle-wysiwyg--attr[data-doc-type='NodeDocument']").forEach(
            docElement=>{
                docElement.addEventListener('keydown',(e)=>{
                    console.log(e)
                })
            }
        )
    }
}