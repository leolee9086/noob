const MagicString =require('magic-string');
export function  重写导入(code,重写器){
    console.force_log(naive.parseImport(code))
    let [imports,exports]=naive.parseImport(code)
    let codeMagicString =  new MagicString(code)
    imports.forEach(
        导入声明=>{
            if(导入声明.name){
            codeMagicString.overwrite(导入声明.s,导入声明.e,重写导入(导入声明,重写器))
            }
        }
    )
    return codeMagicString.toString()
}
export function 重写导入包名(导入声明,重写器){
    let name =导入声明.n
    if(name&&!name.startsWith('/')&&!name.startsWith('./')&&!name.startsWith('../')){
        name = '/deps/'+name
    }else{
        console.log(导入声明)
    }
    return name
}
