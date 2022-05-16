module.exports={
    生成文档树:async function(思源伺服地址,apitoken,workspace){
        let 笔记本列表 =  await 向思源请求笔记本列表(思源伺服地址,apitoken)
        笔记本列表=  笔记本列表.notebooks
        console.log(笔记本列表)
        let div = document.createElement('div')
        for(let i=0,len=笔记本列表.length;i<len;i++){
            let 笔记本=笔记本列表[i]
            let 笔记本名称 =  笔记本.name
            let icon =  笔记本.icon
            let 笔记本id =  笔记本.id 
            let 笔记本sort =  笔记本.sort
            if (icon) {
                let {
                  图标,
                } = require(`${workspace}/conf/appearance/themes/naive/config/icon.js`);
                图标内容 = await 图标(icon);
                console.log(await 图标(icon));
                if (图标内容.indexOf("<svg") !== 0) {
                  图标内容 = `<img src="/emojis/${icon}"></img>`;
                }
                console.log(图标内容);
              }
            let ul =document.createElement('ul')
            ul.setAttribute('class',"b3-list b3-list--background")
            ul.setAttribute('data-url',笔记本id)
            ul.innerHTML=`
            <ul class="b3-list b3-list--background"  data-url="${笔记本id}" data-sort="${笔记本sort}">
                <li class="b3-list-item b3-list-item--hide-action" draggable="true" data-type="navigation-root" data-path="/">
                    <span class="b3-list-item__toggle">
                        <svg class="b3-list-item__arrow"><use xlink:href="#iconRight"></use></svg>
                    </span>
                    <span data-type="new" class="b3-list-item__action b3-tooltips b3-tooltips__w" >
                    ${图标内容}
                    </span>
                    <span class="b3-list-item__text">${笔记本名称}</span>    
                </li>
            </ul>
            `
            
            div.appendChild(ul)
        };
        return div.innerHTML
    }
}