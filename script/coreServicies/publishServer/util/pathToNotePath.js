import 核心api from "./kernelApi.js"
import 设置 from "../config.js"
export  async function pathToId(path){
    let stmt = `select * from blocks where hpath='${path}' and type = "d"`
    let data = await  核心api.sql({stmt:stmt},"")
    if(data&&data[0]){
        return data[0]["id"]
    }
    else return  设置.首页
}