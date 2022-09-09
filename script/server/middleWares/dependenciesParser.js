
const Mime = require('mime/Mime');
const MagicString = require('magic-string');

function parseImport(code) {
    console.force_log(naive.parseImport(code))
    let [imports, exports] = naive.parseImport(code)
    let codeMagicString = new MagicString(code)
    imports.forEach(
        导入声明 => {
            codeMagicString.overwrite(导入声明.s, 导入声明.e, 重写导入(导入声明))
        }
    )
    return codeMagicString.toString()
}
function 重写导入(导入声明) {

    let name = 导入声明.n
    if (name.startsWith('/')) {

        name = '/deps' + name
    }

    name = name.replace(/https\:\/\/esm.sh/g, "/deps/")
    return name
}

module.exports = function addDevSurppoert(app) {
    app.use('/deps', async (req, res) => {
        console.log(req, res)
        console.log(req.url)
        console.log(req.headers)
        let filePath = (naive.workspaceDir + `/conf/naiveConf/deps/esm/${req.url}`).replace(/\?/g, '.')
        if (naive.fs.existsSync(filePath)) {
            let content = naive.fs.readFileSync(filePath, "utf-8")
            console.log(content)
            console.log(filePath)
            let mime = content.split("\n")[0]
            res.setHeader("content-type", mime.replace("/*", "").replace("*/", ""))
            res.end(content.replace(mime, ""))
        }
        else {
            let source = await fetch('https://esm.sh' + req.url, {
                "method": "GET",

                headers:{"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.27"}
            })
            console.log(source)
            let mime = source.headers.get('content-type')
            let content = await source.text()
            content = "/*" + mime + "*/" + "\n" + content
            res.setHeader("content-type", mime)
            content = parseImport(content)
            res.end(content)
            console.log(filePath)
            naive.pathConstructor.mkfilep(filePath, content)
        }
    })

}