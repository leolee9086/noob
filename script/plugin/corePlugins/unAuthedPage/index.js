export class unAuthedPage extends naive.plugin{
    constructor() {
        super({ name: "defaultAuth",sort:2 });
        this.fs = require('fs')
      };
    pipe=[
        this.判定并生成空页面
    ]
    async 判定并生成空页面(req,res,渲染结果){
        if(渲染结果&&!req.session.status){
            console.error(req.session.status)
            let access =await this.判定id权限(渲染结果.head.querySelector('meta').dataset.nodeId,'',true)
            console.error(access)
              if(access=="protected"){
                let unAuthedPageTemplate = this.fs.readFileSync(naive.pathConstructor.templatePath()+'/unAuthedPage.html','utf8')
                res.end(unAuthedPageTemplate)
           
                console.log(res)
            }
            else if(access=="private"){
                let unAuthedPageTemplate = this.fs.readFileSync(naive.pathConstructor.templatePath()+'/private.html','utf8')
                res.end(unAuthedPageTemplate)
                console.log(res)
            }
            else if(access=="public"){
                
            }
            else{
                console.log(naive.设置.默认发布设置)
                if(!naive.设置.默认发布设置||naive.设置.默认发布设置=='private'){
                    let unAuthedPageTemplate = this.fs.readFileSync(naive.pathConstructor.templatePath()+'/private.html','utf8')
                    res.end(unAuthedPageTemplate)
                    console.log(res)
                }
                else if((naive.设置.默认发布设置=='protected')){
                    let unAuthedPageTemplate = this.fs.readFileSync(naive.pathConstructor.templatePath()+'/unAuthedPage.html','utf8')
                    res.end(unAuthedPageTemplate)
                    console.log(res)
    
                } 
                else if(naive.设置.默认发布设置=='public'){

                }
                else{

                }
            }
            

        }
       
        return  渲染结果
    }
}
export const dependencies = ['defaultAuth']
export const environments = ["APP"];
