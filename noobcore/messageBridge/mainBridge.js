import 事件桥 from "./index.js"
export default class 主窗口事件桥 extends 事件桥{
    constructor(){
        super("siyuanMain","siyuanMain")
        this.serviceID="siyuanMain"
        this.插入消息元素()
        this.绑定事件()
    }
    插入消息元素(){
        let 容器 = document.querySelector("#status")
        let 字数统计元素 = 容器.querySelector(".status__counter")
        let noob状态元素 = document.createElement("div")
        noob状态元素.setAttribute("class","status__msg__noob")
        容器.insertBefore(noob状态元素,字数统计元素)
        this.状态显示器  = noob状态元素
    }
    绑定事件(){
        this.on("status__msg",(data)=>{
            this.状态显示器.innerHTML = data.msg
        })
        this.on("editorFullWidth",(data)=>{
            console.log(data)
        }
        )
        this.handler("time",(data)=>{
            return  new Date().getTime()
        })
    }
}