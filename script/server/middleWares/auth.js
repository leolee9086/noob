function checkAuthRequireMent(req){
    let 注册表 = naive.Authregistry
    let 匹配项目
    注册表.forEach(
        注册记录=>{
            if(注册记录.匹配函数(req)){
                匹配项目 = 注册记录
            }
        }
    )
    return 匹配项目.安全策略函数(注册记录)
}
function authCheck(){

}