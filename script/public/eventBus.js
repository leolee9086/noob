export class 事件总线{
    constructor(ws){
        this.回调字典 = {}
        if(ws){
            this.bindWebsocket(ws)
        }
        this.ws=ws
    }
    bindWebsocket(ws){
        socket.addEventListener('message', function (event) {
            
            if(event.data){
                let data =event.data 
                if(data.eventType&&data.naiveID&&data.naiveID!==naive.naiveID){
                    this.emit(data.eventType,data)
                } 
            }
        });
  }
    on(事件类型,回调函数){
        if(!this.回调字典[事件类型]){
            this.回调字典[事件类型]=[]
        }
        this.回调字典[事件类型].push(回调函数)
    }
    emit(事件类型,事件数据){
        let 回调函数序列 = this.回调字典[事件类型]
        if(回调函数序列&&回调函数序列[0]){
            回调函数序列.slice().map(
               回调函数=> 回调函数(事件数据)
            )
        }
        if(this.ws){
            let data = {
                eventType:事件类型,
                data:事件数据
            }
            this.ws.send(JSON.stringify(data))
        }
    }
    offAll(事件类型){
        let 回调函数序列 = this.回调字典[事件类型]
        if(回调函数序列&&回调函数序列[0]){
            回调函数序列=[]
        }
    }
    off(事件类型,函数){
        let 回调函数序列  = this.回调字典[事件类型]
        if(回调函数序列){
            回调函数序列.forEach(
                回调函数=>{
                    if(回调函数==函数){
                        回调函数序列 = 回调函数序列.splice(回调函数序列.indexOf(函数))
                    }
                }
            )
        }
    }
    once(事件类型,函数){
        let that = this
        that.中间函数 = function(数据){
            函数(数据)
            that.off(事件类型,that.中间函数)
        }
        this.on(事件类型,that.中间函数)
    }
}