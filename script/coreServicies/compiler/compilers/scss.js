const _path =require('path')
export default class scssCompiler {
    async parseFile(path,options,baseUrl){
        console.log(path,options,baseUrl)
        path = _path.join(options.base,path)
        const sass = require('sass');
        const result = sass.renderSync(
            {
               file:path,
               includePaths:["D:/newSiyuan/conf/naiveConf/deps/",_path.join(window.workspaceDir,'/conf/appearance/themes/naive/script/')]
            }               
        );
        const func =`
        const str = \`${result.css.toString().replace(/\`/g,'')}\`
        let style =document.createElement("style")
        style.setAttribute('lang','sass')
        style.innerHTML= str
        document.head.append(
            style        )
        export default {}
        `
        return  func
    }
}