console.log("that`s excited")
const 滚动到元素 =function(event){
    console.log(event)
    if(event.ctrlKey){return}
    let id = event.target.getAttribute('data-id')
    let targetblock = document.querySelector(`*[data-node-id='${id}']`)
    console.log(id,targetblock)
    if(targetblock){
        event.preventDefault();

        window.scrollTo({top:targetblock.offsetTop,behavior:'smooth'})
        let css = document.createElement('style')
        css.innerHTML=`
        *[data-node-id='${id}']{
            background-color:var(--b3-protyle-inline-mark-background);
        }
        `  
        document.head.appendChild(css)
        setTimeout(()=>css.remove(),1000)
    }
}
const 滚动到url元素 =function(event){
    
    let query= 解析url(window.location.href)
    if(query.id||query.blockid){
    let id = query.id?query.id:query.blockid
    let targetblock = document.querySelector(`*[data-node-id='${id}']`)
    console.log(id,targetblock)
    if(targetblock){
        event.preventDefault();
        window.scrollTo({top:targetblock.offsetTop,behavior:'smooth'})
        let css = document.createElement('style')
        css.innerHTML=`
        *[data-node-id='${id}']{
            background-color:var(--b3-protyle-inline-mark-background);
        }
        `  
        document.head.appendChild(css)
        setTimeout(()=>css.remove(),1000)

    }
}
}
const 解析url=function(url){
    
    url = url || '';
    const queryObj = {};
    const reg = /[?&]([^=&#]+)=([^&#]*)/g;
    const queryArr = url.match(reg) || [];
    console.log(queryArr)
    for (const i in queryArr) {
        if (Object.hasOwnProperty.call(queryArr, i)) {
            const query = queryArr[i].split('=');
            const key = query[0].substr(1);
            const value = decodeURIComponent(query[1]);
            queryObj[key] ? queryObj[key] = [].concat(queryObj[key], value) : queryObj[key] = value;
        }
    }
    console.log(queryObj)
    return queryObj;
}
window.addEventListener('click',滚动到元素)
window.addEventListener('load',滚动到url元素)
