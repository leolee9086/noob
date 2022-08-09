export class unAuthedPage extends naive.plugin{
    constructor() {
        super({ name: "defaultAuth",sort:2 });
        this.fs = require('fs')
      };
    pipe=[
        this.判定并生成空页面
    ]
    async 判定并生成空页面(req,res,渲染结果){
        if(渲染结果){
            let access = 渲染结果.head.querySelector('meta').dataset.access
            console.log(access)
            if(access=='false'){
                let unAuthedPageTemplate = this.fs.readFileSync(naive.pathConstructor.templatePath()+'/unAuthedPage.html','utf8')
               // res.end(unAuthedPageTemplate)
                console.log(res)
            }
        }
        return  渲染结果
    }
}
export const dependencies = ['defaultAuth']