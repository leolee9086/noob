export default class messageBridge {
    constructor(){
        const websocketURL = `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host||options.host}/ws`;
    }
    send(channel,data,param){
        this.ws.send(
            JSON.stringify({
                channel:channel,
                data:data,
                param:{
                    pushMode:param?param.pushMode:1
                    //0:广播 所有信道推送这条消息
                    //1:单播 仅所在信道推送
                    //2:排除 除了自身所在信道以外,其他信道推送这条消息
                }
            })
        )
    }
}