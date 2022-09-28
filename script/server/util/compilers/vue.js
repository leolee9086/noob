const compilerSFC = require("@vue/compiler-sfc")
const compilerDOM = require("@vue/compiler-dom")
module.exports =  (filePath, req, res) => {
    let content = require('fs-extra').readFileSync(filePath, 'utf-8')
    let Ast = compilerSFC.parse(content)
    let script = compilerSFC.compileScript(Ast.descriptor,{
        templateOptions:{
            compiler:compilerSFC.compileTemplate
        }
    })
    let reqPath = req.originalUrl.split('?')[0]
    if (!req.query.type) {
        let scriptContent
        if (Ast.descriptor.script||Ast.descriptor.scriptSetup) {
            let obj = naive.serverUtil.importRewriter(script.content,{},true)
            scriptContent = obj.code
            scriptContent = scriptContent.replace('export default', 'const _script=')
        }
        let template = Ast.descriptor.template.content
        let components = compilerDOM.compile(template, { mode: 'module' }).ast.components
        let componentTags= components.map(item=>{return  item.split('-').map(ite=>{return ite.substring(0,1).toUpperCase()+ite.substring(1)}).join('')})
        console.log(componentTags)
        res.setHeader('content-type', 'text/javascript')
        res.end(`
import {render as _render} from '${reqPath}?type=template'
import '${reqPath}?type=style'
${scriptContent} 
_script.render = _render
let componentTags =${JSON.stringify(componentTags)}
let __returned__ =_script.setup({},{expose:()=>{}})
for(let item of componentTags){
    if(__returned__.hasOwnProperty(item)){
            !_script.components?_script.components={}:null
            _script.components[item]=__returned__[item]
    }
}
export default _script
            `
        )

    }
    if (req.query.type === 'template') {
        let template = Ast.descriptor.template.content
        let renderContent = compilerDOM.compile(template, { mode: 'module' }).code
        renderContent = naive.serverUtil.importRewriter(renderContent)
        res.setHeader('content-type', 'text/javascript')
        res.end(renderContent)
    } else if (req.query.type === 'style') {
        let style = Ast.descriptor.styles[0].content
        res.setHeader('content-type', 'text/javascript')
        let styleScript = `
        let style = document.createElement('style')
        style.innerHTML = \`${style}\`
        document.head.appendChild(style)
    `
        res.end(styleScript)
    }
    else if (req.query.type === 'ast') {
        res.json(Ast)
    }
    else if (req.query.type === 'app') {
        res.setHeader('content-type', 'text/html')
        res.end(
            `
        <html>
        <head>      
        </head>
        <body>
            <div id='app'></div>
        </body>
        <script type="module">
            import {createApp} from '/deps/vue' 
            import  root from '${reqPath}'
            import '${reqPath}?type=style'

            const app = createApp(root)
            app.mount('#app')
        </script>
        </html>

        `
        )
    }
}