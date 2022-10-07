import wxProxy from "./wsProxy.js"
import Api  from "../util/api.js";
import homeRouter from './home/index.js'
console.log(require)
const express = require("express")
const router = express.Router();
//这里用于对websocket进行转发
router.use("/ws", wxProxy)
router.use("/", homeRouter)
router.use('/naiveApi/', require("./naiveApi/index.js"))
router.use("/user/", require("./user/index.js"))
router.use("/unauthorized/", require("./unauthorized/index.js"))
naive.pluginsApiRouter = require("./pluginsApi/index.js")

export default class naiveApi {
    
} 