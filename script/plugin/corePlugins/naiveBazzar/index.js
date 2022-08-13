export class naiveBazzar extends naive.plugin{
    constructor(){
        super({name:'bazzar'})
        this.获取插件列表()
    }
    async 获取插件列表(){
        let bazzarOss = "https://ccds-1300128285.cos.ap-guangzhou.myqcloud.com"
        let pluginListPath="/bazzar/plugins.json"
        let pluginsPath="/bazzar/plugins"
        
        this.插件列表 =JSON.parse(await (await fetch(bazzarOss+pluginListPath)).text())
        !naive.bazzar?naive.bazzar={}:null
        !naive.bazzar.plugins?naive.bazzar.plugins={}:null
        console.log("bazzar",this.插件列表)
        this.插件列表.repos.forEach(
            插件名=>{
                console.log(插件名)
                let 用户名= 插件名.split('/')[0]
                let 正式插件名 = (插件名.split('/')[1]).split('@')[0]
                let 提交hash = (插件名.split('/')[1]).split('@')[1]
                let 插件说明文件路径 =  `${bazzarOss+pluginsPath}/${用户名}/${正式插件名}/README.md'`
                let 插件预览图路径 = `${bazzarOss+pluginsPath}/${用户名}/${正式插件名}/preview.png`
                let 插件包路径 = `${bazzarOss+pluginsPath}/${用户名}/${正式插件名}/${正式插件名}-${提交hash}.zip`
                console.log(插件说明文件路径,插件预览图路径,用户名,正式插件名,插件包路径) 
                naive.bazzar.plugins[正式插件名]={
                    预览路径:插件预览图路径,
                    说明路径:插件说明文件路径,
                    作者:用户名,
                    插件包路径:插件包路径
                }
                console.log(naive.bazzar.plugins)
            }
        )
        let 插件包 =await( await fetch(naive.bazzar.plugins.comment.插件包路径)).blob()
        let 插件包数据url = URL.createObjectURL(插件包)
        console.log(插件包)
    }
}
export const environment = ['APP']