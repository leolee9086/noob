export default class Model {
    constructor(plugin) {
        if (plugin.msgCallback) {
            this.connect(options);
        }
    }
    connect(options) {
        const websocketURL = `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/ws`;
        const ws = new WebSocket(`${websocketURL}?app=${Constants.SIYUAN_APPID}&id=${options.id}${options.type ? "&type=" + options.type : ""}`);
        ws.onopen = () => {
            if (options.callback) {
                options.callback.call(this);
            }
            const logElement = document.getElementById("errorLog");
            if (logElement) {
                // 内核中断后无法 catch fetch 请求错误，重连会导致无法执行 transactionsTimeout
                exportLayout(true);
            }
        };
        ws.onmessage = (event) => {
            if (options.msgCallback) {
                const data = processMessage(JSON.parse(event.data));
                options.msgCallback.call(this, data);
            }
        };
        ws.onclose = (ev) => {
            if (0 <= ev.reason.indexOf("unauthenticated")) {
                return;
            }
            if (0 > ev.reason.indexOf("close websocket")) {
                console.warn("WebSocket is closed. Reconnect will be attempted in 3 second.", ev);
                setTimeout(() => {
                    this.connect({
                        id: options.id,
                        type: options.type,
                        msgCallback: options.msgCallback
                    });
                }, 3000);
            }
        };
        ws.onerror = (err) => {
            const logElement = document.getElementById("errorLog");
            if (err.target.url.endsWith("&type=main") && err.target.readyState === 3 && !logElement) {
                kernelError();
            }
        };
        this.ws = ws;
    }
    send(cmd, param, process = false) {
        if (!this.ws) { // Inbox 无 ws
            return;
        }
        this.reqId = process ? 0 : new Date().getTime();
        this.ws.send(JSON.stringify({
            cmd,
            reqId: this.reqId,
            param,
            // pushMode  0: 广播，1：单播(默认)，2：广播（不包含自己）
            // reloadPushMode 是否需要 reload  0: 广播，1：单播(默认)，2：广播（不包含自己），3：不推送
        }));
    }
}
