const MagicString =require('magic-string');
const importParser =  require('es-module-lexer')
module.exports=  function  重写导入(code,重写器,flag){
    console.force_log(importParser.parse(code))
    let [imports,exports]=importParser.parse(code)
    let codeMagicString =  new MagicString(code)
    imports.forEach(
        导入声明=>{
            if(导入声明.n){
            codeMagicString.overwrite(导入声明.s,导入声明.e,重写导入包名(导入声明,重写器))
            }
        }
    )
    if(flag){
        return {code:codeMagicString.toString(),imports:imports.map(item=>{return code.substring(item.ss,item.se)})}
    }
    else{
    return codeMagicString.toString()}
}
function 重写导入包名(导入声明,重写器){
    let name =导入声明.n
    if(name&&!name.startsWith('/')&&!name.startsWith('./')&&!name.startsWith('../')){
        name = '/deps/'+name
    }else{
        console.log(导入声明)
    }
    return name
}
