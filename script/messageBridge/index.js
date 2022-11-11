const express = require("express")
const { WebSocketServer } = require("ws")
if (!window.noobBridge) {
    const app = express()
    const server = app.listen(
        "6807"
    )
    server.on(
        "upgrade", (req, socket, head) => {
            console.log(req, req.url)
            let _url = new URL(`http://127.0.0.1${req.url}`)
            const obj = app.wsRoute[_url.pathname]
            obj ? obj.wss.handleUpgrade(req, socket, head, ws => obj.mid(ws, req)) : socket.destroy()
        })
    app.ws = (route, mid) => {
        app.wsRoute = app.wsRoute || {}
        app.wsRoute[route] = {
            wss: new WebSocketServer({ noServer: true }),
            mid,
        }
    }
    window.noobBridge = {
        server: app,
        registry: {},
        handlers: {}
    }
    app.ws("/bridge", (ws, req) => {
        let _url = new URL(`http://127.0.0.1${req.url}`)
        let id = _url.searchParams.get("id")
        if (id) {
            !window.noobBridge.registry[id] ? window.noobBridge.registry[id] = {} : null
            !window.noobBridge.handlers[id] ? window.noobBridge.handlers[id] = [] : null
            window.noobBridge.registry[id] = ws
            window.noobBridge.handlers[id].forEach(item => {
                ws.on(item.type, item.cb)
            });
        }
    })
}
export default class MessageBridge {
    constructor(noobService) {
        const websocketURL = `${window.location.protocol === "https:" ? "wss" : "ws"}://127.0.0.1:6807/bridge?id=${noobService.id}`;
        this.client = new WebSocket(`${websocketURL}`)
        this.id = noobService.id
    }
    send(data) {
        window.noobBridge.registry[this.id].send(JSON.stringify(data))
    }
    on(type, cb) {
        !window.noobBridge.handlers[this.id] ? window.noobBridge.handlers[this.id] = [] : null
        window.noobBridge.handlers[this.id].push({ type: type, cb: cb })
    }
    handler(type, cb) {
        this.on("message", async (msg) => {
            let string = msg.toString()
            let json
            try {
                json = JSON.parse(string)
                if (json && json.actionId && json.type == type) {
                    try {
                        console.log(json)
                        let result = await cb(json.data)
                        console.log(result)
                        let resData = {
                            type: type,
                            data: result,
                            actionId: json.actionId
                        }
                        this.send(JSON.stringify(resData))
                    } catch (e) {
                        let resData = {
                            type: type,
                            error: e,
                            actionId: json.actionId
                        }

                        this.send(resData)

                    }
                }
            } catch (e) {
                console.error(e)
            }
        })
    }
}