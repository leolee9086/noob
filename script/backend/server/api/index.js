/*import wxProxy from "./wsProxy.js"
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
naive.pluginsApiRouter = require("./pluginsApi/index.js")*/
import {APIRouter} from '../util/api.js'

export default class naiveApi extends APIRouter{ 
    constructor(){
        super('/')
        console.log(this)
        this.homeRouter= new APIRouter('/')
        this.setHome()
    }   
    setHome(){
        this.route('/',this.homeRouter)
        console.log(this.homeRouter)
        this.homeRouter.regist(
            "/assets",{
                名称: '附件',
                功能: '转发附件',
                方法: {
                  get: [async (req, res, next) => {
                    res.end("/")
                  }
                  ]
                },
                //权限为public的api固定所有用户都可以访问并获取正确的结果,不过可以在方法中加上别的过滤选项
                权限: 'admin',
                请求值: 'todo',
                返回值: 'todo',
                一级分组: 'siyuanPublisher',
                二级分组: 'block'
            }
        )
    }
} 