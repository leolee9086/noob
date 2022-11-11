export default class Button {
    constructor(id,icon,service){
        let div=document.querySelector("#status .fn__flex-1")
        this.icon =icon
        if(div.querySelector('.service-container')){
            div = div.querySelector('.service-container')
        }else{
            let container = document.createElement("div")
            let style = `
                
            `
            container.setAttribute('class','service-container fn_flex ')
            container.setAttribute("style",style)
            div.append(container)
            div=container
        }
        this.container=div
        this.element = document.createElement("button")
       
        this.element.setAttribute("class",'b3-tooltips b3-tooltips__w')
        this.element.setAttribute("aria-label",`${icon.split('\\')[icon.split('\\').length-2]}
单击隐藏/显示服务窗口`)

        this.element.innerHTML = `<img src="${icon}" ></img>`
        this.container.append(this.element)
        this.container.style=`
        margin:auto;
        left:calc(50vw - ${this.container.querySelectorAll("button").length*10}px)
        `
        this.bindEvent()
        this.service=service

    }
    bindEvent(){
        this.element.addEventListener('click',()=>{
            if(this.service&&!this.service.destoyed){
                this.service.改变可见性()
            }
            this.element.addEventListener('dblclick',()=>{
                this.service.重新初始化()

                this.setColor('success')
            })
        })
        this.element.addEventListener('contextmenu',()=>{
            let url  = this.service.url 
            window.open(url)
        })

    }
    remove(){
        this.setColor('warning')
    }        
    destroy(){
        this.element.remove()
    }
    setColor(color){
        this.element.style.backgroundColor=`var(--b3-card-${color}-background)`
        this.element.style.borderColor=`var(--b3-card-${color}-color)`
        if(color=='error'){
            this.element.setAttribute("aria-label",`${this.icon.split('\\')[this.icon.split('\\').length-2]}
服务已经关闭,双击重新启用`)
        }
        else{
            this.element.setAttribute("aria-label",`${this.icon.split('\\')[this.icon.split('\\').length-2]}
单击隐藏/显示服务窗口`)
        }
        setTimeout(
            ()=>{
                this.element.style.borderColor=""

                this.element.style.backgroundColor=""
            },1000
        )
    }
}