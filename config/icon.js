module.exports={
    图标:    async function (icon){
      
        let iconurl = `/appearance/emojis/${icon}.svg`
        let res =  await  fetch (iconurl)
        return res.text()
        
    }
}