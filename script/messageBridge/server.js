
export default function 创建服务器() {
    return new Promise((resolve, reject) => {
        try {
            const express = require("express")
            const { WebSocketServer } = require("ws")
            const app = express()
            const server = app.listen(
                "6807", () => {
                    resolve(server)
                }
            )
            server.on(
                "upgrade", (req, socket, head) => {
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
                registry: [],
                servicies:{}
            }
            app.ws("/bridge", (ws, req) => {
                let _url = new URL(`http://127.0.0.1${req.url}`)
                let id = _url.searchParams.get("id")
                let serviceID = _url.searchParams.get("serviceID")
                if (id) {
                    !window.noobBridge.registry ? window.noobBridge.registry = [] : null
                    window.noobBridge.registry.push({ id: id, client: ws })
                }
                if(serviceID){
                    window.noobBridge.servicies[serviceID]=ws
                }
                ws.on("message", (msg) => {
                    let string = msg.toString()
                    let json
                    try{json = JSON.parse(string)}catch(e){
                        return
                    }

                    if(json.serviceID&&window.noobBridge.servicies[json.serviceID]){

                        window.noobBridge.servicies[json.serviceID].send(JSON.stringify(json))
                    }
                    else if(json.callerID){

                        window.noobBridge.registry.forEach(
                            element => {
                                element && element.client &&element.id==json.callerID? element.client.send(JSON.stringify(json)) : null
                            }
                        );
                    }
                    else if (json.type) {
                        window.noobBridge.registry.forEach(
                            element => {
                                element && element.client ? element.client.send(JSON.stringify(json)) : null
                            }
                        );
                    }
                    
                })
            })
          
        }
        catch (e) {
            reject(e)
        }
    }
    )
}