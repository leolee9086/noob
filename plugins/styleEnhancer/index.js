import {主题插件} from "../../script/app/plugin.js"
export  class  styleEnhancer extends  主题插件  {
    constructor(option){
        super(option)
        console.log(this.app)
        this.加载行内样式()
        this.行内样式={}
        this.app.事件总线.on("工具栏面板显示",(面板)=>this.添加行内样式元素(面板))
    }
    async 加载行内样式(){
        let res1 = await fetch("/appearance/themes/naive/config/fontStyles.json");
        this.行内样式 = await res1.json();

    }
    async 添加行内样式元素(面板){
        await this.加载行内样式()
        let target = 面板;
        console.log(面板)
        let FontStyle = target.querySelectorAll(
          'button.protyle-font__style[data-type="style4"]'
        );
        if (FontStyle[0]) {
          let firstFontStyle = FontStyle[FontStyle.length - 1];
          let span = firstFontStyle.parentElement.querySelector(
            ".fn__space.fn__flex-1"
          );
          for (let 样式名 in this.行内样式) {
            if (
              !firstFontStyle.parentElement.querySelector(
                `[data-name='${样式名}']`
              )
            ) {
              let newStyle = firstFontStyle.cloneNode();
              newStyle.innerHTML = 样式名;
              newStyle.setAttribute("data-name", 样式名);
              newStyle.setAttribute("custom-data-type", "customInlineStyle");
              newStyle.setAttribute("style", this.行内样式[样式名]);
              firstFontStyle.parentElement.insertBefore(newStyle, span);
              newStyle.addEventListener("click", (event) =>
                this.添加行内样式(event, this.行内样式[样式名])
              );
            }
          }
        }

    }
    添加行内样式(event,样式字符串){
        event.preventDefault();
        let remover = document.querySelector('button[data-type="remove"]')
        remover?remover.click():null
        let 当前文字区域 = document.getSelection()
        let range = new Range(window)
        if (当前文字区域&&当前文字区域.rangeCount){
                let firstRange = 当前文字区域.getRangeAt(0)
                let lastRange = 当前文字区域.getRangeAt(当前文字区域.rangeCount-1);
                console.log(firstRange,lastRange)
                range.setStart(firstRange.startContainer,firstRange.startOffset)
                range.setEnd(lastRange.endContainer,lastRange.endOffset)
             //   console.log (当前文字区域.anchorNode)
            //    console.log (当前文字区域.focusNode)

                if (当前文字区域.anchorNode==当前文字区域.focusNode){
                    let node = 当前文字区域.anchorNode
                    if (node.tagName){console.log(node.tagName)}
                    let strong =  document.createElement("strong")
                    console.log(node)
                    try{          
                        range.surroundContents(strong)

                        strong.setAttribute("style",样式字符串)
                        strong.innerHTML =strong.innerText
                    }catch(e){}
                    当前文字区域.removeAllRanges()
                    当前文字区域.addRange(range)
                }
                else {
                    let strong = document.createElement("strong")
                    try{
                        let 文本=range.toString()

                        let html片段 = range.extractContents()
                       console.log(html片段)
                        
                        strong.setAttribute("style",样式字符串)
                        range.insertNode(html片段)
                        range.surroundContents(strong)
                        strong.innerHTML =strong.innerText
                        console.log(strong)

                    }catch(e){}
                    当前文字区域.removeAllRanges()
                    当前文字区域.addRange(range)
                }
            }
        
    }
}
new styleEnhancer({name:"styleEnhancer"})