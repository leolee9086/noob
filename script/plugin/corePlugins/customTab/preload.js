window.siyuanNaiveChannel =  new BroadcastChannel("siyuanNaiveChannel")
window.addEventListener ("load",()=>{window.addEventListener('click',()=>{
    window.siyuanNaiveChannel.postMessage("clicked")
})})

