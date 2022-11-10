export default class Button {
    constructor(id,icon,service){
        let div=document.querySelector("#status .fn__flex-1")
        this.icon =icon
        if(div.querySelector('.container')){
            div = div.querySelector('.container')
        }else{
            let container = document.createElement("div")
            let style = `
                
            `
            container.setAttribute('class','container')
            container.setAttribute("style",style)
            div.append(container)
            div=container
        }
        this.container=div
        this.element = document.createElement("button")
        this.element.style=`
        border-radius:100%;
        height:40px;
        width:40px;
        `
        this.element.setAttribute("class",'b3-tooltips b3-tooltips__w')
        this.element.setAttribute("aria-label",`${icon.split('\\')[icon.split('\\').length-2]}
单击隐藏/显示服务窗口`)

        this.element.innerHTML = `<img src="${icon}" 
                        style="
                        width:35px;
                        height:35px;
                        margin:0;
                        padding:0;
                        left:2.5px;
                        top:2.5px;
                        Object-fit:contain
                        "
                        ></img>`
        this.container.append(this.element)
        this.container.style=`
        position:absolute;
        top:calc(100vh - 50px);
        left:calc(50vw - ${this.container.querySelectorAll("button").length*10}px)
        `
        this.bindEvent()
        this.service=service
        this.element.style.backgroundColor='var(--b3-card-success-background)'
        this.element.style.borderColor='var(--b3-card-success-color)'

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
    }
}