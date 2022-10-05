const describeApi = require ('./api')
const fs = require('fs-extra')
module.exports  ={
    describeFolder(path,describe){
        const {自动初始化,模板,原始资源,伺服,功能} =  describe
        if(自动初始化){
            fs.ensureDirSync(path)
        }
        if(模板){
            let 模板路径 = 模板.路径 
            fs.renameSync(模板路径,path)   
        }
        if(功能){
            naive.loacalPath[功能]=路径
        }
    }
}