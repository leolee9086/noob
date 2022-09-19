const express =require("express")
const router = express.Router();
router.use("/",require('./home/index.js'))
router.use('/naiveApi/',require("./naiveApi/index.js"))
router.use("/user/",require("./user/index.js"))
router.use("/unauthorized/",require("./unauthorized/index.js"))
naive.pluginsApiRouter =  require("./pluginsApi/index.js")
//router.use("/plugins-api/",naive.pluginsApiRouter)
module.exports = router