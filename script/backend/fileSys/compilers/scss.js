export default class scssCompiler {
    async parseFile(path){
        const sass = requireInstall('sass');

        const result = sass.renderSync(
            
            {
                file:path,
               includePaths:["D:/newSiyuan/conf/naiveConf/deps/"]

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