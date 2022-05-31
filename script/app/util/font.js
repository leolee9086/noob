export function 添加行内样式(event,样式字符串){
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