export default function clear(){
    const {webContents}  =require("@electron/remote")
    console.log(webContents.getAllWebContents())
    webContents.getAllWebContents().forEach(
        webcontent=>{
            webcontent.send('closeAll',{})
        }
    )
}