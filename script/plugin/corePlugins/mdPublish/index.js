
export class mdPublish extends naive.plugin {
    constructor() {
        super({ "name": "mdPublish" })
        this.folder = this.initFolder()
        this.lute = window.Lute.New()
        this.开始伺服()
        let rootpath = "D:/椽承知识库"
        let list = naive.fg.sync(`**.md`, { dot: true, stats: true, cwd: rootpath })
       let html = ""

        for (let i = 0; i < list.length; i++) {
            html+=
                `<naive-doc data-path='${window.Lute.EscapeHTMLStr(list[i]["path"])}}'>`+
                naive.mdIt.render(
                    naive.fs.readFileSync(
                        rootpath + '/' + list[i]["path"], 'utf-8'
                    ),{}
                )
                +"</naive-doc>"
        }

        let Vdocument= new DOMParser().parseFromString(html, "text/html")
        Vdocument.querySelectorAll('naive-doc').forEach(
            doc=> doc.querySelectorAll("*").forEach(
             el=>el.dataset.content=window.Lute.EscapeHTMLStr(el.innerHTML)
            )
        )
        console.log(`${list.length}个文件已经转化成html文件`)
        list = null
        window.Vdocument=Vdocument
    }

    开始伺服() {
        naive.expressApp.get("/md/*", (req, res) => {
            let rawpath = req._parsedUrl.pathname
            let path = require("path")

            let content = ''
            let filePath = path.join(this.initFolder(), rawpath.replace('/md', ''))
            if (naive.fs.existsSync(filePath)) {
                content = naive.fs.readFileSync(filePath, 'utf-8')
            }
            console.error(filePath)
            let htmlstr = this.lute.Md2HTML(content)
            console.error(htmlstr)
            let htmlContent = `
            <html>
            <head>
            
            <meta name="color-scheme" content="light dark" charset="UTF-8">
            <input type="hidden" id="_w_simile" data-inspect-config="3">
            <script type="text/javascript" src="chrome-extension://odphnbhiddhdpoccbialllejaajemdio/scripts/inspector.js"></script>
            </head>
                <body>
                ${htmlstr}
                </body>
            </html>
            `
            if (req.query.raw) {
                res.json(
                    {
                        msg: 0,
                        content: content
                    }
                )
                return
            }
            else {
                if (content) {
                    res.end(htmlContent)
                }
                else {
                    res.status('404')
                    res.end('file not found')
                }

            }
        })
        naive.expressApp.use("/mdEditor", (req, res) => {
            res.sendFile('editor.html', { root: this.initFolder() })
        })
        naive.expressApp.post("/naiveApi/md/update", (req, res) => {
            console.log(req)
            let path = require("path")
            let filePath = path.join(this.initFolder(), req.body.path)
            naive.pathConstructor.mkfilep(filePath, req.body.content)
            res.json(
                {
                    msg: 0,
                    content: naive.fs.readFileSync(filePath, 'utf-8')
                }
            )
        })
    }
}